import React from 'react';

const FOCUSABLE = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

/** Right-side modal drawer with focus trapping, Escape handling, and focus restoration. */
export function Drawer({ open = true, title, eyebrow = '', description = '', onClose, children, footer = null, ariaLabel, className = '' }) {
  const dialogRef = React.useRef(null);
  const openerRef = React.useRef(null);
  const closeRef = React.useRef(onClose);
  closeRef.current = onClose;

  React.useEffect(() => {
    if (!open) return undefined;
    openerRef.current = document.activeElement;
    const dialog = dialogRef.current;
    if (!dialog) return undefined;
    const focusable = () => [...dialog.querySelectorAll(FOCUSABLE)];
    const frame = requestAnimationFrame(() => (focusable()[0] || dialog).focus());
    const handleKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); closeRef.current?.(); return; }
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) { event.preventDefault(); dialog.focus(); return; }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    dialog.addEventListener('keydown', handleKey);
    return () => {
      cancelAnimationFrame(frame);
      dialog.removeEventListener('keydown', handleKey);
      openerRef.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="exds-drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose?.(); }}>
      <aside ref={dialogRef} className={['exds-drawer', className].filter(Boolean).join(' ')} role="dialog" aria-modal="true" aria-label={ariaLabel || title} tabIndex={-1}>
        {(title || eyebrow || description || onClose) && (
          <div className="exds-drawer__head">
            <div className="exds-drawer__heading">
              {eyebrow && <span className="exds-drawer__eyebrow">{eyebrow}</span>}
              {title && <h2 className="exds-drawer__title">{title}</h2>}
              {description && <p className="exds-drawer__description">{description}</p>}
            </div>
            {onClose && <button type="button" className="exds-drawer__close" aria-label="Close" onClick={onClose}>×</button>}
          </div>
        )}
        <div className="exds-drawer__body">{children}</div>
        {footer && <div className="exds-drawer__foot">{footer}</div>}
      </aside>
    </div>
  );
}
