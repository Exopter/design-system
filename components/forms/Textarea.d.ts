import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
}

/** Labelled multiline field with shared hint and error semantics. */
export function Textarea(props: TextareaProps): React.JSX.Element;
