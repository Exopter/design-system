import React from 'react';
import { Badge, Button, Card, ChecklistRow, Drawer, IconButton, Input, MetricTile, ReadinessStrip, SegmentedControl, Select, StatusDot, SuccessState, Switch, Textarea, Toast } from '@exopter/design-system';

const valid = <Card title="Flight"><Badge tone="ready">Ready</Badge><Button onClick={(event) => event.currentTarget.focus()}>Start</Button><ChecklistRow title="SD" state="done" /><Drawer title={<strong>Recorder</strong>} ariaLabel="Recorder" /><IconButton icon="+" label="Add" /><Input prefix={<span>+</span>} value="10" /><MetricTile label="Altitude" value={1200} /><ReadinessStrip items={[{label: 'FDR', value: 'Ready', state: 'ready'}]} /><SegmentedControl options={[{value: 'gps', label: 'GPS'}]} onChange={(value) => value.toUpperCase()} /><Select options={[{value: 'fdr', label: 'FDR'}]} /><StatusDot state="live" /><SuccessState title="Saved" /><Switch onChange={(event) => event.target.checked} /><Textarea rows={4} /><Toast onClose={() => {}}>Saved</Toast></Card>;
void valid;

// @ts-expect-error Accessible icon labels are required.
const missingLabel = <IconButton icon="+" />;
// @ts-expect-error Unsupported button variants are rejected.
const invalidVariant = <Button variant="primaryy" />;
// @ts-expect-error Native input values do not accept objects.
const invalidValue = <Input value={{value: 1}} />;
// @ts-expect-error Segmented callbacks receive the selected string, not a DOM event.
const invalidCallback = <SegmentedControl options={[]} onChange={(event: React.ChangeEvent<HTMLInputElement>) => event.target.value} />;
// @ts-expect-error Readiness states are a closed contract.
const invalidState = <ReadinessStrip items={[{label: 'FDR', value: 'Ready', state: 'green'}]} />;
void [missingLabel, invalidVariant, invalidValue, invalidCallback, invalidState];
