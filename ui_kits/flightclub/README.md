# Flight Club membership specimen

Standalone Three.js design study. `membership-card.js` is the reusable card module (member name, number, rank and joining date are options; it owns its canvas only); `flightclub.js` is the specimen page around it. Sillage vendors the module as `app/javascript/lib/membership_card.js`. Uses the canonical Aptos fonts, Exopter wordmark, EX flight-trails monogram and Exowing axonometric blueprint. No backend, email delivery, membership permissions, billing or flight recording is connected. All member data is a mock fixture.

From the repository root:

```sh
npm ci
python3 -m http.server 3117 --bind 127.0.0.1
```

Open `http://127.0.0.1:3117/ui_kits/flightclub/`. Stop the preview with Ctrl+C.

The card has beveled geometry, a machined rank insignia, physical materials, studio lighting, a reverse face and a replayable welcome. Pointer hover adds a small temporary tilt and moves the key light; leaving the scene restores the slightly upward default. Turn card, a click or tap on the card, or a horizontal drag switches between the front and reverse. Dragging is an elastic handhold: the card follows the pointer, leans on vertical travel and always settles back on a face, one face per release at most. Persistent free rotation stays excluded; pass `dragToTurn: false` to keep hover, click and button only. Turns and rank changes use an underdamped spring; a rank change adds a short nod. The welcome is one staged sequence: the invitation assembles line by line, then clears; the card rises unlit and without its insignia, with a small reveal tilt; the insignia forms above the card and lands 1.5 s in, which pushes the card back on its springs and releases a glint, one pass of light across the lettering and the stage glow; the card then makes one full 360 degree turn that presents both faces and settles on the front; the stage labels return last. Any drag or turn cancels the sequence to its final state. Touch keeps vertical page scrolling. The account dialog demonstrates persistent Pioneer identity. Future rank buttons preview Explorer (20K), Pathfinder (50K) and Trailblazer (100K) without changing the account's Pioneer status. Threshold units and eligibility rules are intentionally undefined in this visual study.

The carbon substrate is a 2/2 twill at card scale (tows about 2 mm wide). The weave, the altitude rings and the Exowing illustration live in one relief and gloss map: they are engraved rather than printed, stay tone-on-tone at rest and light up on tilt. The matte face has no clearcoat, which preserves lettering contrast. Wordmark, EX monogram, Flight Club lettering, member name, member number, the hairline border and the reverse motto are metal inlays with a beveled relief derived from their own mask, a legibility floor and one reflection band driven by the card orientation. Printed secondary text is at least 30 px on the 2048 px card texture.

The five integrated models are Pioneer (blue-green iridescent titanium), Explorer (brushed copper), Pathfinder (brushed silver), Trailblazer (champagne gold) and Core Team (violet cut crystal, Electric amethyst). The stable `core_team` key selects the violet model. The insignia on every card is the faceted plan-view Exowing sampled from `assets/blueprints/exowing-scene.glb`; ranks differ by material rather than stripe count. The crystal facets scintillate as the card moves. The ruby and blue crystal explorations are not part of the integrated rank registry.

`scripts/export-flightclub-wing-facets.py` samples the source wing at seven spanwise stations per side. Its output is embedded as `WING_FACETS` in the shared module and reused by the SVG insignia exporter. Open [models.html](models.html) to compare the five current email renders. The shared module is synchronized into Sillage by `script/sync_landing_assets` together with the badges and email images.

The environment is a dark studio with long softboxes placed 20 to 40 degrees off the viewing axis, so metals show gradients at rest and pointer tilt sweeps highlights across them. All ranks share the same shader programs, and future rank textures are painted and uploaded during idle time, so a rank preview does not stall on first use. Rendering stops while the stage is off screen or the tab is hidden. The contact shadow narrows as the card turns and softens as it rises.

Reduced motion suppresses idle float, pointer tilt, dragging, springs and the reveal motion. The scene pauses in hidden tabs and provides a static fallback if WebGL initialization fails. Core card actions have keyboard-accessible buttons and announcements.

## Rails profile integration

`templates/rails/WorkbenchShell.css` owns the responsive member profile and shared photo avatar. `assets/flight-club/insignia-*.svg` provides lightweight shield counterparts for every rank. Regenerate them with `node scripts/export-flight-club-insignia.mjs`; use `--check` to verify their current sources. The exporter reads the shared rank palettes and Exowing facet geometry, so miniature badges match their physical cards. Sillage synchronizes these assets with `script/sync_landing_assets` and uses them on the profile, account menu and flight comments.

The Rails invitation, onboarding and membership UI use dark carbon surfaces with the shared `--ex-flight-club-accent` light rose gold (`#D9B98A`, hover `#E4CAAA`). The membership card region in the profile uses the same scoped accent; the surrounding Sillage workbench retains mineral khaki. Card materials and insignia retain their rank finishes. `mail-renders.html` exports the same five physical cards on the carbon email background and a light PNG wordmark. Serve the repository root locally, open that page and save its six assets into `assets/flight-club/`; synchronize Sillage with `script/sync_landing_assets --write`. The email layouts carry inline equivalents of the canonical dark palette and Flight Club accent for mail clients.

The standalone specimen remains exploratory. The Rails integration is local implementation, not a production deployment. Product and design decisions remain in [Notion Engineering](https://app.notion.com/p/3abe497e504f81c8a557e1f1a26e09ae).
