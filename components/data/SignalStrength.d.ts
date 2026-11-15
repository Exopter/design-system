import * as React from 'react';

export interface SignalStrengthProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  quality?: string;
  /** Zero means unavailable; the consumer owns measured quality thresholds. */
  level?: 0 | 1 | 2 | 3 | 4;
  value?: React.ReactNode;
}

export function SignalStrength(props: SignalStrengthProps): React.JSX.Element;
