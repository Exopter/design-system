import * as React from 'react';

export interface SuccessStateProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

/** Confirmation state for successful drawer and dialog workflows. */
export function SuccessState(props: SuccessStateProps): React.JSX.Element;
