# SelectionToolbar

Pass the selected row count and action controls as children. Disable destructive
actions when count is zero. The component announces count changes and wraps its
actions on narrow screens. It does not own selection or confirmation behavior.

Server-rendered consumers use the same HTML structure and canonical CSS. Keep
the status element separate from the buttons so count announcements remain brief.
