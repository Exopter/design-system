import React from 'react';

/**
 * Exopter IconButton — compact single-icon control.
 * variant: ghost | outline | solid | danger ; size: sm | md | lg ; round for physical controls.
 */
/** @param {import("./IconButton").IconButtonProps} props */
export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  round = false,
  label,
  className = '',
  ...rest
}) {
  if (typeof label !== 'string' || !label.trim()) {
    throw new Error('IconButton requires a non-empty `label` for its accessible name.');
  }
  const accessibleLabel = label.trim();
  const cls = [
    'exds-iconbtn',
    `exds-iconbtn--${variant}`,
    size !== 'md' ? `exds-iconbtn--${size}` : '',
    round ? 'exds-iconbtn--round' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} {...rest} aria-label={accessibleLabel} title={accessibleLabel}>
      {icon}
    </button>
  );
}
