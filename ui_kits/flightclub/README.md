# Flight Club membership specimen

Standalone Three.js design study. Uses the canonical Aptos fonts, Exopter wordmark, EX flight-trails monogram and Exowing axonometric blueprint. No backend, email delivery, membership permissions, billing or flight recording is connected. All member data is a mock fixture.

From the repository root:

```sh
npm ci
python3 -m http.server 3117 --bind 127.0.0.1
```

Open `http://127.0.0.1:3117/ui_kits/flightclub/`. Stop the preview with Ctrl+C.

The card has beveled geometry, a machined rank insignia, physical materials, environment lighting, pointer tilt, drag rotation, a reverse face and a replayable welcome. The account dialog demonstrates persistent Pioneer identity. Future rank buttons preview Explorer (20K), Pathfinder (50K) and Trailblazer (100K) without changing the account's Pioneer status. Threshold units and eligibility rules are intentionally undefined in this visual study.

The carbon substrate carries the existing Exowing illustration as a crisp neutral engraving. Wordmark, EX monogram, Flight Club lettering and the enlarged rank label use separate metallic inlays with brushed bump textures and angle-driven reflection bands. Pioneer combines violet titanium, a spatially varying interference film and etched shield contours. Future finishes are brushed copper (Explorer), brushed silver (Pathfinder) and champagne gold (Trailblazer). These are material previews, not membership eligibility changes. The account thumbnail is captured from the same Pioneer scene.

The carbon faces use a matte finish without a reflective clearcoat to preserve text and engraving contrast. Common lighting, carbon fibers, blueprint strokes, secondary text and contact shadows are achromatic. Violet haze and iridescent edge treatment are restricted to Pioneer. Each preview has its own reverse texture; rank switches update both faces and the edge material.

Reduced motion suppresses idle float, pointer tilt and the reveal spin. The scene pauses in hidden tabs and provides a static fallback if WebGL initialization fails. Core card actions have keyboard-accessible buttons and announcements.

This is an exploratory specimen, not an approved design-system baseline or production feature. No canonical tokens or shared components are changed. Product decisions remain in Notion Engineering.
