import React from 'react';

/**
 * Exopter Switch — physical-style on/off toggle. Field green when on.
 * Controlled via `checked` + `onChange`, or uncontrolled via `defaultChecked`.
 */
/** @param {import("./Switch").SwitchProps} props */
export function Switch({ checked, defaultChecked, onChange, disabled = false, label, id, className = '', ...rest }) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  /** @param {React.ChangeEvent<HTMLInputElement>} e */
  const handle = (e) => { if (!isControlled) setInternal(e.target.checked); if (onChange) onChange(e); };
  const generatedId = React.useId().replaceAll(':', '');
  const sid = id || `exds-switch-${generatedId}`;
  return (
    <label className={['exds-switch', className].filter(Boolean).join(' ')} data-disabled={disabled ? 'true' : 'false'} htmlFor={sid}>
      <input id={sid} type="checkbox" role="switch" checked={on} disabled={disabled} onChange={handle} {...rest} />
      <span className="exds-switch__track" data-on={on ? 'true' : 'false'}><span className="exds-switch__thumb" /></span>
      {label && <span className="exds-switch__label">{label}</span>}
    </label>
  );
}
