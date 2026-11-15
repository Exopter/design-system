import React from 'react';

/** @param {import('./SignalStrength').SignalStrengthProps} props */
export function SignalStrength({ label, quality = 'Unavailable', level = 0, value = '---', className = '', ...rest }) {
  return (
    <div className={['exds-signal-strength', className].filter(Boolean).join(' ')} data-level={level} {...rest}>
      <div className="exds-signal-strength__heading">
        <svg viewBox="0 0 24 20" width="24" height="20" aria-hidden="true">
          <rect x="1" y="14" width="4" height="5" rx="1" />
          <rect x="7" y="10" width="4" height="9" rx="1" />
          <rect x="13" y="5" width="4" height="14" rx="1" />
          <rect x="19" y="1" width="4" height="18" rx="1" />
        </svg>
        <span className="exds-signal-strength__label">{label}</span>
        <strong className="exds-signal-strength__quality">{quality}</strong>
      </div>
      <small className="exds-signal-strength__value">{value}</small>
    </div>
  );
}
