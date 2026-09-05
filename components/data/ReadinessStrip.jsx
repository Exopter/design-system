import React from 'react';

/**
 * Exopter ReadinessStrip — dense horizontal status band (mode, pilot, weather,
 * battery, FDR, comms…). Each item carries an explicit value, never color-only.
 * mode: optional leading mode token. items: [{ label, value, state }]
 */
export function ReadinessStrip({ mode, items = [], className = '', ...rest }) {
  return (
    <div className={['exds-strip', className].filter(Boolean).join(' ')} {...rest}>
      {mode && <div className="exds-strip__mode">{mode}</div>}
      {items.map((it, i) => (
        <div key={i} className={`exds-strip__item is-${it.state || 'unknown'}`}>
          <span className="exds-strip__k">{it.label}</span>
          <span className="exds-strip__v">
            <span className={['exds-strip__dot', it.state === 'pending' ? 'exds-strip__dot--hollow' : ''].filter(Boolean).join(' ')} />
            <span className="exds-strip__vlabel">{it.value}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
