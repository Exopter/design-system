import React from 'react';

/**
 * Exopter Input — labelled text/number field with optional prefix, unit suffix,
 * hint, and error state. Use `data` for right-aligned tabular numeric entry.
 */
/** @param {import("./Input").InputProps} props */
export function Input({
  label,
  required = false,
  prefix = null,
  suffix = null,
  hint = '',
  error = '',
  data = false,
  id,
  className = '',
  'aria-describedby': ariaDescribedBy,
  ...rest
}) {
  const generatedId = React.useId().replaceAll(':', '');
  const fieldId = id || `exds-input-${generatedId}`;
  const messageId = (error || hint) ? `${fieldId}-message` : undefined;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(' ') || undefined;
  return (
    <div className={['exds-field', className].filter(Boolean).join(' ')}>
      {label && (
        <label className="exds-field__label" htmlFor={fieldId}>
          {label}{required && <span className="exds-field__req" aria-hidden="true">*</span>}
        </label>
      )}
      <div className={['exds-input-wrap', error ? 'exds-input-wrap--error' : ''].filter(Boolean).join(' ')}
           data-disabled={rest.disabled ? 'true' : 'false'}>
        {prefix && <span className="exds-input__affix">{prefix}</span>}
        <input {...rest} id={fieldId} required={required}
               className={['exds-input', data ? 'exds-input--data' : ''].filter(Boolean).join(' ')}
               aria-invalid={error ? 'true' : rest['aria-invalid']} aria-describedby={describedBy}
               aria-errormessage={error ? messageId : rest['aria-errormessage']} />
        {suffix && <span className="exds-input__affix">{suffix}</span>}
      </div>
      {error
        ? <span id={messageId} className="exds-field__hint exds-field__hint--error">{error}</span>
        : hint && <span id={messageId} className="exds-field__hint">{hint}</span>}
    </div>
  );
}
