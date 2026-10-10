# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy==2.4.6", "trimesh==4.12.2", "scipy==1.17.1", "numba==0.67.0", "rtree==1.4.1"]
# ///
"""Build an offline airflow field around the exported CAD assembly and mannequin.

Assumed inviscid conditions and prescribed circulation, not validated CFD.
Source geometry is read only. Output is visual evidence, never engineering data.
"""

from pathlib import Path
import hashlib
import json
import math
import time
import numpy as np
import trimesh
from scipy import ndimage
from scipy.interpolate import RegularGridInterpolator
from numba import njit

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets/blueprints"
# All parts share the original assembly frame established by export-wing-scene.py.
wing = trimesh.load(OUT / "exowing-scene.glb", force="scene")
seat = trimesh.load(OUT / "exowing-seat.glb", force="scene")
pilot = trimesh.load(OUT / "exowing-pilot.glb", force="scene")
solid_meshes = (
    list(wing.geometry.values())
    + list(seat.geometry.values())
    + [
        mesh
        for name, mesh in pilot.geometry.items()
        if not any(detail in name for detail in ("accent", "visor", "buckle", "trim"))
    ]
)

H = 0.09
origin = np.array([-4.5, -2.4, -5.04])
shape = (101, 65, 158)
axes = [origin[i] + np.arange(shape[i]) * H for i in range(3)]
solid = np.zeros(shape, dtype=bool)
for mesh in solid_meshes:
    vox = mesh.voxelized(H).fill()
    ijk = np.rint((vox.points - origin) / H).astype(int)
    inside = np.all((ijk >= 0) & (ijk < np.array(shape)), axis=1)
    solid[tuple(ijk[inside].T)] = True
# A conservative surface shell prevents interpolation from entering the solid.
solid = ndimage.binary_dilation(solid, iterations=1)
print(f"Flow grid: {shape}, {solid.sum()} solid cells", flush=True)
X, Y, Z = np.meshgrid(*axes, indexing="ij")
points = np.stack([X, Y, Z], axis=-1)
velocity = np.zeros((*shape, 3), dtype=np.float32)
velocity[..., 1] = math.sin(math.radians(5))
velocity[..., 2] = math.cos(math.radians(5))


# Finite-core Biot-Savart horseshoe, prescribed circulation for a lifting wake.
def vortex_segment(a, b, gamma=0.65, core=0.18):
    r1 = points - np.array(a)
    r2 = points - np.array(b)
    cross = np.cross(r1, r2)
    length = np.linalg.norm(np.array(b) - a)
    denom = (cross * cross).sum(axis=-1) + (core * length) ** 2
    n1 = np.maximum(np.linalg.norm(r1, axis=-1), 1e-6)
    n2 = np.maximum(np.linalg.norm(r2, axis=-1), 1e-6)
    factor = ((np.array(b) - a) * (r1 / n1[..., None] - r2 / n2[..., None])).sum(
        axis=-1
    )
    return cross * (gamma / (4 * np.pi) * factor / np.maximum(denom, 1e-8))[..., None]


for a, b in [
    ([-2.85, 0.35, 16], [-2.85, 0.35, -0.25]),
    ([-2.85, 0.35, -0.25], [2.85, 0.35, -0.25]),
    ([2.85, 0.35, -0.25], [2.85, 0.35, 16]),
]:
    velocity += vortex_segment(a, b).astype(np.float32)

# Cell-face fluxes: zero normal flow into any occupied cell.
faces = []
masks = []
rhs = np.zeros(shape, dtype=np.float32)
count = np.zeros(shape, dtype=np.float32)
for axis in range(3):
    lo = [slice(None)] * 3
    hi = lo.copy()
    lo[axis] = slice(None, -1)
    hi[axis] = slice(1, None)
    lo = tuple(lo)
    hi = tuple(hi)
    mask = ~(solid[lo] | solid[hi])
    flux = (velocity[lo + (axis,)] + velocity[hi + (axis,)]) * 0.5 * mask
    faces.append(flux)
    masks.append(mask)
    rhs[lo] += flux * H
    rhs[hi] -= flux * H
    count[lo] += mask
    count[hi] += mask


@njit(cache=True)
def solve(rhs, count, m0, m1, m2, solid):
    p = np.zeros(rhs.shape, dtype=np.float32)
    nx, ny, nz = p.shape
    residual = 1.0
    for it in range(1800):
        residual = 0.0
        for color in range(2):
            for i in range(1, nx - 1):
                for j in range(1, ny - 1):
                    for k in range(1 + ((i + j + 1 + color) % 2), nz - 1, 2):
                        if solid[i, j, k] or count[i, j, k] < 1:
                            continue
                        total = (
                            p[i - 1, j, k] * m0[i - 1, j, k]
                            + p[i + 1, j, k] * m0[i, j, k]
                            + p[i, j - 1, k] * m1[i, j - 1, k]
                            + p[i, j + 1, k] * m1[i, j, k]
                            + p[i, j, k - 1] * m2[i, j, k - 1]
                            + p[i, j, k + 1] * m2[i, j, k]
                        )
                        target = (total - rhs[i, j, k]) / count[i, j, k]
                        change = target - p[i, j, k]
                        p[i, j, k] += 1.85 * change
                        residual = max(residual, abs(change))
        if residual < 2e-6:
            return p, it + 1, residual
    return p, 1800, residual


started = time.time()
p, iterations, residual = solve(rhs, count, *masks, solid)
print(
    f"Pressure projection: {iterations} iterations, residual {residual:.3g}, {time.time() - started:.1f}s",
    flush=True,
)
field = np.zeros_like(velocity)
div = np.zeros(shape, dtype=np.float32)
for axis in range(3):
    lo = [slice(None)] * 3
    hi = lo.copy()
    lo[axis] = slice(None, -1)
    hi[axis] = slice(1, None)
    lo = tuple(lo)
    hi = tuple(hi)
    flux = (faces[axis] - (p[hi] - p[lo]) / H) * masks[axis]
    div[lo] += flux / H
    div[hi] -= flux / H
    field[lo + (axis,)] += flux * 0.5
    field[hi + (axis,)] += flux * 0.5
field[solid] = 0
interpolate = RegularGridInterpolator(axes, field, bounds_error=False, fill_value=0)
clearance = ndimage.distance_transform_edt(~solid) * H
clear = RegularGridInterpolator(axes, clearance, bounds_error=False, fill_value=0)

# Follow time-parametrized streamlines with RK2, retaining integrated travel time.
seeds = []
for y in [-1.55, -1.10, -0.65, -0.20, 0.30, 0.80, 1.30]:
    for x in np.linspace(-3.8, 3.8, 27):
        seeds.append([x, y, -4.6])
# More wake tracers around the two actual outer wing tips.
for sign in [-1, 1]:
    for angle in np.linspace(0, 2 * np.pi, 14, endpoint=False):
        seeds.append(
            [sign * 2.86 + 0.27 * math.cos(angle), 0.35 + 0.27 * math.sin(angle), 1.25]
        )
seeds = np.array(seeds)
active = np.ones(len(seeds), dtype=bool)
current = seeds.copy()
tracks = [[list(seed)] for seed in seeds]
times = [[0.0] for _ in seeds]
travel = np.zeros(len(seeds))
DT = 0.046
for step in range(320):
    v = interpolate(current)
    midpoint = current + v * DT * 0.5
    nxt = current + interpolate(midpoint) * DT
    safe = (
        (clear(nxt) > 0.055)
        & (clear(midpoint) > 0.055)
        & (nxt[:, 2] < 8.8)
        & (np.linalg.norm(v, axis=1) > 0.1)
    )
    active &= safe
    for i in np.flatnonzero(active):
        tracks[i].append(np.round(nxt[i], 5).tolist())
        travel[i] += DT
        times[i].append(round(travel[i], 5))
    current[active] = nxt[active]
    if not active.any():
        break
paths = []
for i, (track, ts) in enumerate(zip(tracks, times)):
    if len(track) < 45:
        continue
    # Inlet paths must pass the whole aircraft; never show a streamline hitting it.
    if i < 189 and track[-1][2] < 4:
        continue
    paths.append({"points": track[::2], "times": ts[::2], "wake": i >= 189})
solid_surface = trimesh.util.concatenate(solid_meshes)
segment_starts = []
segment_ends = []
segment_paths = []
for path_index, path in enumerate(paths):
    segment_starts.extend(path["points"][:-1])
    segment_ends.extend(path["points"][1:])
    segment_paths.extend([path_index] * (len(path["points"]) - 1))
segment_starts = np.array(segment_starts)
segment_ends = np.array(segment_ends)
directions = segment_ends - segment_starts
lengths = np.linalg.norm(directions, axis=1)
locations, ray_ids, _ = solid_surface.ray.intersects_location(
    segment_starts, directions, multiple_hits=False
)
crossing_ids = ray_ids[
    np.linalg.norm(locations - segment_starts[ray_ids], axis=1) < lengths[ray_ids]
]
rejected = {segment_paths[i] for i in crossing_ids}
paths = [path for i, path in enumerate(paths) if i not in rejected]
print(
    f"Exact surface check: {len(segment_starts)} segments, {len(rejected)} paths rejected",
    flush=True,
)
output = {
    "schema": 1,
    "frame": "wing",
    "sources": {
        name: hashlib.sha256((OUT / filename).read_bytes()).hexdigest()
        for name, filename in {
            "wing": "exowing-scene.glb",
            "seat": "exowing-seat.glb",
            "pilot": "exowing-pilot.glb",
        }.items()
    },
    "method": "Steady incompressible projection with prescribed finite-core horseshoe circulation",
    "paths": paths,
}
(OUT / "exowing-flow.json").write_text(json.dumps(output, separators=(",", ":")) + "\n")
fluid = ~solid
fluid[[0, -1], :, :] = False
fluid[:, [0, -1], :] = False
fluid[:, :, [0, -1]] = False
report = {
    "model": "Inviscid reduced presentation model; not validated CFD",
    "grid_spacing": H,
    "grid_shape": shape,
    "angle_of_attack_deg": 5,
    "circulation": 0.65,
    "source_wing_sha256": hashlib.sha256(
        (OUT / "exowing-scene.glb").read_bytes()
    ).hexdigest(),
    "seat_sha256": hashlib.sha256((OUT / "exowing-seat.glb").read_bytes()).hexdigest(),
    "pilot_sha256": hashlib.sha256(
        (OUT / "exowing-pilot.glb").read_bytes()
    ).hexdigest(),
    "pressure_iterations": iterations,
    "pressure_update_residual": float(residual),
    "divergence_rms": float(np.sqrt(np.mean(div[fluid] ** 2))),
    "divergence_max": float(np.max(np.abs(div[fluid]))),
    "retained_paths": len(paths),
    "exact_surface_segments_checked": len(segment_starts),
    "intersecting_paths_rejected": len(rejected),
    "no_solid_crossings": "Every retained RK2 midpoint and endpoint clears the conservatively dilated occupancy grid by 0.055 scene units",
    "limitations": [
        "Prescribed circulation, not solved lift or Kutta condition",
        "Coarse voxel boundary; no boundary layer, separation or turbulence model",
        "Archived CAD wing and seat; posed mannequin and illustrative rig fit are not qualified",
        "No measured speeds, pressures or performance implied",
    ],
}
(OUT / "flow-source.json").write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps(report), flush=True)
