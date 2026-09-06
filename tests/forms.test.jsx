import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Drawer, IconButton, Input, SegmentedControl, Select, SuccessState, Switch, Textarea } from '../index.js';

describe('Input', () => {
  it('forwards required and connects help and error messages', () => {
    const { rerender } = render(
      <Input label="Flight ID" required hint="Assigned by Operations" aria-describedby="external-help" />,
    );
    const input = screen.getByRole('textbox', { name: 'Flight ID' });
    expect(input).toBeRequired();
    expect(input).toHaveAccessibleDescription('Assigned by Operations');
    expect(input.getAttribute('aria-describedby')).toContain('external-help');

    rerender(<Input label="Flight ID" error="Flight ID is invalid" />);
    expect(screen.getByRole('textbox', { name: 'Flight ID' })).toHaveAccessibleErrorMessage('Flight ID is invalid');
  });

  it('generates unique IDs for repeated labels', () => {
    render(<><Input label="Serial" /><Input label="Serial" /></>);
    const inputs = screen.getAllByRole('textbox', { name: 'Serial' });
    expect(inputs[0].id).not.toBe(inputs[1].id);
  });
});

describe('Textarea', () => {
  it('forwards required and connects help and error messages', () => {
    const { rerender } = render(<Textarea label="Notes" required hint="Stored with the test run" />);
    const textarea = screen.getByRole('textbox', { name: 'Notes' });
    expect(textarea).toBeRequired();
    expect(textarea).toHaveAccessibleDescription('Stored with the test run');

    rerender(<Textarea label="Notes" error="Notes are required" />);
    expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAccessibleErrorMessage('Notes are required');
  });
});

describe('Drawer', () => {
  it('uses rendered title content as its name and supports an explicit override', () => {
    const { rerender } = render(<Drawer title={<span>Create <strong>flight</strong></span>} />);
    expect(screen.getByRole('dialog', { name: 'Create flight' })).toBeInTheDocument();
    rerender(<Drawer title={<span>Create flight</span>} ariaLabel="Flight editor" />);
    expect(screen.getByRole('dialog', { name: 'Flight editor' })).toBeInTheDocument();
  });

  it('provides dialog semantics and closes with Escape', () => {
    const onClose = vi.fn();
    render(<Drawer title="Create flight" onClose={onClose}><Input label="Flight ID" /></Drawer>);
    const dialog = screen.getByRole('dialog', { name: 'Create flight' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not close when interacting inside the drawer', () => {
    const onClose = vi.fn();
    render(<Drawer title="Create flight" onClose={onClose}><button type="button">Save</button></Drawer>);
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Save' }));
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe('SuccessState', () => {
  it('renders confirmation copy and action', () => {
    render(<SuccessState title="Flight created" description="Ready for acquisition" action={<button type="button">Done</button>} />);
    expect(screen.getByRole('heading', { name: 'Flight created' })).toBeInTheDocument();
    expect(screen.getByText('Ready for acquisition')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Done' })).toBeInTheDocument();
  });
});

describe('IconButton', () => {
  it('requires a non-empty accessible label', () => {
    expect(() => IconButton({ icon: <span /> })).toThrow(/requires a non-empty `label`/);
  });

  it('guarantees its label as the accessible name and title', () => {
    render(
      <IconButton
        icon={<span aria-hidden="true" />}
        label=" Replay flight "
        aria-label="Unsafe override"
        title="Unsafe override"
      />,
    );
    const button = screen.getByRole('button', { name: 'Replay flight' });
    expect(button).toHaveAttribute('aria-label', 'Replay flight');
    expect(button).toHaveAttribute('title', 'Replay flight');
  });
});

describe('SegmentedControl', () => {
  const options = [
    { value: 'live', label: 'Live' },
    { value: 'analysis', label: 'Analysis', disabled: true },
    { value: 'replay', label: 'Replay' },
  ];

  it('uses radiogroup semantics and supports arrow navigation', () => {
    const onChange = vi.fn();
    render(<SegmentedControl ariaLabel="Flight view" defaultValue="live" options={options} onChange={onChange} />);
    const live = screen.getByRole('radio', { name: 'Live' });
    const replay = screen.getByRole('radio', { name: 'Replay' });
    expect(screen.getByRole('radiogroup', { name: 'Flight view' })).toBeInTheDocument();
    expect(live).toBeChecked();

    live.focus();
    fireEvent.keyDown(live, { key: 'ArrowRight' });
    expect(replay).toBeChecked();
    expect(replay).toHaveFocus();
    expect(onChange).toHaveBeenLastCalledWith('replay');
  });

  it('keeps the first enabled option tabbable for an invalid or disabled selection', () => {
    const { rerender } = render(<SegmentedControl options={options} value="missing" />);
    const live = screen.getByRole('radio', { name: 'Live' });
    const analysis = screen.getByRole('radio', { name: 'Analysis' });
    expect(live).toHaveAttribute('tabindex', '0');
    expect(analysis).toHaveAttribute('tabindex', '-1');
    for (const radio of screen.getAllByRole('radio')) expect(radio).not.toBeChecked();

    rerender(<SegmentedControl options={options} value="analysis" />);
    expect(live).toHaveAttribute('tabindex', '0');
    expect(analysis).not.toBeChecked();
  });
});

describe('generated control IDs', () => {
  it('keeps repeated Select and Switch labels unique', () => {
    render(
      <>
        <Select label="Aircraft" options={[{ value: 'exo', label: 'EXO' }]} />
        <Select label="Aircraft" options={[{ value: 'exo', label: 'EXO' }]} />
        <Switch label="Record" />
        <Switch label="Record" />
      </>,
    );
    const selects = screen.getAllByRole('combobox', { name: 'Aircraft' });
    const switches = screen.getAllByRole('switch', { name: 'Record' });
    expect(selects[0].id).not.toBe(selects[1].id);
    expect(switches[0].id).not.toBe(switches[1].id);
  });
});
