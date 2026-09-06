// components/data/Card.jsx
import React from "react";
function Card({
  eyebrow,
  title,
  actions,
  surface = "light",
  elevation = "sm",
  flush = false,
  children,
  className = "",
  ...rest
}) {
  const cls = [
    "exds-card",
    elevation === "flat" ? "exds-card--flat" : "",
    elevation === "raised" ? "exds-card--raised" : "",
    surface === "carbon" ? "ex-dark" : "",
    className
  ].filter(Boolean).join(" ");
  const hasHead = eyebrow || title || actions;
  return /* @__PURE__ */ React.createElement("section", { className: cls, ...rest }, hasHead && /* @__PURE__ */ React.createElement("header", { className: "exds-card__head" }, /* @__PURE__ */ React.createElement("div", { className: "exds-card__titles" }, eyebrow && /* @__PURE__ */ React.createElement("span", { className: "exds-card__eyebrow" }, eyebrow), title && /* @__PURE__ */ React.createElement("h3", { className: "exds-card__title" }, title)), actions && /* @__PURE__ */ React.createElement("div", { className: "exds-card__actions" }, actions)), /* @__PURE__ */ React.createElement("div", { className: ["exds-card__body", flush ? "exds-card__body--flush" : ""].filter(Boolean).join(" ") }, children));
}

// components/data/ChecklistRow.jsx
import React2 from "react";
var Tick = () => /* @__PURE__ */ React2.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React2.createElement("path", { d: "M20 6 9 17l-5-5" }));
var Link = () => /* @__PURE__ */ React2.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React2.createElement("path", { d: "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" }), /* @__PURE__ */ React2.createElement("path", { d: "M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" }));
function ChecklistRow({ title, state = "pending", owner, blocker, evidence, evidenceLabel = "Evidence", className = "", ...rest }) {
  return /* @__PURE__ */ React2.createElement("div", { className: ["exds-check", `exds-check--${state}`, className].filter(Boolean).join(" "), ...rest }, /* @__PURE__ */ React2.createElement("span", { className: "exds-check__box" }, state === "done" && /* @__PURE__ */ React2.createElement(Tick, null)), /* @__PURE__ */ React2.createElement("div", { className: "exds-check__body" }, /* @__PURE__ */ React2.createElement("span", { className: "exds-check__title" }, title), blocker ? /* @__PURE__ */ React2.createElement("span", { className: "exds-check__meta exds-check__blocker" }, blocker) : state === "active" && /* @__PURE__ */ React2.createElement("span", { className: "exds-check__meta" }, "In progress")), /* @__PURE__ */ React2.createElement("div", { className: "exds-check__right" }, owner && /* @__PURE__ */ React2.createElement("span", { className: "exds-check__owner" }, owner), evidence && /* @__PURE__ */ React2.createElement("a", { className: "exds-check__evi", href: evidence }, /* @__PURE__ */ React2.createElement(Link, null), evidenceLabel)));
}

// components/data/MetricTile.jsx
import React3 from "react";
function MetricTile({
  label,
  icon = null,
  value,
  unit,
  delta,
  trend = "flat",
  state = "default",
  sunken = false,
  className = ""
}) {
  const arrow = trend === "up" ? "▲" : trend === "down" ? "▼" : "–";
  return /* @__PURE__ */ React3.createElement("div", { className: ["exds-metric", state !== "default" ? `exds-metric--${state}` : "", sunken ? "exds-metric--sunken" : "", className].filter(Boolean).join(" ") }, /* @__PURE__ */ React3.createElement("span", { className: "exds-metric__label" }, icon, label), /* @__PURE__ */ React3.createElement("span", { className: "exds-metric__value" }, value, unit && /* @__PURE__ */ React3.createElement("span", { className: "exds-metric__unit" }, unit)), delta != null && /* @__PURE__ */ React3.createElement("span", { className: `exds-metric__delta exds-metric__delta--${trend}` }, arrow, " ", delta));
}

// components/data/ReadinessStrip.jsx
import React4 from "react";
function ReadinessStrip({ mode, items = [], className = "", ...rest }) {
  return /* @__PURE__ */ React4.createElement("div", { className: ["exds-strip", className].filter(Boolean).join(" "), ...rest }, mode && /* @__PURE__ */ React4.createElement("div", { className: "exds-strip__mode" }, mode), items.map((it, i) => /* @__PURE__ */ React4.createElement("div", { key: i, className: `exds-strip__item is-${it.state || "unknown"}` }, /* @__PURE__ */ React4.createElement("span", { className: "exds-strip__k" }, it.label), /* @__PURE__ */ React4.createElement("span", { className: "exds-strip__v" }, /* @__PURE__ */ React4.createElement("span", { className: ["exds-strip__dot", it.state === "pending" ? "exds-strip__dot--hollow" : ""].filter(Boolean).join(" ") }), /* @__PURE__ */ React4.createElement("span", { className: "exds-strip__vlabel" }, it.value)))));
}

// components/feedback/Badge.jsx
import React5 from "react";
function Badge({ tone = "neutral", icon = null, children, className = "" }) {
  return /* @__PURE__ */ React5.createElement("span", { className: ["exds-badge", `exds-badge--${tone}`, className].filter(Boolean).join(" ") }, icon, children);
}

// components/feedback/StatusDot.jsx
import React6 from "react";
function StatusDot({ state = "unknown", label, pulse = false, className = "" }) {
  const hollow = state === "pending";
  const text = label ?? state.toUpperCase();
  return /* @__PURE__ */ React6.createElement("span", { className: ["exds-statusdot", `exds-statusdot--${state}`, pulse ? "exds-statusdot--pulse" : "", className].filter(Boolean).join(" ") }, /* @__PURE__ */ React6.createElement("span", { className: ["exds-statusdot__dot", hollow ? "exds-statusdot__dot--hollow" : ""].filter(Boolean).join(" ") }), /* @__PURE__ */ React6.createElement("span", { className: "exds-statusdot__label" }, text));
}

// components/feedback/SuccessState.jsx
import React7 from "react";
var CheckIcon = () => /* @__PURE__ */ React7.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" }, /* @__PURE__ */ React7.createElement("path", { d: "m5 12 4 4L19 6" }));
function SuccessState({ title, description, action = null, icon = /* @__PURE__ */ React7.createElement(CheckIcon, null) }) {
  return /* @__PURE__ */ React7.createElement("div", { className: "exds-success-state" }, /* @__PURE__ */ React7.createElement("div", { className: "exds-success-state__inner" }, /* @__PURE__ */ React7.createElement("span", { className: "exds-success-state__icon" }, icon), /* @__PURE__ */ React7.createElement("h2", { className: "exds-success-state__title" }, title), description && /* @__PURE__ */ React7.createElement("p", { className: "exds-success-state__description" }, description), action));
}

// components/feedback/Toast.jsx
import React8 from "react";
var X = () => /* @__PURE__ */ React8.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ React8.createElement("path", { d: "M18 6 6 18M6 6l12 12" }));
function Toast({ tone = "info", icon = null, title, children, onClose, className = "" }) {
  return /* @__PURE__ */ React8.createElement("div", { role: "status", className: ["exds-toast", `exds-toast--${tone}`, className].filter(Boolean).join(" ") }, icon && /* @__PURE__ */ React8.createElement("span", { className: "exds-toast__icon" }, icon), /* @__PURE__ */ React8.createElement("div", { className: "exds-toast__body" }, title && /* @__PURE__ */ React8.createElement("div", { className: "exds-toast__title" }, title), children && /* @__PURE__ */ React8.createElement("div", { className: "exds-toast__msg" }, children)), onClose && /* @__PURE__ */ React8.createElement("button", { type: "button", className: "exds-toast__close", "aria-label": "Dismiss", onClick: onClose }, /* @__PURE__ */ React8.createElement(X, null)));
}

// components/forms/Button.jsx
import React9 from "react";
function Button({
  variant = "primary",
  size = "md",
  block = false,
  iconLeft = null,
  iconRight = null,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  const cls = [
    "exds-btn",
    `exds-btn--${variant}`,
    size !== "md" ? `exds-btn--${size}` : "",
    block ? "exds-btn--block" : "",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ React9.createElement("button", { type, className: cls, ...rest }, iconLeft, children != null && /* @__PURE__ */ React9.createElement("span", null, children), iconRight);
}

// components/forms/IconButton.jsx
import React10 from "react";
function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  round = false,
  label,
  className = "",
  ...rest
}) {
  if (typeof label !== "string" || !label.trim()) {
    throw new Error("IconButton requires a non-empty `label` for its accessible name.");
  }
  const accessibleLabel = label.trim();
  const cls = [
    "exds-iconbtn",
    `exds-iconbtn--${variant}`,
    size !== "md" ? `exds-iconbtn--${size}` : "",
    round ? "exds-iconbtn--round" : "",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ React10.createElement("button", { type: "button", className: cls, ...rest, "aria-label": accessibleLabel, title: accessibleLabel }, icon);
}

// components/forms/Input.jsx
import React11 from "react";
function Input({
  label,
  required = false,
  prefix = null,
  suffix = null,
  hint = "",
  error = "",
  data = false,
  id,
  className = "",
  "aria-describedby": ariaDescribedBy,
  ...rest
}) {
  const generatedId = React11.useId().replaceAll(":", "");
  const fieldId = id || `exds-input-${generatedId}`;
  const messageId = error || hint ? `${fieldId}-message` : void 0;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ React11.createElement("div", { className: ["exds-field", className].filter(Boolean).join(" ") }, label && /* @__PURE__ */ React11.createElement("label", { className: "exds-field__label", htmlFor: fieldId }, label, required && /* @__PURE__ */ React11.createElement("span", { className: "exds-field__req", "aria-hidden": "true" }, "*")), /* @__PURE__ */ React11.createElement(
    "div",
    {
      className: ["exds-input-wrap", error ? "exds-input-wrap--error" : ""].filter(Boolean).join(" "),
      "data-disabled": rest.disabled ? "true" : "false"
    },
    prefix && /* @__PURE__ */ React11.createElement("span", { className: "exds-input__affix" }, prefix),
    /* @__PURE__ */ React11.createElement(
      "input",
      {
        ...rest,
        id: fieldId,
        required,
        className: ["exds-input", data ? "exds-input--data" : ""].filter(Boolean).join(" "),
        "aria-invalid": error ? "true" : rest["aria-invalid"],
        "aria-describedby": describedBy,
        "aria-errormessage": error ? messageId : rest["aria-errormessage"]
      }
    ),
    suffix && /* @__PURE__ */ React11.createElement("span", { className: "exds-input__affix" }, suffix)
  ), error ? /* @__PURE__ */ React11.createElement("span", { id: messageId, className: "exds-field__hint exds-field__hint--error" }, error) : hint && /* @__PURE__ */ React11.createElement("span", { id: messageId, className: "exds-field__hint" }, hint));
}

// components/forms/SegmentedControl.jsx
import React12 from "react";
function SegmentedControl({ options = [], value, defaultValue, onChange, size = "md", ariaLabel = "Mode", className = "" }) {
  const isControlled = value !== void 0;
  const initialValue = options.find((option) => option.value === defaultValue && !option.disabled)?.value ?? options.find((option) => !option.disabled)?.value;
  const [internal, setInternal] = React12.useState(initialValue);
  const current = isControlled ? value : internal;
  const selectedIndex = options.findIndex((option) => option.value === current && !option.disabled);
  const tabbableIndex = selectedIndex >= 0 ? selectedIndex : options.findIndex((option) => !option.disabled);
  const buttonRefs = React12.useRef(
    /** @type {Array<HTMLButtonElement | null>} */
    []
  );
  const pick = (v) => {
    if (!isControlled) setInternal(v);
    if (onChange) onChange(v);
  };
  const move = (fromIndex, direction) => {
    if (!options.length) return;
    let nextIndex = fromIndex;
    for (let attempts = 0; attempts < options.length; attempts += 1) {
      nextIndex = (nextIndex + direction + options.length) % options.length;
      if (!options[nextIndex].disabled) {
        pick(options[nextIndex].value);
        buttonRefs.current[nextIndex]?.focus();
        return;
      }
    }
  };
  const onKeyDown = (event, index) => {
    if (["ArrowRight", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      move(index, 1);
    } else if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      move(index, -1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const enabled = options.map((option, optionIndex) => ({ option, optionIndex })).filter(({ option }) => !option.disabled);
      const target = event.key === "Home" ? enabled[0] : enabled.at(-1);
      if (target) {
        pick(target.option.value);
        buttonRefs.current[target.optionIndex]?.focus();
      }
    }
  };
  return /* @__PURE__ */ React12.createElement(
    "div",
    {
      className: ["exds-seg", size === "lg" ? "exds-seg--lg" : "", className].filter(Boolean).join(" "),
      role: "radiogroup",
      "aria-label": ariaLabel
    },
    options.map((o, index) => /* @__PURE__ */ React12.createElement(
      "button",
      {
        key: o.value,
        ref: (element) => {
          buttonRefs.current[index] = element;
        },
        type: "button",
        role: "radio",
        "aria-checked": index === selectedIndex,
        tabIndex: index === tabbableIndex ? 0 : -1,
        className: "exds-seg__btn",
        "data-active": index === selectedIndex ? "true" : "false",
        disabled: o.disabled,
        onKeyDown: (event) => onKeyDown(event, index),
        onClick: () => pick(o.value)
      },
      o.icon,
      o.label
    ))
  );
}

// components/forms/Select.jsx
import React13 from "react";
var Chevron = () => /* @__PURE__ */ React13.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React13.createElement("polyline", { points: "6 9 12 15 18 9" }));
function Select({ label, options, id, className = "", children, ...rest }) {
  const generatedId = React13.useId().replaceAll(":", "");
  const sid = id || `exds-select-${generatedId}`;
  return /* @__PURE__ */ React13.createElement("div", { className: ["exds-select-field", className].filter(Boolean).join(" ") }, label && /* @__PURE__ */ React13.createElement("label", { className: "exds-select-field__label", htmlFor: sid }, label), /* @__PURE__ */ React13.createElement("div", { className: "exds-select-wrap" }, /* @__PURE__ */ React13.createElement("select", { id: sid, className: "exds-select", ...rest }, options ? options.map((o) => /* @__PURE__ */ React13.createElement("option", { key: o.value, value: o.value, disabled: o.disabled }, o.label)) : children), /* @__PURE__ */ React13.createElement("span", { className: "exds-select-wrap__chev" }, /* @__PURE__ */ React13.createElement(Chevron, null))));
}

// components/forms/Switch.jsx
import React14 from "react";
function Switch({ checked, defaultChecked, onChange, disabled = false, label, id, className = "", ...rest }) {
  const isControlled = checked !== void 0;
  const [internal, setInternal] = React14.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;
  const handle = (e) => {
    if (!isControlled) setInternal(e.target.checked);
    if (onChange) onChange(e);
  };
  const generatedId = React14.useId().replaceAll(":", "");
  const sid = id || `exds-switch-${generatedId}`;
  return /* @__PURE__ */ React14.createElement("label", { className: ["exds-switch", className].filter(Boolean).join(" "), "data-disabled": disabled ? "true" : "false", htmlFor: sid }, /* @__PURE__ */ React14.createElement("input", { id: sid, type: "checkbox", role: "switch", checked: on, disabled, onChange: handle, ...rest }), /* @__PURE__ */ React14.createElement("span", { className: "exds-switch__track", "data-on": on ? "true" : "false" }, /* @__PURE__ */ React14.createElement("span", { className: "exds-switch__thumb" })), label && /* @__PURE__ */ React14.createElement("span", { className: "exds-switch__label" }, label));
}

// components/forms/Textarea.jsx
import React15 from "react";
function Textarea({ label, required = false, hint = "", error = "", id, className = "", "aria-describedby": ariaDescribedBy, ...rest }) {
  const generatedId = React15.useId().replaceAll(":", "");
  const fieldId = id || `exds-textarea-${generatedId}`;
  const messageId = error || hint ? `${fieldId}-message` : void 0;
  const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || void 0;
  return /* @__PURE__ */ React15.createElement("div", { className: ["exds-textarea-field", className].filter(Boolean).join(" ") }, label && /* @__PURE__ */ React15.createElement("label", { className: "exds-textarea-field__label", htmlFor: fieldId }, label, required && /* @__PURE__ */ React15.createElement("span", { className: "exds-textarea-field__req", "aria-hidden": "true" }, "*")), /* @__PURE__ */ React15.createElement("textarea", { ...rest, id: fieldId, required, className: "exds-textarea", "aria-invalid": error ? "true" : rest["aria-invalid"], "aria-describedby": describedBy, "aria-errormessage": error ? messageId : rest["aria-errormessage"] }), error ? /* @__PURE__ */ React15.createElement("span", { id: messageId, className: "exds-textarea-field__hint exds-textarea-field__hint--error" }, error) : hint && /* @__PURE__ */ React15.createElement("span", { id: messageId, className: "exds-textarea-field__hint" }, hint));
}

// components/overlays/Drawer.jsx
import React16 from "react";
var FOCUSABLE = 'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';
function Drawer({ open = true, title, eyebrow = "", description = "", onClose, children, footer = null, ariaLabel, className = "" }) {
  const dialogRef = React16.useRef(
    /** @type {HTMLElement | null} */
    null
  );
  const openerRef = React16.useRef(
    /** @type {HTMLElement | null} */
    null
  );
  const titleId = React16.useId();
  const closeRef = React16.useRef(onClose);
  closeRef.current = onClose;
  React16.useEffect(() => {
    if (!open) return void 0;
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    if (!dialog) return void 0;
    const focusable = () => [...dialog.querySelectorAll(FOCUSABLE)].filter((element) => element instanceof HTMLElement);
    const frame = requestAnimationFrame(() => (focusable()[0] || dialog).focus());
    const handleKey = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeRef.current?.();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) {
        event.preventDefault();
        dialog.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    dialog.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(frame);
      dialog.removeEventListener("keydown", handleKey);
      openerRef.current?.focus?.();
    };
  }, [open]);
  if (!open) return null;
  return /* @__PURE__ */ React16.createElement("div", { className: "exds-drawer-backdrop", onMouseDown: (event) => {
    if (event.target === event.currentTarget) onClose?.();
  } }, /* @__PURE__ */ React16.createElement("aside", { ref: dialogRef, className: ["exds-drawer", className].filter(Boolean).join(" "), role: "dialog", "aria-modal": "true", "aria-label": ariaLabel || (title ? void 0 : "Dialog"), "aria-labelledby": !ariaLabel && title ? titleId : void 0, tabIndex: -1 }, (title || eyebrow || description || onClose) && /* @__PURE__ */ React16.createElement("div", { className: "exds-drawer__head" }, /* @__PURE__ */ React16.createElement("div", { className: "exds-drawer__heading" }, eyebrow && /* @__PURE__ */ React16.createElement("span", { className: "exds-drawer__eyebrow" }, eyebrow), title && /* @__PURE__ */ React16.createElement("h2", { id: titleId, className: "exds-drawer__title" }, title), description && /* @__PURE__ */ React16.createElement("p", { className: "exds-drawer__description" }, description)), onClose && /* @__PURE__ */ React16.createElement("button", { type: "button", className: "exds-drawer__close", "aria-label": "Close", onClick: onClose }, "×")), /* @__PURE__ */ React16.createElement("div", { className: "exds-drawer__body" }, children), footer && /* @__PURE__ */ React16.createElement("div", { className: "exds-drawer__foot" }, footer)));
}
export {
  Badge,
  Button,
  Card,
  ChecklistRow,
  Drawer,
  IconButton,
  Input,
  MetricTile,
  ReadinessStrip,
  SegmentedControl,
  Select,
  StatusDot,
  SuccessState,
  Switch,
  Textarea,
  Toast
};
