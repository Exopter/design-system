import React from 'react';

const CSS = `
.exds-success-state{flex:1;display:grid;place-items:center;min-height:260px;padding:32px;text-align:center}
.exds-success-state__inner{max-width:330px}.exds-success-state__icon{width:48px;height:48px;margin:0 auto 14px;border-radius:50%;display:grid;place-items:center;background:var(--ex-state-ready-bg);color:var(--ex-field-500)}
.exds-success-state__icon svg{width:24px;height:24px}.exds-success-state__title{margin:0 0 7px;color:var(--text-strong)}.exds-success-state__description{margin:0 0 18px;color:var(--text-muted);line-height:1.5}
`;
if (typeof document !== 'undefined' && !document.getElementById('exds-success-state-css')) {
  const style = document.createElement('style'); style.id = 'exds-success-state-css'; style.textContent = CSS;
  document.head.appendChild(style);
}

const CheckIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m5 12 4 4L19 6" /></svg>;

/** Confirmation state for successful drawer and dialog workflows. */
export function SuccessState({ title, description, action = null, icon = <CheckIcon /> }) {
  return <div className="exds-success-state"><div className="exds-success-state__inner"><span className="exds-success-state__icon">{icon}</span><h2 className="exds-success-state__title">{title}</h2>{description && <p className="exds-success-state__description">{description}</p>}{action}</div></div>;
}
