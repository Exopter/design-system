# ColumnBrowser

Server-rendered file navigation with an accessible folder sidebar, a collection,
and a selected-object preview. Use canonical `exds-browser-*` CSS classes.
The consumer supplies routes, selection, folder counts and actual preview data.
Folder visibility governs access to its contents without transferring ownership.
Folder colours use a closed six-colour palette: Sage (`--ex-field-500`), Sky
(`--ex-sky-500`), Mint (`--ex-aqua-500`), Amber (`--ex-amber-500`), Iris
(`--ex-violet-500`) and Slate (`--ex-graphite-500`). Persist the owner's choice
as folder metadata shared by all viewers; do not derive colours from record IDs
or accept arbitrary CSS colours. Default all folders to Slate. The direct palette
icon opens `exds-browser-color-popover` immediately below it, using the native
popover top layer so scrolling columns do not clip it. Six compact labelled
swatch buttons show the selected colour with a checkmark and visible focus.
Clicking applies and saves immediately, without a dialog, name field or Save
button. Preserve navigation and selection; restore the previous colour and show
an inline error if saving fails. Escape and outside click dismiss the palette.
During folder creation, show the same six colours as native radio swatches in an
`exds-browser-color-field` fieldset labelled Color, with Slate selected by default.
Use `exds-browser-color-radio` labels with 44px targets, a selection checkmark and
visible keyboard focus. Submit the chosen colour with Create folder and preserve
it when another field fails validation.

Use real links for progressive navigation, native named checkboxes for bulk
selection, and a labelled move form as the keyboard/touch alternative to drag
and drop. `aria-current` identifies the active folder, entry and view. Dragging
sets `data-drop-active` on an eligible folder; never move external payloads.
Only owned objects are draggable or selectable. Confirm destructive actions.

Desktop uses three columns; compact screens replace the collection with its preview.
On phones the folder navigation scrolls horizontally, and `data-mobile-preview`
shows the selected preview with an explicit Back to flights control. Keyboard
arrows navigate entries and Enter opens their detail page. Do not intercept
typing, modifier keys, or controls outside the collection.

Columns is the only view. Do not add a breadcrumb row; the selected folder and
flight are already identified by their column headings. Keep visibility filtering
in the main header beside search. Changing filters clears bulk selection. Folder actions
live in the folder column, without a separate management page: a New folder icon
in the section header and direct members, rename and delete icons under the active
owned folder. Keep those actions available by keyboard and touch. Moving
an object uses a compact inline icon and a centered destination dialog.
Selected-object preview updates independently of the collection; preserve list
scroll and keyboard focus. Use a lightweight 2D geographic preview; reserve 3D
for the complete flight analysis. Folder membership and inherited visibility
are explicit in the sidebar, sharing dialog and preview metadata.
Creation, editing, import and preparation use the same workspace, with the form
or details in the right column. Keep folder navigation and the collection visible
on desktop; on mobile open the contextual panel with a labelled Close control.
Use `exds-browser-editor`, `exds-browser-form`, `exds-browser-field` and
`exds-browser-form-actions` for embedded forms. Preserve collection filters and
folder context on validation, save and cancel. Direct URLs render the full
workspace; a nested preview selection restores the collection URL. Do not add
a separate preparation tab or return these flows to a standalone page shell.
Add members through an email search with a bounded server result list, never a
checkbox directory of all users. Show selected people with direct remove icons.
Support arrow keys, Enter and Escape in the search; announce results and failures.
Cancel stale requests, exclude selected people, and apply membership only on Save.
Empty folders, unavailable geography and raw recording states need explicit
text. Geographic previews must visualize actual records, never sample imagery.
