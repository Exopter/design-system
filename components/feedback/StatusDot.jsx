import React from 'react';

/**
 * Exopter StatusDot — inline state indicator with uppercase label.
 * state: ready | live | pending | caution | fault | unknown
 */
export function StatusDot({ state = 'unknown', label, pulse = false, className = '' }) {
  const hollow = state === 'pending';
  const text = label ?? state.toUpperCase();
  return (
    <span className={['exds-statusdot', `exds-statusdot--${state}`, pulse ? 'exds-statusdot--pulse' : '', className].filter(Boolean).join(' ')}>
      <span className={['exds-statusdot__dot', hollow ? 'exds-statusdot__dot--hollow' : ''].filter(Boolean).join(' ')} />
      <span className="exds-statusdot__label">{text}</span>
    </span>
  );
}
