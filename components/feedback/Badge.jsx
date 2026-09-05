import React from 'react';

/**
 * Exopter Badge — compact status / mode token. Always shows a label (never color-only).
 * tone: neutral | ready | live | caution | fault | info | solid
 */
export function Badge({ tone = 'neutral', icon = null, children, className = '' }) {
  return (
    <span className={['exds-badge', `exds-badge--${tone}`, className].filter(Boolean).join(' ')}>
      {icon}{children}
    </span>
  );
}
