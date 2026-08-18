import * as React from 'react';

export interface DrawerProps {
  open?: boolean;
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  description?: React.ReactNode;
  onClose?: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

/** Right-side modal drawer with focus trapping, Escape handling, and focus restoration. */
export function Drawer(props: DrawerProps): React.JSX.Element | null;
