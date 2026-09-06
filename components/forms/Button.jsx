import React from 'react';

/**
 * Exopter Button — primary operational control.
 * variant: primary | secondary | ghost | danger
 * size: sm | md | lg
 */
/** @param {import("./Button").ButtonProps} props */
export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  iconLeft = null,
  iconRight = null,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const cls = [
    'exds-btn',
    `exds-btn--${variant}`,
    size !== 'md' ? `exds-btn--${size}` : '',
    block ? 'exds-btn--block' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button type={type} className={cls} {...rest}>
      {iconLeft}
      {children != null && <span>{children}</span>}
      {iconRight}
    </button>
  );
}
