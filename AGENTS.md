# Project Instructions

Follow the [Exopter workspace instructions](../AGENTS.md), including the shared
performance, documentation and project-file rules.

- Work 100% in English for documentation, code comments, UI copy, tests,
  fixtures, commit messages, PR text, issue text, and operational notes.
- Keep this repository focused on executable tokens, components, assets,
  specimens, UI kits, implementation contracts, and concise technical READMEs.
- Own all Exopter interface appearance in this design system. Consumers must
  use shared tokens, primitives and compositions without independent themes
  or visual overrides. Evolve the shared source before adding a pattern.

## Documentation

The design system documents its current state, not its history.

- Tokens, components and their specimens are the documentation of how things
  look and behave. Keep them clear enough to need no commentary.
- The Exopter Design System page in Notion Engineering holds only the durable
  rules that code cannot express: principles, the layout and state models,
  voice, accessibility, and the rules each product room must follow.
- Add a rule to Notion only when it applies beyond one screen and cannot be
  read from a token, a component or a specimen. Most changes need no Notion
  edit.
- Write each rule once, in the present tense, where a reader looks for it.
  When a rule changes, rewrite it in place and delete what it replaces.
- Do not keep a decision log. Leave dates, pull request numbers, commit
  hashes, test counts and release narratives to Git history and pull requests.
- Describe a feature's behaviour in that product's own documentation, not in
  the design system.
- Run software validation locally with `npm run check` under the shared
  scope and execution rules.
