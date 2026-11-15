"""Export a faceted Exowing planform for the Flight Club insignia.

Reads assets/blueprints/exowing-scene.glb and samples the real wing at a few
spanwise stations: leading edge, trailing edge and the crest of the section.
Joining the stations gives a clean low-polygon wing seen from above with the
nose up, a leading skin and a trailing skin on each panel, plus one small roof
per fin. The right half is sampled and mirrored, so the insignia is symmetric.

Prints a flat JSON array of x, y, z triples in thousandths of an insignia unit
(span normalized to WIDTH, thickness exaggerated by DEPTH).

    python3 scripts/export-flightclub-wing-facets.py > facets.json
"""
import json
import struct
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
# GLB display axes: right +X, up +Y, forward -Z.
STATIONS = [0.0, 0.34, 0.67, 1.25, 1.85, 2.45, 2.97]
WIDTH = 1.6
DEPTH = 1.5

data = (ROOT / "assets/blueprints/exowing-scene.glb").read_bytes()
json_length = struct.unpack("<I", data[12:16])[0]
gltf = json.loads(data[20:20 + json_length])
binary = data[20 + json_length + 8:]


def positions(mesh):
    item = gltf["accessors"][mesh["primitives"][0]["attributes"]["POSITION"]]
    view = gltf["bufferViews"][item["bufferView"]]
    start = view.get("byteOffset", 0) + item.get("byteOffset", 0)
    return [struct.unpack_from("<fff", binary, start + index * view.get("byteStride", 12)) for index in range(item["count"])]


meshes = {mesh["name"]: positions(mesh) for mesh in gltf["meshes"]}
wing = meshes["wing-center"] + meshes["wing-right"]
floor = min(p[1] for p in wing)
scale = WIDTH / (2 * max(p[0] for p in wing))


def point(x, y, z):
    """Model coordinates to insignia coordinates: span across, nose up, thickness toward the viewer."""
    return [x * scale, -z * scale, (y - floor) * scale * DEPTH]


sections = []
for station in STATIONS:
    band = [p for p in wing if abs(p[0] - station) < 0.05]
    lead, trail, crest = min(band, key=lambda p: p[2]), max(band, key=lambda p: p[2]), max(band, key=lambda p: p[1])
    sections.append([point(station, lead[1], lead[2]), point(station, crest[1], crest[2]), point(station, trail[1], trail[2])])

facets = []
for inner, outer in zip(sections, sections[1:]):
    for skin in (0, 1):
        a, b, c, d = inner[skin], outer[skin], outer[skin + 1], inner[skin + 1]
        facets += [[a, b, c], [a, c, d]]

# From above a fin is a thin line: a low, narrow roof over its real footprint.
fin = meshes["fin-right"]
tip = [p for p in fin if p[1] > max(p[1] for p in fin) - 0.12]
center, front, back = sum(p[0] for p in tip) / len(tip), min(p[2] for p in tip), max(p[2] for p in tip)
skin = max(p[1] for p in wing) - 0.1
ridge = [point(center, skin + 0.14, front), point(center, skin + 0.14, back)]
for side in (-0.045, 0.045):
    base = [point(center + side, skin, front), point(center + side, skin, back)]
    facets += [[base[0], base[1], ridge[1]], [base[0], ridge[1], ridge[0]]]

mirrored = [[[-x, y, z] for x, y, z in triangle] for triangle in facets]
facets += mirrored
points = [p for triangle in facets for p in triangle]
center_y = (min(p[1] for p in points) + max(p[1] for p in points)) / 2
for p in {id(p): p for p in points}.values():
    p[1] -= center_y
print(json.dumps([round(value * 1000) for p in points for value in p], separators=(",", ":")))
print(f"{len(facets)} facets", file=sys.stderr)
