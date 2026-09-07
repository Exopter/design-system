import * as React from 'react';

export interface SelectionToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
}

/** Selection status and contextual actions for a table or list. */
export function SelectionToolbar(props: SelectionToolbarProps): React.JSX.Element;
