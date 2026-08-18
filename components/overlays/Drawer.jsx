import React from 'react';

const CSS = `
.exds-drawer-backdrop{position:fixed;z-index:80;inset:0;background:rgba(7,11,13,.55);display:flex;justify-content:flex-end}
.exds-drawer{width:min(500px,calc(100vw - 36px));height:100%;background:var(--surface-card);color:var(--text-body);box-shadow:-18px 0 48px rgba(7,11,13,.28);display:flex;flex-direction:column}
.exds-drawer:focus{outline:none}.exds-drawer__head{display:flex;align-items:flex-start;gap:12px;padding:18px 20px;border-bottom:1px solid var(--border-rule)}
.exds-drawer__heading{flex:1;min-width:0}.exds-drawer__eyebrow{display:block;font:600 10px/1 var(--font-mono);letter-spacing:.09em;text-transform:uppercase;color:var(--text-muted)}
.exds-drawer__title{margin:4px 0;font-size:21px;color:var(--text-strong)}.exds-drawer__description{margin:4px 0 0;font-size:13px;line-height:1.45;color:var(--text-muted)}
.exds-drawer__close{width:34px;height:34px;flex:none;border:1px solid var(--border-rule);border-radius:6px;background:var(--surface-card);color:var(--text-muted);display:grid;place-items:center;cursor:pointer}
.exds-drawer__close:hover{background:var(--surface-hover);color:var(--text-strong)}.exds-drawer__close:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}
.exds-drawer__body{padding:18px 20px;overflow:auto;display:grid;gap:15px}.exds-drawer__foot{margin-top:auto;display:flex;justify-content:flex-end;gap:9px;padding:14px 20px;border-top:1px solid var(--border-rule)}
@media(max-width:640px){.exds-drawer{width:100vw}.exds-drawer__body{padding:16px}.exds-drawer__head,.exds-drawer__foot{padding:14px 16px}}
`;
if (typeof document !== 'undefined' && !document.getElementById('exds-drawer-css')) {
  const style = document.createElement('style'); style.id = 'exds-drawer-css'; style.textContent = CSS;
  document.head.appendChild(style);
}

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
