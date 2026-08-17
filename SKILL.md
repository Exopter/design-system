---
name: exopter-design
description: Use the executable Exopter design tokens, components, assets, and implementation specimens when building Exopter interfaces.
user-invocable: true
---

Read `README.md` for the package contract and validation workflow. Use `styles.css` as the only global CSS entrypoint and import React components from `@exopter/design-system`; do not import component internals.

The authoritative design decisions, product rules, governance, and roadmap live in the [Exopter Design System in Notion](https://app.notion.com/p/3abe497e504f81c8a557e1f1a26e09ae). This repository contains executable implementation and visual specimens only.

Key implementation paths:

- `tokens/`: canonical CSS tokens and aliases.
- `components/`: shared React components and concise usage prompts.
- `guidelines/`: visual implementation specimens.
- `ui_kits/`: precompiled interactive specimens.
- `assets/`: implementation assets; logo marks remain non-final and must not be used as production identity without explicit approval.

Run `npm run check` after any implementation change. When a new visual pattern is required, evolve the shared token or component first and record the design decision in Notion.
