import React from 'react';

/** Labelled multiline field with shared hint and error semantics. */
/** @param {import("./Textarea").TextareaProps} props */
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
