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

## Colour and alerting standard

State and alert colours follow the aerospace alerting convention. Apply it to
every token, component, specimen and product screen.

| Colour | Meaning | Use for |
| --- | --- | --- |
| Red | Warning | Fault, failure, inoperative, action required now |
| Amber or yellow | Caution | Marginal condition, recheck, delay, degraded link |
| Green | Nominal | In tolerance, ready, function activated: live session, active recorder |
| White or neutral (khaki, graphite) | No right or wrong implication | Selection, transitory states such as processing, unknown |
| Blue or cyan | Advisory | Information only; never the preferred status colour |

- Reserve red for warnings. Never use it for a nominal state, an activity
  indicator or decoration. Keep non-alerting uses of red and amber limited.
- Reserve flashing for events that need immediate attention. A slow glow is
  allowed on nominal running states and must stop under reduced motion.
- Never rely on colour alone: pair every state with a label, an icon or a
  shape.
- Confirmed exception: the open debrief microphone uses the red `openmic`
  treatment, following the camera and audio recording convention.
- Any other use that departs from this table needs Julien's explicit
  confirmation before it is implemented. State the deviation, the rule it
  departs from and the compliant alternative, then record a confirmed
  exception in the list above.

References:

- Civil: 14 CFR 25.1322 and CS 25.1322 paragraphs (e) and (f), with
  AC 25.1322-1 and AMC 25.1322.
- Military: MIL-STD-411F paragraph 5.2.5.4 (aircrew alerting) and
  MIL-STD-1472 colour coding (paragraph 5.2.2.1.13 in revision F).
- Space: NASA-STD-3001 Volume 2, Appendix F Display Standard, sections
  F.5.10 (colour), F.5.11 (flash coding) and F.6.4 (alerts).
