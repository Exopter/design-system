# Exopter design-system implementation

This repository contains the executable design-system package used by Sillage.
Design rationale, product rules, governance, and component decisions live in
the [Exopter Design System in Notion](https://app.notion.com/p/3abe497e504f81c8a557e1f1a26e09ae).

## Structure

- `tokens/`: CSS design tokens.
- `components/`: reusable component implementations and coding prompts.
- `guidelines/`: visual specimens for implemented foundations.
- `ui_kits/os-flight/`: shared Sillage operations UI kit.
- `assets/`: implementation assets used by the catalogue and UI kit.
- `index.html`: local visual catalogue.

The Rails implementation lives in
[Exopter/sillage](https://github.com/Exopter/sillage), under
`app/assets/stylesheets/exopter_design_system.css`. Shared Rails compositions
live in `app/assets/stylesheets/application.css` and
`app/assets/stylesheets/hangar_forge.css`.

Product screens must reuse these shared tokens and components. When a new
visual pattern is required, evolve the shared implementation first and record
the product or design decision in Notion.
