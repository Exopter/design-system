# HUD design QA

## Evidence

- Source visual truth: `/Users/julien/.codex/visualizations/2026/08/04/019fcbd2-e546-7380-a0b2-90d6f219cc6a/hud-final/reference.png`
- Browser-rendered implementation: `/Users/julien/.codex/visualizations/2026/08/04/019fcbd2-e546-7380-a0b2-90d6f219cc6a/hud-final/implementation-viewport.png`
- Normalized implementation crop: `/Users/julien/.codex/visualizations/2026/08/04/019fcbd2-e546-7380-a0b2-90d6f219cc6a/hud-final/implementation.png`
- Full-view comparison: `/Users/julien/.codex/visualizations/2026/08/04/019fcbd2-e546-7380-a0b2-90d6f219cc6a/hud-final/comparison.png`
- Focused status, tape, and guidance comparison: `/Users/julien/.codex/visualizations/2026/08/04/019fcbd2-e546-7380-a0b2-90d6f219cc6a/hud-final/comparison-focus.png`
- Responsive evidence at 1024 px: `/Users/julien/.codex/visualizations/2026/08/04/019fcbd2-e546-7380-a0b2-90d6f219cc6a/hud-final/implementation-1024.png`

## Comparison setup

- State: HUD tab, pilot display live, fail-safe off.
- Browser viewport: 1366 × 1000 CSS px for the full canvas capture; 1024 × 820 CSS px for the responsive check.
- Source pixels: 1398 × 792. The six-pixel white capture strip was removed, leaving 1398 × 786.
- Implementation pixels: 1366 × 1000 for the browser viewport. The HUD content crop is 1253 × 705.
- Density normalization: browser screenshot pixels equal CSS viewport pixels, so device scale factor is 1. The source content was resized to 1253 × 705 before comparison.
- Primary interactions tested: open the HUD tab; switch fail-safe on; confirm the blank state; switch fail-safe off and restore the live display.
- Browser console: no errors.

## Findings

No actionable P0, P1, or P2 differences remain.

- Fonts and typography: the implementation keeps the shared Aptos Mono telemetry face, tabular figures, compact labels, and bold immediate-action hierarchy. It is slightly narrower than the source typeface, but preserves Exopter's established instrument language.
- Spacing and layout rhythm: the final tape positions, current-value boxes, central heading line, pitch ladder, status band, altitude thresholds, and immediate-action message follow the source scan zones. The 16:9 HUD crop is preserved at both checked widths.
- Colors and visual tokens: black, shared HUD green, caution yellow, and fault red map to the source semantics. The shared Exopter HUD green is slightly more lime than the reference; this is an accepted design-system constraint rather than an isolated screen override.
- Image quality and asset fidelity: the source contains instrument symbology rather than photographic or raster assets. The implementation uses the existing shared icon library for status and targeting icons; no placeholder imagery is present.
- Copy and content: source labels were intentionally adapted to Exopter telemetry and metric units (`km/h`, `m`, `TAS`, `MSL`, `AGL`, FDR link state) while retaining the reference hierarchy and warning semantics.

## Comparison history

1. Initial implementation review found two P2 composition differences: the vertical tapes sat too close to the outer edges, and the status band was too high and visually light. The tapes were moved into the reference scan zones, tape numerals and status icons were enlarged, and the status band was lowered. Post-fix evidence: `comparison.png` and `comparison-focus.png`.
2. The 1024 px responsive review found a P2 collision between altitude thresholds, the heading edge, and the current-altitude readout. Threshold heights were redistributed and the narrow heading bounds were reduced. Post-fix evidence: `implementation-1024.png`.

## Follow-up polish

- P3: a future hardware-specific pass could replace the compact bottom heading box with a curved compass rose once the actual optical field of view and projection geometry are known.
- P3: the top status icons remain intentionally smaller and more data-dense than the inspiration to preserve Exopter labels and live health values.

## Implementation checklist

- [x] Match the final black, green, caution, and fault visual hierarchy.
- [x] Add fixed speed, altitude, heading, pitch, threshold, and immediate-action scan zones.
- [x] Preserve Exopter metric data and shared iconography.
- [x] Verify fail-safe behavior and restore the live state.
- [x] Verify the primary 1366 px view and a 1024 px responsive view.
- [x] Check browser console errors.

final result: passed
