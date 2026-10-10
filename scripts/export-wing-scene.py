# /// script
# requires-python = ">=3.11"
# dependencies = ["cadquery==2.8.0", "trimesh==4.12.2", "numpy==2.4.6", "scipy==1.17.1", "networkx==3.6.1", "fast-simplification==0.1.13", "rtree==1.4.1"]
# ///
"""Export the archived wing/seat CAD and posed mannequin without changing sources."""

import hashlib
import json
import sys
import tempfile
from pathlib import Path

import numpy as np
import trimesh
from flight_pilot import build_pilot

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets/blueprints"
SOURCE = Path(sys.argv[1]).resolve()
STEP_SHA256 = "2b1e467d2e1fcaf23169f373d6521ba7926bfff08db7aa812a08c15b1caac796"
source = next(SOURCE.rglob("000001 - A Aile glider*.stp"))
source_hash = hashlib.sha256(source.read_bytes()).hexdigest()
if source_hash != STEP_SHA256:
    raise ValueError(
        "Reclassify CAD leaves before importing a different assembly revision"
    )
cache = Path(tempfile.gettempdir()) / "exopter-flight-cad"
cache.mkdir(exist_ok=True)
mesh_cache = cache / f"{source_hash}.glb"
parts_cache = cache / f"{source_hash}.json"

if not mesh_cache.exists() or not parts_cache.exists():
    import cadquery as cq

    class SourceAssembly(cq.Assembly):
        # STEP permits repeated instance names; CadQuery requires unique siblings.
        # Only labels change here. Every original instance location is retained.
        def add(self, arg, **kwargs):
            name = kwargs.get("name") or getattr(arg, "name", None)
            if name and name in self.objects:
                number = 2
                while f"{name} instance {number}" in self.objects:
                    number += 1
                kwargs["name"] = f"{name} instance {number}"
            return super().add(arg, **kwargs)

    original = SourceAssembly.importStep(str(source), unit="MM")
    raw = trimesh.Scene()
    records = []
    for i, (shape, name, location, color) in enumerate(original):
        vertices, faces = shape.moved(location).tessellate(0.65, 0.18)
        if not faces:
            continue
        mesh = trimesh.Trimesh(
            vertices=[v.toTuple() for v in vertices], faces=faces, process=True
        )
        label = f"cad-{i:03}"
        raw.add_geometry(mesh, geom_name=label, node_name=label)
        records.append(
            {
                "id": label,
                "name": name,
                "faces": len(faces),
                "bounds": mesh.bounds.tolist(),
            }
        )
    raw.export(mesh_cache)
    parts_cache.write_text(json.dumps(records, indent=2) + "\n")
raw = trimesh.load(mesh_cache, force="scene")
records = json.loads(parts_cache.read_text())
if len(records) != 153:
    raise ValueError("The archived assembly must retain all 153 source instances")

# CAD axes are aft +X, span +Y, up +Z, in millimeters.
# Preserve one common transform for the wing, seat and all attachment hardware.
origin = np.array([200.0, 0.0, -100.0])
span = np.ptp(
    np.concatenate([raw.geometry[f"cad-{i:03}"].vertices for i in [40, 42, 135, 137]])[
        :, 1
    ]
)
scale = 6 / span


def display(mesh):
    mesh = mesh.copy()
    mesh.vertices = (mesh.vertices - origin)[:, [1, 2, 0]] * scale
    return mesh


def group(indices, budget):
    mesh = trimesh.util.concatenate([raw.geometry[f"cad-{i:03}"] for i in indices])
    if len(mesh.faces) > budget:
        mesh = mesh.simplify_quadric_decimation(face_count=budget)
    return display(mesh)


wing = trimesh.Scene()
wing_groups = {
    "wing-center": ([0, 1], 25000),
    "wing-right": ([40, 42], 12000),
    "wing-left": ([135, 137], 12000),
    "fin-right": ([54], 7000),
    "fin-left": ([149], 7000),
}
for name, (indices, budget) in wing_groups.items():
    wing.add_geometry(group(indices, budget), geom_name=name, node_name=name)
seat = trimesh.Scene()
seat_groups = {
    "seat-shell": ([132], 14000),
    "seat-plate": ([58], 10000),
    "seat-hardware": (
        [16, 17]
        + list(range(19, 40))
        + list(range(59, 132))
        + [52, 53, 55, 56, 57, 147, 148, 150, 151],
        24000,
    ),
}
for name, (indices, budget) in seat_groups.items():
    seat.add_geometry(group(indices, budget), geom_name=name, node_name=name)

pilot_source = next(SOURCE.rglob("wingsuit-pilot.stl"))
pilot = build_pilot(pilot_source)
for mesh in pilot.geometry.values():
    # Articulated mannequin meters to CAD millimeters. Body rests in the seat.
    mesh.vertices = np.column_stack(
        [
            mesh.vertices[:, 2] * 1000 - 920,
            mesh.vertices[:, 0] * 1000,
            mesh.vertices[:, 1] * 1000 - 205,
        ]
    )
    mesh.vertices = (mesh.vertices - origin)[:, [1, 2, 0]] * scale

for filename, scene in [
    ("exowing-scene.glb", wing),
    ("exowing-seat.glb", seat),
    ("exowing-pilot.glb", pilot),
]:
    scene.export(OUT / filename)
    print(
        filename,
        len(scene.geometry),
        sum(len(m.faces) for m in scene.geometry.values()),
        (OUT / filename).stat().st_size,
        flush=True,
    )

metadata = {
    "source_file": str(source.relative_to(SOURCE)),
    "source_sha256": source_hash,
    "source_modified": False,
    "source_revision": "2026-04-08 STEP assembly",
    "source_instances": 153,
    "source_unit": "millimeter",
    "source_span_mm": float(span),
    "display_axes": {"right": "+X", "up": "+Y", "forward": "-Z"},
    "normalized_span": 6,
    "shared_transform": {
        "cad_origin_mm": origin.tolist(),
        "axis_order": [1, 2, 0],
        "uniform_scale": scale,
    },
    "wing_groups": {k: v[0] for k, v in wing_groups.items()},
    "seat_groups": {k: v[0] for k, v in seat_groups.items()},
    "geometry": "External CAD skins, two ventral fins, actual seat shell, plate and mounting mechanism; concealed ribs omitted",
    "sha256": hashlib.sha256((OUT / "exowing-scene.glb").read_bytes()).hexdigest(),
    "seat_sha256": hashlib.sha256((OUT / "exowing-seat.glb").read_bytes()).hexdigest(),
    "display_triangles": sum(len(m.faces) for m in wing.geometry.values()),
    "use": "Presentation only; original CAD placement is preserved, not independently qualified",
}
(OUT / "scene-source.json").write_text(json.dumps(metadata, indent=2) + "\n")
(OUT / "pilot-source.json").write_text(
    json.dumps(
        {
            "source_file": str(pilot_source.relative_to(SOURCE)),
            "source_sha256": hashlib.sha256(pilot_source.read_bytes()).hexdigest(),
            "source_modified": False,
            "geometry": "Archived CAD mannequin, fabric wings omitted, limbs posed for rigid-wing flight; original helmet components retained",
            "orientation": "Prone, visor and chest toward -Y, back and closed dorsal pack toward +Y",
            "cad_translation_mm": [-920, 0, -205],
            "pose_reference": "LIBRARY/EXOPTER MEDIA/GLIDER V115/pic_v115/pic_v115_simulation/04.jpeg",
            "seat_reference": "April 2026 wing assembly, seat instance 132 and mounting plate 58",
            "parachute": "Original low-profile rig with contoured textile shell, overlapping main and reserve flaps, pin covers, riser covers, webbing and ring hardware",
            "parachute_dimensions_mm": {"width": 306, "length": 515, "front_thickness": [83, 95], "rear_thickness": [195, 211]},
            "harness_fit": "Full-width straps conform to posed torso and thigh meshes with a 2.5 mm base clearance; buckles follow the same body surface",
            "parachute_references": [
                "ENGINEERING/DEVELOPMENT/EXOWING(GLIDER)/DEV 25 Pilot Equipment and Parachutes/DEV 2520 MAIN PARACHUTE/PARACHUTE BASE/wing top view.jpeg",
                "ENGINEERING/DEVELOPMENT/EXOWING(GLIDER)/DEV 25 Pilot Equipment and Parachutes/DEV 2520 MAIN PARACHUTE/PARACHUTE BASE/bag location side view.jpeg",
                "ENGINEERING/DEVELOPMENT/EXOWING(GLIDER)/DEV 25 Pilot Equipment and Parachutes/DEV 2520 MAIN PARACHUTE/PARACHUTE BASE/reserve&strap layout.JPG",
                "https://uptvector.com/fitment/",
            ],
            "limitations": [
                "Mannequin articulation and equipment fit are visual approximations",
                "The rig is an original presentation model, not manufacturer CAD or a selected parachute configuration",
                "Simulation images inform posture; no CFD field or qualification is inferred",
            ],
            "sha256": hashlib.sha256(
                (OUT / "exowing-pilot.glb").read_bytes()
            ).hexdigest(),
        },
        indent=2,
    )
    + "\n"
)
