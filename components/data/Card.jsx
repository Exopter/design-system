import React from 'react';

/**
 * Exopter Card — framed container for repeated items and tools.
 * Never nest a Card inside a Card. Use `surface="carbon"` for instrument panels.
 * elevation: flat | sm | raised
 */
export function Card({
  eyebrow, title, actions, surface = 'light', elevation = 'sm', flush = false,
  children, className = '', ...rest
}) {
  const cls = [
    'exds-card',
    elevation === 'flat' ? 'exds-card--flat' : '',
    elevation === 'raised' ? 'exds-card--raised' : '',
    surface === 'carbon' ? 'ex-dark' : '',
    className,
  ].filter(Boolean).join(' ');
  const hasHead = eyebrow || title || actions;
  return (
    <section className={cls} {...rest}>
      {hasHead && (
        <header className="exds-card__head">
          <div className="exds-card__titles">
            {eyebrow && <span className="exds-card__eyebrow">{eyebrow}</span>}
            {title && <h3 className="exds-card__title">{title}</h3>}
          </div>
          {actions && <div className="exds-card__actions">{actions}</div>}
        </header>
      )}
      <div className={['exds-card__body', flush ? 'exds-card__body--flush' : ''].filter(Boolean).join(' ')}>
        {children}
      </div>
    </section>
  );
}
