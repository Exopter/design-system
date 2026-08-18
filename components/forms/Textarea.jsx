import React from 'react';

const CSS = `
.exds-textarea-field{display:flex;flex-direction:column;gap:6px;font-family:var(--font-ui)}
.exds-textarea-field__label{font-family:var(--font-mono);font-size:var(--fs-xs);font-weight:500;letter-spacing:var(--ls-label);text-transform:uppercase;color:var(--text-muted)}
.exds-textarea-field__req{color:var(--ex-red-600);margin-left:4px}.exds-textarea{width:100%;min-height:88px;box-sizing:border-box;resize:vertical;border:1px solid var(--border-rule);border-radius:var(--radius);background:var(--surface-card);padding:10px 12px;outline:none;font:500 var(--fs-body)/1.45 var(--font-ui);color:var(--text-body)}
.exds-textarea:focus-visible{border-color:var(--focus-ring);box-shadow:0 0 0 1px var(--focus-ring)}.exds-textarea[aria-invalid="true"]{border-color:var(--ex-red-600)}
.exds-textarea-field__hint{font-size:var(--fs-xs);color:var(--text-muted)}.exds-textarea-field__hint--error{color:var(--ex-red-600);font-family:var(--font-mono)}
`;
if (typeof document !== 'undefined' && !document.getElementById('exds-textarea-css')) {
  const style = document.createElement('style'); style.id = 'exds-textarea-css'; style.textContent = CSS;
  document.head.appendChild(style);
}

/** Labelled multiline field with shared hint and error semantics. */
export function Textarea({ label, required = false, hint = '', error = '', id, className = '', 'aria-describedby': ariaDescribedBy, ...rest }) {
  const generatedId = React.useId().replaceAll(':', '');
  const fieldId = id || `exds-textarea-${generatedId}`;
  const messageId = (error || hint) ? `${fieldId}-message` : undefined;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(' ') || undefined;
  return (
    <div className={['exds-textarea-field', className].filter(Boolean).join(' ')}>
      {label && <label className="exds-textarea-field__label" htmlFor={fieldId}>{label}{required && <span className="exds-textarea-field__req" aria-hidden="true">*</span>}</label>}
      <textarea {...rest} id={fieldId} required={required} className="exds-textarea" aria-invalid={error ? 'true' : rest['aria-invalid']} aria-describedby={describedBy} aria-errormessage={error ? messageId : rest['aria-errormessage']} />
      {error
        ? <span id={messageId} className="exds-textarea-field__hint exds-textarea-field__hint--error">{error}</span>
        : hint && <span id={messageId} className="exds-textarea-field__hint">{hint}</span>}
    </div>
  );
}
