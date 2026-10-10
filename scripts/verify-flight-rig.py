# /// script
# requires-python = ">=3.11"
# dependencies = ["trimesh==4.12.2", "numpy==2.4.6", "scipy==1.17.1", "rtree==1.4.1"]
# ///
"""Verify presentation fit against the exported mannequin and wing surfaces."""

import json
from pathlib import Path

import numpy as np
import trimesh

root = Path(__file__).resolve().parents[1] / "assets/blueprints"
source = json.loads((root / "scene-source.json").read_text())
scale = source["shared_transform"]["uniform_scale"] * 1000
pilot = trimesh.load(root / "exowing-pilot.glb", force="scene")
wing = trimesh.load(root / "exowing-scene.glb", force="scene")
for mesh in list(pilot.geometry.values()) + list(wing.geometry.values()):
    mesh.vertices = mesh.vertices / scale + [0, 0.105, 1.12]

report = {"harness_max_gap_mm": {}, "container_wing_crossings": 0}
for name, mesh in pilot.geometry.items():
    if not name.startswith("pilot-harness") or "buckle" in name:
        continue
    target = f"pilot-suit-leg-{name.split('-')[-1]}" if "leg-" in name else "pilot-suit-torso"
    points = np.vstack([mesh.vertices, mesh.triangles_center])
    closest, gap, triangles = pilot.geometry[target].nearest.on_surface(points)
    penetration = np.einsum("ij,ij->i", points - closest, pilot.geometry[target].face_normals[triangles])
    report["harness_max_gap_mm"][name] = round(float(gap.max() * 1000), 2)
    # Taut webbing can bridge shallow suit creases between fitted edge samples.
    assert gap.max() < 0.020, f"{name} floats more than 20 mm from the suit"
    assert penetration.min() > -0.002, f"{name} clips through the suit"

pack = pilot.geometry["pilot-parachute-container"]
edges = pack.vertices[pack.edges_unique]
for mesh in wing.geometry.values():
    # Reject non-overlapping edge boxes before the exact triangle intersection.
    keep = np.all(edges.max(axis=1) >= mesh.bounds[0], axis=1) & np.all(edges.min(axis=1) <= mesh.bounds[1], axis=1)
    candidates = edges[keep]
    if not len(candidates):
        continue
    direction = candidates[:, 1] - candidates[:, 0]
    lengths = np.linalg.norm(direction, axis=1)
    hit, ids, _ = mesh.ray.intersects_location(candidates[:, 0], direction, multiple_hits=False)
    if len(hit):
        report["container_wing_crossings"] += int(np.sum(np.linalg.norm(hit - candidates[ids, 0], axis=1) < lengths[ids]))
assert report["container_wing_crossings"] == 0, "The fuller pack crosses the CAD wing skin"

rear = pack.vertices[(pack.vertices[:, 2] > 0.88) & (pack.vertices[:, 2] < 0.91)]
rear_top = rear[:, 1].max()
wing_hits = []
for mesh in wing.geometry.values():
    hit, _, _ = mesh.ray.intersects_location([[0.2, 1, 0.89]], [[0, -1, 0]], multiple_hits=True)
    if len(hit):
        wing_hits.extend(hit[:, 1])
assert len(wing_hits) >= 2, "The reference wing section must be present"
report["rear_crown_below_wing_mm"] = round(float((max(wing_hits) - rear_top) * 1000), 2)
assert 0 < report["rear_crown_below_wing_mm"] < 20, "The rear pack must fill the recess depth without standing above the wing"
assert rear[:, 1].min() < min(wing_hits) < rear_top, "The pack must occupy the wing's thickness at the recess"
print(json.dumps(report, indent=2))
