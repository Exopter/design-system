import React from 'react';

const Chevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
);

/**
 * Exopter Select — native select with instrument-style chrome.
 * options: [{ value, label, disabled? }] (or pass children <option>s).
 */
/** @param {import("./Select").SelectProps} props */
export function Select({ label, options, id, className = '', children, ...rest }) {
  const generatedId = React.useId().replaceAll(':', '');
  const sid = id || `exds-select-${generatedId}`;
  return (
    <div className={['exds-select-field', className].filter(Boolean).join(' ')}>
      {label && <label className="exds-select-field__label" htmlFor={sid}>{label}</label>}
      <div className="exds-select-wrap">
        <select id={sid} className="exds-select" {...rest}>
          {options ? options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
          )) : children}
        </select>
        <span className="exds-select-wrap__chev"><Chevron /></span>
      </div>
    </div>
  );
}
