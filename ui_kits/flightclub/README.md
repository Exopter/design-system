# Flight Club membership specimen

Standalone Three.js design study. Uses the canonical Aptos fonts, Exopter wordmark and Flight palette. No backend, email delivery, membership permissions, billing or flight recording is connected. All member data is a mock fixture.

From the repository root:

```sh
npm ci
python3 -m http.server 3117 --bind 127.0.0.1
```

Open `http://127.0.0.1:3117/ui_kits/flightclub/`. Stop the preview with Ctrl+C.

The card has beveled geometry, a machined rank insignia, physical materials, environment lighting, pointer tilt, drag rotation, a reverse face and a replayable welcome. The account dialog demonstrates persistent Pioneer identity. Future rank buttons preview Explorer (20K), Pathfinder (50K) and Trailblazer (100K) without changing the account's Pioneer status. Threshold units and eligibility rules are intentionally undefined in this visual study.

Reduced motion suppresses idle float, pointer tilt and the reveal spin. The scene pauses in hidden tabs and provides a static fallback if WebGL initialization fails. Core card actions have keyboard-accessible buttons and announcements.

This is an exploratory specimen, not an approved design-system baseline or production feature. No canonical tokens or shared components are changed. Product decisions remain in Notion Engineering.
