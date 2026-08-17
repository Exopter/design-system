Instrument-style single-choice switcher for a small, explicit set of mutually exclusive options.

```jsx
<SegmentedControl
  ariaLabel="Flight view"
  defaultValue="live"
  options={[
    { value: 'live', label: 'Live' },
    { value: 'replay', label: 'Replay' },
    { value: 'analysis', label: 'Analysis', disabled: true },
  ]}
  onChange={setView}
/>
```

- Controlled (`value` + `onChange`) or uncontrolled (`defaultValue`).
- Each option may carry an `icon` and `disabled`.
- Prefer 2–4 options. Use `Select` when the set is larger.
- Arrow keys, Home, and End move the selected option.
