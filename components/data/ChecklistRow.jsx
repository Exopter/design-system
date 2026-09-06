import React from 'react';

const Tick = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>);
const Link = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>);

/**
 * Exopter ChecklistRow — flight-prep / maintenance / test / acceptance item.
 * state: done | active | pending | blocked. Shows owner, blocker, and evidence link.
 */
/** @param {import("./ChecklistRow").ChecklistRowProps} props */
export function ChecklistRow({ title, state = 'pending', owner, blocker, evidence, evidenceLabel = 'Evidence', className = '', ...rest }) {
  return (
    <div className={['exds-check', `exds-check--${state}`, className].filter(Boolean).join(' ')} {...rest}>
      <span className="exds-check__box">{state === 'done' && <Tick/>}</span>
      <div className="exds-check__body">
        <span className="exds-check__title">{title}</span>
        {blocker
          ? <span className="exds-check__meta exds-check__blocker">{blocker}</span>
          : state === 'active' && <span className="exds-check__meta">In progress</span>}
      </div>
      <div className="exds-check__right">
        {owner && <span className="exds-check__owner">{owner}</span>}
        {evidence && <a className="exds-check__evi" href={evidence}><Link/>{evidenceLabel}</a>}
      </div>
    </div>
  );
}
