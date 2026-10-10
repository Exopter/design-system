"""Build an original, low-profile textile rig in the posed mannequin's frame.

The archived parachute integration sketches guide the silhouette and harness.
This presentation mesh is not a manufacturer model or a flight-qualified design.
"""

import numpy as np
import trimesh
from scipy.interpolate import PchipInterpolator

Z_MIN, Z_MAX = 0.40, 0.915
width = PchipInterpolator(
    [0.40, 0.412, 0.44, 0.52, 0.65, 0.78, 0.87, 0.90, 0.915],
    [0.0, 0.115, 0.147, 0.153, 0.150, 0.143, 0.127, 0.116, 0.105],
)
back = PchipInterpolator(
    [0.40, 0.48, 0.58, 0.68, 0.78, 0.89, 0.915],
    [0.137, 0.151, 0.150, 0.131, 0.079, 0.054, 0.054],
)


def thickness(z):
    return PchipInterpolator(
        [0.40, 0.52, 0.65, 0.78, 0.84, 0.89, 0.915],
        [0.083, 0.095, 0.110, 0.168, 0.195, 0.210, 0.211],
    )(z)


def crown(x, z):
    """Upper textile surface, following the same cross section as the shell."""
    radius = np.maximum(width(z), 0.001)
    ratio = np.clip(np.abs(x) / radius, 0, 1)
    arc = np.maximum(0, 1 - ratio ** (2 / 0.55)) ** (0.85 / 2)
    return back(z) + thickness(z) * (0.5 + 0.5 * arc)


def build_rig(scene):
    torso = scene.geometry["pilot-suit-torso"]

    def skin(points, body, clearance=0.003):
        """Conform to the posed skin, interpolating normals across source triangles."""
        closest, _, triangles = body.nearest.on_surface(np.asarray(points))
        barycentric = trimesh.triangles.points_to_barycentric(body.triangles[triangles], closest)
        normals = np.einsum("ij,ijk->ik", barycentric, body.vertex_normals[body.faces[triangles]])
        normals /= np.maximum(np.linalg.norm(normals, axis=1)[:, None], 1e-9)
        return closest + normals * clearance, normals

    def add(name, mesh):
        mesh.fix_normals(multibody=True)
        scene.add_geometry(mesh, geom_name=name, node_name=name)

    # Cross sections keep the container shallow while following the lumbar curve.
    vertices, faces = [], []
    rings, sides = 48, 64
    for z in np.linspace(Z_MIN + 0.0001, Z_MAX - 0.0001, rings):
        a = np.linspace(0, 2 * np.pi, sides, endpoint=False)
        x = width(z) * np.sign(np.cos(a)) * np.abs(np.cos(a)) ** 0.55
        y = back(z) + thickness(z) * (0.5 + 0.5 * np.sign(np.sin(a)) * np.abs(np.sin(a)) ** 0.85)
        vertices.extend(np.column_stack([x, y, np.full(sides, z)]))
    for row in range(rings - 1):
        for col in range(sides):
            a, b = row * sides + col, row * sides + (col + 1) % sides
            faces.extend([[a, b, b + sides], [a, b + sides, a + sides]])
    for row in [0, rings - 1]:
        center = len(vertices)
        vertices.append(np.mean(vertices[row * sides : (row + 1) * sides], axis=0))
        for col in range(sides):
            faces.append([center, row * sides + col, row * sides + (col + 1) % sides])
    add("pilot-parachute-container", trimesh.Trimesh(vertices=vertices, faces=faces))

    def tube(name, points, radius=0.0014, closed=False):
        points = np.array(points)
        if closed:
            points = np.vstack([points, points[0]])
        segments = []
        for a, b in zip(points[:-1], points[1:]):
            if np.linalg.norm(b - a) > 1e-7:
                segments.append(trimesh.creation.cylinder(radius, segment=[a, b], sections=8))
        add(name, trimesh.util.concatenate(segments))

    def panel(name, outline, offset=0.0025, binding=True):
        # Fan subdivisions let each sewn flap follow the compound fabric crown.
        outline = np.array(outline)
        edge = np.concatenate([
            np.linspace(a, b, 9, endpoint=False)
            for a, b in zip(outline, np.roll(outline, -1, axis=0))
        ])
        center = outline.mean(axis=0)
        verts = [center]
        steps = 8
        for radius in np.linspace(1 / steps, 1, steps):
            verts.extend(center + (edge - center) * radius)
        triangles = [[0, 1 + j, 1 + (j + 1) % len(edge)] for j in range(len(edge))]
        for r in range(steps - 1):
            for j in range(len(edge)):
                a = 1 + r * len(edge) + j
                b = 1 + r * len(edge) + (j + 1) % len(edge)
                triangles.extend([[a, b, b + len(edge)], [a, b + len(edge), a + len(edge)]])
        verts = np.array(verts)
        top = np.column_stack([verts[:, 0], crown(verts[:, 0], verts[:, 1]) + offset, verts[:, 1]])
        bottom = top.copy()
        bottom[:, 1] -= 0.002
        n = len(top)
        shell_faces = triangles + [[c + n, b + n, a + n] for a, b, c in triangles]
        start = 1 + (steps - 1) * len(edge)
        for j in range(len(edge)):
            a, b = start + j, start + (j + 1) % len(edge)
            shell_faces.extend([[a, a + n, b + n], [a, b + n, b]])
        add(name, trimesh.Trimesh(vertices=np.vstack([top, bottom]), faces=shell_faces))
        if binding:
            tube(name + "-binding", np.column_stack([
                edge[:, 0], crown(edge[:, 0], edge[:, 1]) + offset + 0.0005, edge[:, 1]
            ]), closed=True)

    # Separate reserve and main flaps, protected center pin covers, and side wings.
    panel("pilot-parachute-reserve-flap", [(-0.116, 0.425), (0.116, 0.425), (0.112, 0.50), (0, 0.577), (-0.112, 0.50)])
    for sign, suffix in [(-1, "left"), (1, "right")]:
        panel(f"pilot-parachute-main-side-{suffix}", [
            (sign * 0.143, 0.565), (sign * 0.127, 0.775), (0, 0.738), (sign * 0.017, 0.647)
        ], offset=0.0035)
        panel(f"pilot-parachute-fabric-inlay-{suffix}", [
            (sign * 0.119, 0.467), (sign * 0.134, 0.538),
            (sign * 0.123, 0.69), (sign * 0.108, 0.754),
            (sign * 0.115, 0.594), (sign * 0.104, 0.52),
        ], offset=0.005, binding=False)
    panel("pilot-parachute-main-bottom-flap", [(-0.115, 0.883), (0, 0.758), (0.115, 0.883), (0.09, 0.905), (-0.09, 0.905)], offset=0.004)
    panel("pilot-parachute-main-pin-cover", [(0, 0.66), (0.029, 0.696), (0.018, 0.767), (-0.020, 0.767), (-0.028, 0.698)], offset=0.008)
    panel("pilot-parachute-reserve-pin-cover", [(-0.029, 0.428), (0.029, 0.428), (0.026, 0.50), (0, 0.529), (-0.026, 0.50)], offset=0.007)

    # A continuous bound edge reads as sewn fabric instead of a hard plastic box.
    for sign, suffix in [(-1, "left"), (1, "right")]:
        z = np.linspace(0.414, 0.914, 60)
        x = sign * width(z) * 0.96
        tube(f"pilot-parachute-perimeter-binding-{suffix}", np.column_stack([x, crown(x, z) + 0.001, z]), 0.002)

    def webbing(name, points, width_m=0.043, depth=0.004, body=None):
        points = np.array(points)
        if body is not None:
            points, normals = skin(points, body)
            tangent = np.gradient(points, axis=0)
            across = np.cross(tangent, normals)
            across /= np.maximum(np.linalg.norm(across, axis=1)[:, None], 1e-9)
            # Fit the entire width to the body, not only a floating center line.
            columns = 7
            grid = points[:, None] + across[:, None] * np.linspace(-width_m / 2, width_m / 2, columns)[None, :, None]
            bottom, normal = skin(grid.reshape(-1, 3), body, clearance=0.0025)
            top = bottom + normal * depth
            n = len(bottom)
            faces = []
            for row in range(len(points) - 1):
                for col in range(columns - 1):
                    a = row * columns + col
                    b, c, d = a + 1, a + columns, a + columns + 1
                    faces.extend([[a, b, d], [a, d, c], [a + n, d + n, b + n], [a + n, c + n, d + n]])
            boundary = list(range(columns))
            boundary += [row * columns + columns - 1 for row in range(1, len(points))]
            boundary += list(range(n - 2, n - columns - 1, -1))
            boundary += [row * columns for row in range(len(points) - 2, 0, -1)]
            for a, b in zip(boundary, boundary[1:] + boundary[:1]):
                faces.extend([[a, a + n, b + n], [a, b + n, b]])
            add(name, trimesh.Trimesh(vertices=np.vstack([bottom, top]), faces=faces))
            return
        tangent = np.gradient(points, axis=0)
        tangent /= np.linalg.norm(tangent, axis=1)[:, None]
        across = np.cross(tangent, [0, 1, 0])
        near_vertical = np.linalg.norm(across, axis=1) < 0.05
        across[near_vertical] = [1, 0, 0]
        across /= np.linalg.norm(across, axis=1)[:, None]
        normal = np.cross(across, tangent)
        verts = np.concatenate([
            points + across * width_m * 0.5 + normal * depth * 0.5,
            points - across * width_m * 0.5 + normal * depth * 0.5,
            points + across * width_m * 0.5 - normal * depth * 0.5,
            points - across * width_m * 0.5 - normal * depth * 0.5,
        ])
        n = len(points)
        faces = []
        for i in range(n - 1):
            for a, b in [(0, n), (n, 3 * n), (3 * n, 2 * n), (2 * n, 0)]:
                faces.extend([[a + i, b + i, b + i + 1], [a + i, b + i + 1, a + i + 1]])
        faces.extend([[0, 2 * n, 3 * n], [0, 3 * n, n], [n - 1, 2 * n - 1, 4 * n - 1], [n - 1, 4 * n - 1, 3 * n - 1]])
        add(name, trimesh.Trimesh(vertices=verts, faces=faces))

    def smooth_path(points, steps=64):
        points = np.array(points)
        distance = np.r_[0, np.cumsum(np.linalg.norm(np.diff(points, axis=0), axis=1))]
        return PchipInterpolator(distance, points, axis=0)(np.linspace(0, distance[-1], steps))

    for sign, suffix in [(-1, "left"), (1, "right")]:
        # Riser covers continue over the shoulder into the main lift web.
        webbing(f"pilot-parachute-riser-cover-{suffix}", smooth_path([
            [sign * 0.085, 0.22, 0.455], [sign * 0.105, 0.20, 0.402],
            [sign * 0.16, 0.123, 0.366], [sign * 0.19, 0.04, 0.385],
        ]), 0.055, 0.008, body=trimesh.util.concatenate([torso, scene.geometry["pilot-parachute-container"]]))
        webbing(f"pilot-harness-shoulder-{suffix}", smooth_path([
            [sign * 0.13, 0.155, 0.45], [sign * 0.22, 0.085, 0.43],
            [sign * 0.232, -0.015, 0.436], [sign * 0.188, -0.151, 0.49],
            [sign * 0.151, -0.194, 0.595],
            [sign * 0.156, -0.148, 0.796], [sign * 0.178, -0.09, 0.872],
        ]), body=torso)
        webbing(f"pilot-harness-waist-{suffix}", smooth_path([
            [sign * 0.09, 0.11, 0.848], [sign * 0.177, 0.019, 0.865],
            [sign * 0.184, -0.071, 0.869], [sign * 0.143, -0.142, 0.86],
        ]), 0.044, body=torso)
        # Leg straps wrap the upper thighs rather than forming solid belt blocks.
        angle = np.linspace(0, 2 * np.pi, 96)
        leg_loop = np.column_stack([
            sign * 0.10 + 0.15 * np.cos(angle),
            -0.08 + 0.15 * np.sin(angle), np.full(len(angle), 1.02),
        ])
        webbing(f"pilot-harness-leg-{suffix}", leg_loop, 0.043, body=scene.geometry[f"pilot-suit-leg-{suffix}"])
        # Three nested rings and adjustment loops give the harness recognizable hardware.
        for i, (radius, z) in enumerate([(0.016, 0.418), (0.011, 0.430), (0.006, 0.44)]):
            angle = np.linspace(0, 2 * np.pi, 25, endpoint=False)
            tube(f"pilot-harness-buckle-ring-{suffix}-{i}", np.column_stack([
                sign * 0.193 + radius * np.cos(angle),
                np.full(len(angle), -0.031 - i * 0.001), z + radius * np.sin(angle),
            ]), 0.002, closed=True)
        tube(f"pilot-harness-buckle-hip-{suffix}", [
            [sign * 0.174 - 0.024, -0.094, 0.851], [sign * 0.174 + 0.024, -0.094, 0.851],
            [sign * 0.174 + 0.024, -0.094, 0.881], [sign * 0.174 - 0.024, -0.094, 0.881],
        ], 0.0025, closed=True)
    webbing("pilot-harness-chest-strap", smooth_path([
        [-0.15, -0.186, 0.60], [0, -0.225, 0.605], [0.15, -0.186, 0.60],
    ]), 0.025, body=torso)
    tube("pilot-harness-buckle-chest", [
        [-0.034, -0.226, 0.589], [0.002, -0.23, 0.589],
        [0.002, -0.23, 0.62], [-0.034, -0.226, 0.62],
    ], 0.002, closed=True)
    for name, mesh in scene.geometry.items():
        if name.startswith("pilot-harness-buckle"):
            center = mesh.bounds.mean(axis=0)
            fitted, normal = skin([center], torso, clearance=0.008)
            rotation = trimesh.geometry.align_vectors([0, 1, 0], normal[0])[:3, :3]
            mesh.vertices = (mesh.vertices - center) @ rotation.T + fitted[0]
    # Low-profile bottom-of-container deployment handle, tucked at the right edge.
    tube("pilot-parachute-deployment-handle", [
        [0.108, 0.15, 0.882], [0.146, 0.15, 0.882], [0.146, 0.15, 0.9], [0.108, 0.15, 0.9],
    ], 0.007, closed=True)
    return scene
