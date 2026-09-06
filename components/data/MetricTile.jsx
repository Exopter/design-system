import React from 'react';

/**
 * Exopter MetricTile — instrument readout with tabular numerals, unit, and optional delta.
 * state: default | ready | caution | fault | live ; trend: up | down | flat
 */
/** @param {import("./MetricTile").MetricTileProps} props */
export function MetricTile({
  label, icon = null, value, unit, delta, trend = 'flat',
  state = 'default', sunken = false, className = '',
}) {
  const arrow = trend === 'up' ? '▲' : trend === 'down' ? '▼' : '–';
  return (
    <div className={['exds-metric', state !== 'default' ? `exds-metric--${state}` : '', sunken ? 'exds-metric--sunken' : '', className].filter(Boolean).join(' ')}>
      <span className="exds-metric__label">{icon}{label}</span>
      <span className="exds-metric__value">{value}{unit && <span className="exds-metric__unit">{unit}</span>}</span>
      {delta != null && (
        <span className={`exds-metric__delta exds-metric__delta--${trend}`}>{arrow} {delta}</span>
      )}
    </div>
  );
}
