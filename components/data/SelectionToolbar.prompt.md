# SelectionToolbar

Pass the selected row count and action controls as children. Disable destructive
actions when count is zero. The component announces count changes and wraps its
actions on narrow screens. It does not own selection or confirmation behavior.

Server-rendered consumers use the same HTML structure and canonical CSS. Keep
the status element separate from the buttons so count announcements remain brief.

For a destination-dependent action, wrap its visible label and select in
`exds-selection-field`. Keep the action disabled until the selection is eligible
and a destination has been chosen. Scope destructive confirmation to its button
so a move or other reversible action does not trigger a deletion prompt.
