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
