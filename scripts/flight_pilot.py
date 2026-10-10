"""Pose the archived CAD mannequin for rigid-wing presentation, in meters."""

import hashlib
import math
import numpy as np
import trimesh
from flight_rig import build_rig

PILOT_SHA256 = "9bc0c2441b68161ac9bb883a2926fae82d25dba9345203a2f97b41a850a3fb6a"


def build_pilot(src):
    if hashlib.sha256(src.read_bytes()).hexdigest() != PILOT_SHA256:
        raise ValueError(
            "Reclassify the mannequin components before using a different source"
        )
    raw = trimesh.load(src)
    parts = sorted(
        raw.split(only_watertight=False), key=lambda m: len(m.faces), reverse=True
    )
    basis = np.array(
        [[-1, 0, 0], [0, math.sqrt(0.75), -0.5], [0, -0.5, -math.sqrt(0.75)]]
    )
    # Roll the source body onto its front: visor and chest down, back toward +Y.
    labels = {
        0: "pilot-helmet-carbon",
        1: "pilot-suit-torso",
        2: "pilot-suit-leg-right",
        3: "pilot-suit-leg-left",
        4: "pilot-suit-arm-right",
        5: "pilot-suit-arm-left",
        6: "pilot-neck",
        7: "pilot-helmet-visor-upper",
        8: "pilot-helmet-visor-lower",
        9: "pilot-helmet-accent-left",
        10: "pilot-helmet-accent-right",
        11: "pilot-helmet-visor-chin",
        16: "pilot-helmet-trim-right",
        17: "pilot-helmet-trim-left",
    }
    scene = trimesh.Scene()
    for i, name in labels.items():
        m = parts[i].copy()
        m.vertices = m.vertices @ basis.T
        if i in [2, 3]:
            sign = np.sign(m.centroid[0])
            pivot = np.array([sign * 0.115, -0.045, 0.875])
            a = sign * math.radians(-24)
            R = np.array(
                [
                    [math.cos(a), 0, math.sin(a)],
                    [0, 1, 0],
                    [-math.sin(a), 0, math.cos(a)],
                ]
            )
            m.vertices = (m.vertices - pivot) @ R.T + pivot
            # Relax the ankles from the source's flexed wingsuit stance.
            ankle = np.array([sign * 0.15, -0.025, 1.825])
            weight = np.clip((m.vertices[:, 2] - 1.73) / 0.11, 0, 1)
            angle = math.radians(-65) * weight * weight * (3 - 2 * weight)
            offset = m.vertices - ankle
            m.vertices[:, 1] = (
                offset[:, 1] * np.cos(angle) - offset[:, 2] * np.sin(angle) + ankle[1]
            )
            m.vertices[:, 2] = (
                offset[:, 1] * np.sin(angle) + offset[:, 2] * np.cos(angle) + ankle[2]
            )
        if i in [4, 5]:
            sign = np.sign(m.centroid[0])
            v = m.vertices.copy()
            t = np.clip((abs(v[:, 0]) - 0.20) / 0.54, 0, 1)
            old_start = np.array([sign * 0.20, -0.012, 0.405])
            old_end = np.array([sign * 0.74, -0.10, 0.76])
            old_mid = old_start + (old_end - old_start) * 0.52
            new_start = old_start
            new_mid = np.array([sign * 0.37, -0.17, 0.81])
            new_end = np.array([sign * 0.29, -0.13, 0.49])
            left = trimesh.geometry.align_vectors(
                old_mid - old_start, new_mid - new_start
            )[:3, :3]
            right = trimesh.geometry.align_vectors(
                old_end - old_mid, new_end - new_mid
            )[:3, :3]
            a = (v - old_start) @ left.T + new_start
            b = (v - old_mid) @ right.T + new_mid
            weight = np.clip((t - 0.43) / 0.18, 0, 1)
            weight = weight * weight * (3 - 2 * weight)
            m.vertices = a * (1 - weight[:, None]) + b * weight[:, None]
        budget = 12000 if i == 0 else 10000 if i in [1, 2, 3] else 6500
        if len(m.faces) > budget:
            m = m.simplify_quadric_decimation(face_count=budget)
        # Keep the rolled torso centered under the seat and clear of the skin.
        m.apply_translation([0, -0.03, 0])
        m.fix_normals(multibody=True)
        scene.add_geometry(m, geom_name=name, node_name=name)

    return build_rig(scene)
