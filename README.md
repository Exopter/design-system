# Exopter design-system implementation

This repository is the canonical executable source for Exopter design tokens and shared React components. Design rationale, governance, product decisions, and roadmap content live in the [Exopter Design System in Notion](https://app.notion.com/p/3abe497e504f81c8a557e1f1a26e09ae).

## Requirements

- Node.js 22 or newer
- npm 11 or newer

## Install and validate

Run validation locally before committing. GitHub Actions is disabled.

```sh
npm ci
npm run check
```

`npm run check` verifies that generated artifacts are current, runs the component and contract tests, and checks the publishable package contents. Use `npm run build` after changing components, tokens, metadata annotations, or specimen sources.

## Public package contract

- `@exopter/design-system`: React component exports from `index.js` and `index.d.ts`.
- `@exopter/design-system/styles.css`: the single global CSS entrypoint.
- `@exopter/design-system/tokens/exopter-tokens.css`: canonical low-level Exopter tokens.
- `@exopter/design-system/tokens/aliases.css`: semantic component aliases.
- `_ds_bundle.js`: generated browser-global component bundle for static specimens.
- `_ds_manifest.json`: generated catalogue and component/token adherence metadata.
- `_adherence.oxlintrc.json`: generated, runnable Oxlint consumer-import guardrail.

Import `@exopter/design-system/styles.css` once in every consumer, including
server-rendered applications. It includes tokens, fonts, and component styles.
JavaScript imports do not inject styles or access the DOM; unused components can
be removed by a bundler. Static specimens already link the same CSS entrypoint.

The canonical Sillage token source is `tokens/exopter-tokens.css`. A consumer can verify or update an exported copy without adding a second transformation:

```sh
npm run check:sillage -- /path/to/exopter_design_system.css
npm run export:sillage -- /path/to/exopter_design_system.css
```

The export is byte-for-byte identical to the canonical source. Consumer repositories should run the check in CI.

## Repository structure

- `tokens/`: canonical tokens, semantic aliases, and font declarations.
- `fonts/`: licensed self-hosted families used by active roles.
- `components/`: React implementations, declarations, prompts, and specimens.
- `guidelines/`: visual specimens for implemented foundations.
- `ui_kits/`: precompiled interactive implementation specimens.
- `templates/`: platform template runtime and entrypoints.
- `scripts/`: deterministic generation and export tooling.
- `tests/`: component accessibility and generated-contract tests.

Open `index.html` through a local static server to browse the catalogue. Product screens must reuse shared tokens and components; record new product or design decisions in Notion before extending the executable implementation.
