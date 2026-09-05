import React from 'react';

const CheckIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>;

/** Confirmation state for successful drawer and dialog workflows. */
export function SuccessState({ title, description, action = null, icon = <CheckIcon /> }) {
  return <div className="exds-success-state"><div className="exds-success-state__inner"><span className="exds-success-state__icon">{icon}</span><h2 className="exds-success-state__title">{title}</h2>{description && <p className="exds-success-state__description">{description}</p>}{action}</div></div>;
}
