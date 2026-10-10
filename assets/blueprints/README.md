# Exowing blueprint assets

Static orthographic projections of the original Exowing V115 3MF assembly.
`source.json` records the source hash, assembly bounds and camera directions.
The source model remains outside this repository and is never modified.

Regenerate from the design-system root:

```sh
uv run scripts/render-wing-blueprints.py "/path/to/original.3mf"
uv run scripts/render-wing-blueprints.py --verify
```

The five exterior meshes use their assembly transforms. Concealed print joiners
are omitted. Source aircraft axes are forward −X, right +Y, up +Z. The front
camera faces the leading edge from −X; the plan camera is above the wing at +Z;
the left profile camera is at −Y, with the nose on the left.

All original triangles enter a shared depth buffer at twice the SVG resolution.
Silhouettes, sharp edges and sparse mesh-plane sections are clipped against this
buffer, hiding internal tubes and surfaces occluded by other parts. Visibility
does not depend on whole-part draw order. The combined silhouette is filled once
and simplified within 0.5 SVG units. SVG colors come from canonical tokens.
Pass `--review-dir /tmp/exowing-review` when regenerating to also render shaded
source-mesh PNGs with the exact same cameras for comparison. These assets are
illustrations, not manufacturing drawings.

Use `components/illustration/WingBlueprint.css` with semantic figures and images.
Provide descriptive image alternatives, explicit image dimensions, and captions.
The frame supports one primary image and a two-column strip of secondary views.
It requires no JavaScript or animation. Load the hero eagerly; defer lower views.

## Animated CAD assembly

`exowing-scene.glb` and `exowing-seat.glb` derive from the 153-instance STEP
assembly dated 2026-04-08 in the archived kDrive. They retain the original
relative placement of the exterior wing skins, ventral fins, adjustable seat,
carbon plate and mounting hardware. Concealed ribs are omitted.

One shared transform maps CAD millimeters to display axes right +X, up +Y,
forward -Z, with a six-unit wing span. `scene-source.json` records the source
hash, leaf selection, transform and both output hashes. Imports of a different
source revision are rejected until its assembly leaves are reclassified.

`exowing-pilot.glb` uses the archived CAD mannequin with its original helmet,
posed arms, parallel legs and relaxed ankles. Fabric wing panels are omitted.
The torso is below the wing, face and visor down, with the back toward the wing.
The closed dorsal pack occupies the forward central recess. `flight_rig.py`
generates a contoured 306 x 515 mm textile container, with an 83-95 mm shoulder
section and a fuller 195-211 mm rear section meeting the wing recess height.
It retains separate main and reserve flaps, pin covers and riser covers.
Webbing conforms across its entire width to the posed torso and thigh meshes,
with a 2.5 mm base clearance; ring hardware follows the same body surface.
The archived pack integration sketches
guide its silhouette; `pilot-source.json` lists the references. It is an original
presentation mesh, not downloaded manufacturer CAD. Mannequin articulation
and seat fit are visual approximations, not a qualified mechanical assembly.
`pilot-source.json` records the source, placement and reference image.

Regenerate these derived assets without modifying the archive:

```sh
uv run scripts/export-wing-scene.py "/path/to/EXOPTER KDrive au 2026.10.10"
uv run scripts/verify-flight-rig.py
uv run scripts/build-flight-presentation.py
```

The tessellated source is cached by its STEP hash in the system temporary
directory. Removing that cache safely forces a fresh CAD import.

Use `components/illustration/FlightScene.css` for the progressively enhanced
figure, static image, caption and keyboard-accessible controls. Set
`data-scene-state="ready"` only after rendering succeeds, retain the SVG when
WebGL fails, and hide controls until the scene is available. The runtime owns
pause, reduced-motion, offscreen suspension and resource disposal. The
Underwing control reveals the seat and mounting hardware.

## Airflow asset

`build-flight-presentation.py` reads the exported wing, seat and pilot to build
time-parametrized streamlines in `exowing-flow.json`, in their shared frame.
The offline field uses a 0.09-unit voxel grid, an incompressible pressure
projection, solid no-through-flow faces, a 5-degree inlet angle and prescribed
finite-core horseshoe circulation. RK2 integration retains travel times so
animated tracers accelerate with the field. Every retained segment is checked
against the actual solid triangle surfaces after conservative voxel clearance.
`flow-source.json` records all three mesh hashes, solver residuals and
intersection checks. Regenerate it whenever any assembly geometry changes.

This is a reduced aerodynamic illustration, not validated CFD. No lift,
pressure coefficient, measured speed, viscous boundary layer, separation or
flight performance is inferred. Circulation is assumed, not solved by a Kutta
condition. The archived simulation images inform posture, not field values.
