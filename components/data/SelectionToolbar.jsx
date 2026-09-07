import React from 'react';

/** @param {import('./SelectionToolbar').SelectionToolbarProps} props */
export function SelectionToolbar({ count, children, className = '', ...rest }) {
  return (
    <div role="group" aria-label="Selection actions" className={['exds-selection-toolbar', className].filter(Boolean).join(' ')} {...rest}>
      <span role="status" aria-live="polite">{count} selected</span>
      {children}
    </div>
  );
}
