import React from 'react';

const X = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>);

/**
 * Exopter Toast — transient operational notification.
 * tone: info | ready | caution | fault
 */
/** @param {import("./Toast").ToastProps} props */
export function Toast({ tone = 'info', icon = null, title, children, onClose, className = '' }) {
  return (
    <div role="status" className={['exds-toast', `exds-toast--${tone}`, className].filter(Boolean).join(' ')}>
      {icon && <span className="exds-toast__icon">{icon}</span>}
      <div className="exds-toast__body">
        {title && <div className="exds-toast__title">{title}</div>}
        {children && <div className="exds-toast__msg">{children}</div>}
      </div>
      {onClose && <button type="button" className="exds-toast__close" aria-label="Dismiss" onClick={onClose}><X/></button>}
    </div>
  );
}
