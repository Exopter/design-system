# /// script
# requires-python = ">=3.11"
# dependencies = ["numpy==2.4.6", "trimesh==4.12.2", "shapely==2.1.2", "numba==0.67.0", "pillow==12.1.1"]
# ///
"""Project the original Exowing 3MF assembly into lightweight SVG illustrations.

Usage: uv run scripts/render-wing-blueprints.py /path/to/original.3mf
The source is read only. Assembly poses, not print-bed poses, are authoritative.
Exterior contours and sparse surface sections are retained; internal tubes are omitted.
"""

import argparse
import hashlib
import json
from pathlib import Path
import re
import xml.etree.ElementTree as ET
import zipfile

import numpy as np
from shapely import LineString, MultiLineString, Polygon, get_parts, line_merge, polygonize, union_all
from numba import njit
from PIL import Image
import trimesh

ROOT = Path(__file__).resolve().parents[1]
NS = {"m": "http://schemas.microsoft.com/3dmanufacturing/core/2015/02"}
PRODUCTION = "{http://schemas.microsoft.com/3dmanufacturing/production/2015/06}"
PARTS = {2: "left-wing", 14: "right-wing", 6: "right-fin", 10: "left-fin", 12: "center-wing"}
# Source aircraft axes: nose -X, aircraft right +Y, dorsal side +Z.
CAMERAS = (
    ("axonometric", [.30, -1, 0], [.52, .156, 1], 1200, 700),
    ("plan", [0, 1, 0], [-1, 0, 0], 1200, 640),
    ("front", [0, -1, 0], [0, 0, 1], 1200, 260),
    ("profile", [1, 0, 0], [0, 0, 1], 640, 360),
)


def transform(value):
    matrix = np.eye(4)
    if value:
        matrix[:3, :] = np.array(list(map(float, value.split()))).reshape(4, 3).T
    return matrix


def load_assembly(source):
    meshes = []
    with zipfile.ZipFile(source) as archive:
        root = ET.fromstring(archive.read("3D/3dmodel.model"))
        settings = ET.fromstring(archive.read("Metadata/model_settings.config"))
        poses = {int(item.get("object_id")): transform(item.get("transform"))
                 for item in settings.findall("assemble/assemble_item")}
        for item in root.findall(".//m:object", NS):
            oid = int(item.get("id"))
            if oid not in PARTS:
                continue
            component = item.find(".//m:component", NS)
            part = ET.fromstring(archive.read(component.get(PRODUCTION + "path").lstrip("/")))
            vertices = [[float(vertex.get(axis)) for axis in "xyz"]
                        for vertex in part.findall(".//m:vertex", NS)]
            faces = [[int(face.get(axis)) for axis in ("v1", "v2", "v3")]
                     for face in part.findall(".//m:triangle", NS)]
            mesh = trimesh.Trimesh(vertices=vertices, faces=faces, process=True)
            mesh.apply_transform(poses[oid] @ transform(component.get("transform")))
            meshes.append((PARTS[oid], mesh))
    assert len(meshes) == 5, "The source must contain the five exterior assembly parts."
    return meshes


def exterior_shape(mesh, view, project):
    """Close projected silhouette regions and discard interior mesh details."""
    facing = (mesh.face_normals @ view)[mesh.face_adjacency]
    silhouette = (facing.max(axis=1) > 1e-7) & (facing.min(axis=1) <= 1e-7)
    edges = mesh.face_adjacency_edges[silhouette]
    # The supplied fins include open skin seams; preserve their boundary too.
    open_edges = mesh.edges_unique[np.bincount(mesh.edges_unique_inverse) == 1]
    edges = np.concatenate([edges, open_edges])
    segments = project(mesh.vertices[edges])
    network = union_all(MultiLineString(segments.tolist()), grid_size=0.05)
    regions = list(get_parts(polygonize(get_parts(network))))
    if not regions:
        raise ValueError("The projected mesh does not form a closed silhouette.")
    shape = union_all(regions)
    filled = union_all([Polygon(part.exterior) for part in get_parts(shape)
                        if part.area > 1])
    return filled.simplify(0.5, preserve_topology=True)


def svg_path(shape):
    return "".join("M" + "L".join(f"{x:.2f},{y:.2f}" for x, y in part.exterior.coords) + "Z"
                   for part in get_parts(shape))


@njit
def rasterize(projected, depths, faces, depth_buffer, shade_buffer, shades):
    """Rasterize every source triangle with orthographic barycentric depth."""
    height, width = depth_buffer.shape
    for index in range(len(faces)):
        face = faces[index]
        a, b, c = projected[face[0]], projected[face[1]], projected[face[2]]
        area = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1])
        if abs(area) < 1e-10:
            continue
        left = max(0, int(np.floor(min(a[0], b[0], c[0]))))
        right = min(width - 1, int(np.ceil(max(a[0], b[0], c[0]))))
        top = max(0, int(np.floor(min(a[1], b[1], c[1]))))
        bottom = min(height - 1, int(np.ceil(max(a[1], b[1], c[1]))))
        for y in range(top, bottom + 1):
            for x in range(left, right + 1):
                u = ((b[1] - c[1]) * (x + .5 - c[0]) + (c[0] - b[0]) * (y + .5 - c[1])) / area
                v = ((c[1] - a[1]) * (x + .5 - c[0]) + (a[0] - c[0]) * (y + .5 - c[1])) / area
                w = 1 - u - v
                if u < -1e-8 or v < -1e-8 or w < -1e-8:
                    continue
                depth = u * depths[face[0]] + v * depths[face[1]] + w * depths[face[2]]
                if depth > depth_buffer[y, x]:
                    depth_buffer[y, x] = depth
                    shade_buffer[y, x] = shades[index]


@njit
def visible_samples(projected, depths, depth_buffer):
    """Allow only a half-output-pixel neighborhood at silhouette boundaries."""
    visible = np.zeros(len(depths), dtype=np.bool_)
    height, width = depth_buffer.shape
    for index in range(len(depths)):
        x, y = int(np.floor(projected[index, 0])), int(np.floor(projected[index, 1]))
        nearest = np.inf
        for dy in range(-1, 2):
            for dx in range(-1, 2):
                xx, yy = x + dx, y + dy
                if 0 <= xx < width and 0 <= yy < height:
                    candidate = depth_buffer[yy, xx]
                    if np.isfinite(candidate):
                        nearest = min(nearest, candidate)
        visible[index] = np.isfinite(nearest) and depths[index] >= nearest - 0.04
    return visible


def visible_paths(segments, project, view, depth_buffer):
    """Depth-clip line segments against the entire assembly, then join in 2D."""
    retained = []
    projected = project(segments)
    for segment, line in zip(segments, projected):
        length = np.linalg.norm(line[1] - line[0])
        if length < 1e-6:
            continue
        count = max(2, int(np.ceil(length / .45)) + 1)
        samples = segment[0] + np.linspace(0, 1, count)[:, None] * (segment[1] - segment[0])
        points = project(samples)
        visible = visible_samples(points * 2, samples @ view, depth_buffer)
        # Keep an interval only when both endpoints are on visible surfaces.
        valid = visible[:-1] & visible[1:]
        for index in np.flatnonzero(valid):
            retained.append(points[index:index + 2])
    if not retained:
        return ""
    network = line_merge(union_all(MultiLineString(retained), grid_size=.05))
    paths = []
    for line in get_parts(network):
        line = line.simplify(.25, preserve_topology=False)
        if line.length >= 1:
            paths.append("M" + "L".join(f"{x:.2f},{y:.2f}" for x, y in line.coords))
    return "".join(paths)


def surface_segments(mesh):
    """Extract real mesh sections; the depth test removes all hidden tubes."""
    segments = []
    for axis, spacing in ((1, 40), (0, 48)):
        normal = np.eye(3)[axis]
        start = np.ceil(mesh.bounds[0, axis] / spacing) * spacing
        for offset in np.arange(start, mesh.bounds[1, axis], spacing):
            section = trimesh.intersections.mesh_plane(mesh, normal, normal * offset)
            if len(section):
                segments.append(section)
    return np.concatenate(segments) if segments else np.empty((0, 2, 3))


def render(meshes, right, up, width, height, name, output, colors, review):
    right = np.asarray(right, dtype=float)
    right /= np.linalg.norm(right)
    up = np.asarray(up, dtype=float)
    up -= right * np.dot(up, right)
    up /= np.linalg.norm(up)
    view = np.cross(right, up)
    basis = np.array([right, -up]).T
    vertices = np.concatenate([mesh.vertices for _, mesh in meshes])
    projected = vertices @ basis
    center = (projected.max(axis=0) + projected.min(axis=0)) / 2
    scale = min((width - 100) / np.ptp(projected[:, 0]), (height - 90) / np.ptp(projected[:, 1]))

    def project(points):
        return (points @ basis - center) * scale + [width / 2, height / 2]

    depth_buffer = np.full((height * 2, width * 2), -np.inf)
    shade_buffer = np.zeros(depth_buffer.shape)
    light = np.asarray([.3, -.4, 1.])
    light /= np.linalg.norm(light)
    for _, mesh in meshes:
        shades = .35 + .65 * np.abs(mesh.face_normals @ light)
        rasterize(project(mesh.vertices) * 2, mesh.vertices @ view, mesh.faces,
                  depth_buffer, shade_buffer, shades)
    outlines = []
    details = []
    shapes = []
    for part_name, mesh in meshes:
        shape = exterior_shape(mesh, view, project)
        expected = np.ptp(project(mesh.vertices), axis=0)
        actual = np.array(shape.bounds[2:]) - shape.bounds[:2]
        if np.any(actual < expected - 1.5):
            raise ValueError(f"Incomplete exterior contour for {name}/{part_name}: {actual} vs {expected}")
        shapes.append(shape)
        facing = (mesh.face_normals @ view)[mesh.face_adjacency]
        silhouette = (facing.max(axis=1) > 1e-7) & (facing.min(axis=1) <= 1e-7)
        creases = (mesh.face_adjacency_angles > np.deg2rad(32)) & (facing.max(axis=1) > 1e-7)
        open_edges = mesh.edges_unique[np.bincount(mesh.edges_unique_inverse) == 1]
        edges = np.concatenate([mesh.face_adjacency_edges[silhouette | creases], open_edges])
        outlines.append(visible_paths(mesh.vertices[edges], project, view, depth_buffer))
        details.append(visible_paths(surface_segments(mesh), project, view, depth_buffer))
    envelope = union_all(shapes)
    body = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}">',
            f'<title>Exowing V115 — {name}</title>',
            '<desc>Orthographic projection of the supplied 3MF assembly, with depth-tested visible edges and surface sections. Hidden surfaces and internal tubes are omitted.</desc>',
            f'<path d="{svg_path(envelope)}" fill="{colors["--ex-carbon-900"]}" stroke="{colors["--ex-aqua-500"]}" stroke-width="1.6" stroke-linejoin="round"/>',
            f'<g fill="none" stroke="{colors["--ex-aqua-500"]}" stroke-linejoin="round" stroke-linecap="round">']
    body.extend(f'<path d="{path}" stroke-width=".9" opacity=".5"/>' for path in details if path)
    body.extend(f'<path d="{path}" stroke-width="1.6"/>' for path in outlines if path)
    body.extend(['</g>', '</svg>'])
    destination = output / f"exowing-{name}.svg"
    destination.write_text("\n".join(body) + "\n")
    print(f"{destination.name}: {destination.stat().st_size:,} bytes", flush=True)
    if review:
        review.mkdir(parents=True, exist_ok=True)
        rgba = np.zeros((*depth_buffer.shape, 4), dtype=np.uint8)
        shade = (shade_buffer * 200 + 40).astype(np.uint8)
        rgba[:, :, :3] = shade[:, :, None]
        rgba[:, :, 3] = np.isfinite(depth_buffer) * 255
        Image.fromarray(rgba).save(review / f"exowing-{name}-mesh.png")
    return {"screen_right": right.tolist(), "screen_up": up.tolist(),
            "camera_direction": view.tolist(), "visible_pixels": int(np.isfinite(depth_buffer).sum())}


def verify_renderer():
    """Regress camera orientation and visibility where two parts cross in depth."""
    cameras = {name: (np.asarray(right), np.asarray(up)) for name, right, up, _, _ in CAMERAS}
    for name, direction in (("front", [-1, 0, 0]), ("plan", [0, 0, 1]), ("profile", [0, -1, 0])):
        right, up = cameras[name]
        np.testing.assert_allclose(np.cross(right, up), direction)

    triangle = np.asarray([[0., 0.], [32., 0.], [0., 32.]])
    faces = np.asarray([[0, 1, 2]])
    depths = (np.asarray([0., 8., 0.]), np.asarray([4., 4., 4.]))
    buffers = []
    for order in ((0, 1), (1, 0)):
        buffer = np.full((32, 32), -np.inf)
        shade = np.zeros((32, 32))
        for index in order:
            rasterize(triangle, depths[index], faces, buffer, shade, np.ones(1))
        buffers.append(buffer)
    np.testing.assert_array_equal(*buffers)
    np.testing.assert_allclose(buffers[0][4, [4, 24]], [4., 6.125])
    points = np.asarray([[4.5, 4.5], [24.5, 4.5]])
    np.testing.assert_array_equal(visible_samples(points, np.asarray([1.125, 6.125]), buffers[0]), [False, True])
    np.testing.assert_array_equal(visible_samples(points, np.asarray([4., 4.]), buffers[0]), [True, False])
    print("Renderer checks passed: camera axes, triangle depth, order independence and hidden-line rejection.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path, nargs="?")
    parser.add_argument("--verify", action="store_true", help="Run camera and depth-visibility regression checks.")
    parser.add_argument("--review-dir", type=Path, help="Write shaded source-mesh reference renders outside the asset package.")
    args = parser.parse_args()
    if args.verify:
        verify_renderer()
        if args.source is None:
            return
    if args.source is None:
        parser.error("source is required unless --verify is used")
    output = ROOT / "assets/blueprints"
    output.mkdir(parents=True, exist_ok=True)
    meshes = load_assembly(args.source)
    bounds = np.array([mesh.bounds for _, mesh in meshes])
    print({name: mesh.bounds.round(2).tolist() for name, mesh in meshes}, flush=True)
    colors = dict(re.findall(r"(--ex-[\w-]+):\s*(#[a-fA-F0-9]+)", (ROOT / "tokens/exopter-tokens.css").read_text()))
    cameras = {}
    for name, right, up, width, height in CAMERAS:
        cameras[name] = render(meshes, right, up, width, height, name, output, colors, args.review_dir)
    metadata = {"source_file": args.source.name, "source_sha256": hashlib.sha256(args.source.read_bytes()).hexdigest(),
                "assembly_bounds_source_units": [bounds[:, 0].min(axis=0).tolist(), bounds[:, 1].max(axis=0).tolist()],
                "parts": list(PARTS.values()), "projection": "orthographic", "source_modified": False,
                "source_axes": {"forward": "-X", "right": "+Y", "up": "+Z"},
                "cameras": cameras, "visibility": "Per-sample depth test against all original mesh triangles at 2x output resolution.",
                "geometry": "Original exterior meshes with assembly transforms; concealed print joiners omitted.",
                "contours": "Depth-tested silhouettes, open boundaries and sharp surface edges.",
                "surface_curves": "Original mesh sections at 40 and 48 source-unit intervals. Hidden tube, bore and back-surface segments are removed by the assembly depth test.",
                "use": "Landing illustration; not a manufacturing drawing or full-scale dimension reference."}
    (output / "source.json").write_text(json.dumps(metadata, indent=2) + "\n")


if __name__ == "__main__":
    main()
