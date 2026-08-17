/* @ds-bundle: {"format":4,"namespace":"ExopterDesignSystem_4c9fc9","components":[{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"ChecklistRow","sourcePath":"components/data/ChecklistRow.jsx"},{"name":"MetricTile","sourcePath":"components/data/MetricTile.jsx"},{"name":"ReadinessStrip","sourcePath":"components/data/ReadinessStrip.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"StatusDot","sourcePath":"components/feedback/StatusDot.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"}],"sourceHashes":{"components/data/Card.jsx":"21112a3b822e","components/data/ChecklistRow.jsx":"a65f225302a3","components/data/MetricTile.jsx":"16d8ec01dca3","components/data/ReadinessStrip.jsx":"a74b1a2d7c7a","components/feedback/Badge.jsx":"ed3d5fa3967f","components/feedback/StatusDot.jsx":"65531de7b02b","components/feedback/Toast.jsx":"c15cef79286f","components/forms/Button.jsx":"98a334076f79","components/forms/IconButton.jsx":"2e9573c836cf","components/forms/Input.jsx":"e1cb1267b6a6","components/forms/SegmentedControl.jsx":"bf501203fe11","components/forms/Select.jsx":"b13d4b1c8bb8","components/forms/Switch.jsx":"6bd93ac53e0e"},"inlinedExternals":[]} */
var ExopterDesignSystem_4c9fc9 = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // index.js
  var index_exports = {};
  __export(index_exports, {
    Badge: () => Badge,
    Button: () => Button,
    Card: () => Card,
    ChecklistRow: () => ChecklistRow,
    IconButton: () => IconButton,
    Input: () => Input,
    MetricTile: () => MetricTile,
    ReadinessStrip: () => ReadinessStrip,
    SegmentedControl: () => SegmentedControl,
    Select: () => Select,
    StatusDot: () => StatusDot,
    Switch: () => Switch,
    Toast: () => Toast
  });

  // react-global:react
  var React = window.React;
  var react_default = React;

  // components/data/Card.jsx
  var CSS = `
.exds-card{background:var(--surface-card);border:1px solid var(--border-rule);border-radius:var(--radius);
  box-shadow:var(--shadow-sm);color:var(--text-body);display:flex;flex-direction:column}
.exds-card--flat{box-shadow:none}
.exds-card--raised{box-shadow:var(--shadow-md)}
.exds-card__head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;
  padding:14px 16px;border-bottom:1px solid var(--border-rule)}
.exds-card__titles{display:flex;flex-direction:column;gap:2px;min-width:0}
.exds-card__eyebrow{font-family:var(--font-mono);font-size:var(--fs-xs);font-weight:500;letter-spacing:var(--ls-wide);text-transform:uppercase;color:var(--text-muted)}
.exds-card__title{font-size:var(--fs-h4);font-weight:600;color:var(--text-strong);line-height:1.2}
.exds-card__actions{display:flex;align-items:center;gap:8px;flex:none}
.exds-card__body{padding:16px}
.exds-card__body--flush{padding:0}
`;
  if (typeof document !== "undefined" && !document.getElementById("exds-card-css")) {
    const s = document.createElement("style");
    s.id = "exds-card-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }
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
    return /* @__PURE__ */ react_default.createElement("section", { className: cls, ...rest }, hasHead && /* @__PURE__ */ react_default.createElement("header", { className: "exds-card__head" }, /* @__PURE__ */ react_default.createElement("div", { className: "exds-card__titles" }, eyebrow && /* @__PURE__ */ react_default.createElement("span", { className: "exds-card__eyebrow" }, eyebrow), title && /* @__PURE__ */ react_default.createElement("h3", { className: "exds-card__title" }, title)), actions && /* @__PURE__ */ react_default.createElement("div", { className: "exds-card__actions" }, actions)), /* @__PURE__ */ react_default.createElement("div", { className: ["exds-card__body", flush ? "exds-card__body--flush" : ""].filter(Boolean).join(" ") }, children));
  }

  // components/data/ChecklistRow.jsx
  var CSS2 = `
.exds-check{display:flex;align-items:center;gap:12px;font-family:var(--font-ui);
  padding:11px 14px;background:var(--surface-card);border:1px solid var(--border-rule);border-radius:var(--radius)}
.exds-check + .exds-check{margin-top:-1px}
.exds-check__box{width:22px;height:22px;border-radius:var(--radius-compact);flex:none;
  display:flex;align-items:center;justify-content:center;border:2px solid var(--ex-graphite-400);color:transparent}
.exds-check__box svg{width:14px;height:14px}
.exds-check--done .exds-check__box{background:var(--ex-field-500);border-color:var(--ex-field-500);color:#fff}
.exds-check--active .exds-check__box{border-color:var(--ex-aqua-500);color:var(--ex-aqua-500)}
.exds-check--active .exds-check__box::after{content:"";width:8px;height:8px;border-radius:var(--radius-round);background:var(--ex-aqua-500)}
.exds-check--blocked .exds-check__box{border-color:var(--ex-red-600);color:var(--ex-red-600)}
.exds-check__body{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}
.exds-check__title{font-size:var(--fs-body);color:var(--text-strong)}
.exds-check--done .exds-check__title{color:var(--text-muted)}
.exds-check__meta{font-family:var(--font-mono);font-size:var(--fs-xs);color:var(--text-muted)}
.exds-check__blocker{color:var(--ex-red-600)}
.exds-check__right{display:flex;align-items:center;gap:12px;flex:none}
.exds-check__owner{font-family:var(--font-mono);font-size:var(--fs-xs);color:var(--text-muted)}
.exds-check__evi{display:inline-flex;align-items:center;gap:5px;font-family:var(--font-mono);font-size:var(--fs-xs);font-weight:600;
  letter-spacing:var(--ls-label);text-transform:uppercase;color:var(--ex-sky-500);text-decoration:none}
.exds-check__evi:hover{text-decoration:underline}
.exds-check__evi svg{width:13px;height:13px}
`;
  if (typeof document !== "undefined" && !document.getElementById("exds-check-css")) {
    const s = document.createElement("style");
    s.id = "exds-check-css";
    s.textContent = CSS2;
    document.head.appendChild(s);
  }
  var Tick = () => /* @__PURE__ */ react_default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ react_default.createElement("path", { d: "M20 6 9 17l-5-5" }));
  var Link = () => /* @__PURE__ */ react_default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ react_default.createElement("path", { d: "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" }), /* @__PURE__ */ react_default.createElement("path", { d: "M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" }));
  function ChecklistRow({ title, state = "pending", owner, blocker, evidence, evidenceLabel = "Evidence", className = "", ...rest }) {
    return /* @__PURE__ */ react_default.createElement("div", { className: ["exds-check", `exds-check--${state}`, className].filter(Boolean).join(" "), ...rest }, /* @__PURE__ */ react_default.createElement("span", { className: "exds-check__box" }, state === "done" && /* @__PURE__ */ react_default.createElement(Tick, null)), /* @__PURE__ */ react_default.createElement("div", { className: "exds-check__body" }, /* @__PURE__ */ react_default.createElement("span", { className: "exds-check__title" }, title), blocker ? /* @__PURE__ */ react_default.createElement("span", { className: "exds-check__meta exds-check__blocker" }, blocker) : state === "active" && /* @__PURE__ */ react_default.createElement("span", { className: "exds-check__meta" }, "In progress")), /* @__PURE__ */ react_default.createElement("div", { className: "exds-check__right" }, owner && /* @__PURE__ */ react_default.createElement("span", { className: "exds-check__owner" }, owner), evidence && /* @__PURE__ */ react_default.createElement("a", { className: "exds-check__evi", href: evidence }, /* @__PURE__ */ react_default.createElement(Link, null), evidenceLabel)));
  }

  // components/data/MetricTile.jsx
  var CSS3 = `
.exds-metric{display:flex;flex-direction:column;gap:4px;font-family:var(--font-ui);
  padding:12px 14px;background:var(--surface-card);border:1px solid var(--border-rule);border-radius:var(--radius);min-width:120px}
.exds-metric--sunken{background:var(--surface-sunken);box-shadow:var(--shadow-inset);border-color:transparent}
.exds-metric__label{display:flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:var(--fs-xs);font-weight:500;letter-spacing:var(--ls-label);text-transform:uppercase;color:var(--text-muted)}
.exds-metric__label svg{width:13px;height:13px}
.exds-metric__value{font-family:var(--font-data);font-variant-numeric:tabular-nums lining-nums;
  font-size:var(--fs-metric);font-weight:500;line-height:1;color:var(--text-strong);display:flex;align-items:baseline;gap:4px}
.exds-metric__unit{font-family:var(--font-mono);font-size:var(--fs-sm);font-weight:500;color:var(--text-muted)}
.exds-metric__delta{display:inline-flex;align-items:center;gap:3px;font-family:var(--font-mono);font-size:var(--fs-xs);font-weight:600}
.exds-metric__delta--up{color:var(--ex-field-500)}
.exds-metric__delta--down{color:var(--ex-red-600)}
.exds-metric__delta--flat{color:var(--text-muted)}
.exds-metric--ready .exds-metric__value{color:var(--ex-field-500)}
.exds-metric--caution .exds-metric__value{color:var(--ex-amber-500)}
.exds-metric--fault .exds-metric__value{color:var(--ex-red-600)}
.exds-metric--live .exds-metric__value{color:var(--ex-aqua-500)}
`;
  if (typeof document !== "undefined" && !document.getElementById("exds-metric-css")) {
    const s = document.createElement("style");
    s.id = "exds-metric-css";
    s.textContent = CSS3;
    document.head.appendChild(s);
  }
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
    return /* @__PURE__ */ react_default.createElement("div", { className: ["exds-metric", state !== "default" ? `exds-metric--${state}` : "", sunken ? "exds-metric--sunken" : "", className].filter(Boolean).join(" ") }, /* @__PURE__ */ react_default.createElement("span", { className: "exds-metric__label" }, icon, label), /* @__PURE__ */ react_default.createElement("span", { className: "exds-metric__value" }, value, unit && /* @__PURE__ */ react_default.createElement("span", { className: "exds-metric__unit" }, unit)), delta != null && /* @__PURE__ */ react_default.createElement("span", { className: `exds-metric__delta exds-metric__delta--${trend}` }, arrow, " ", delta));
  }

  // components/data/ReadinessStrip.jsx
  var CSS4 = `
.exds-strip{display:flex;align-items:stretch;font-family:var(--font-ui);
  background:var(--surface-card);border:1px solid var(--border-rule);border-radius:var(--radius);overflow:hidden}
.exds-strip__mode{display:flex;align-items:center;padding:0 14px;background:var(--accent);color:var(--accent-contrast);
  font-family:var(--font-mono);font-size:var(--fs-sm);font-weight:600;letter-spacing:var(--ls-label);text-transform:uppercase}
.exds-strip__item{display:flex;flex-direction:column;justify-content:center;gap:3px;padding:8px 16px;flex:1;min-width:0;
  border-left:1px solid var(--border-rule)}
.exds-strip__item:first-child{border-left:none}
.exds-strip__k{font-family:var(--font-mono);font-size:var(--fs-xs);font-weight:500;letter-spacing:var(--ls-label);text-transform:uppercase;color:var(--text-muted)}
.exds-strip__v{display:flex;align-items:center;gap:7px;font-size:var(--fs-sm);color:var(--text-body)}
.exds-strip__dot{width:8px;height:8px;border-radius:var(--radius-round);flex:none}
.exds-strip__dot--hollow{background:transparent!important;border:2px solid var(--ex-amber-500);width:9px;height:9px}
.exds-strip__vlabel{font-family:var(--font-mono);font-variant-numeric:tabular-nums;font-weight:500}
.is-ready .exds-strip__dot{background:var(--ex-field-500)}
.is-live .exds-strip__dot{background:var(--ex-aqua-500)}
.is-caution .exds-strip__dot{background:var(--ex-amber-500)}
.is-fault .exds-strip__dot{background:var(--ex-red-600)}
.is-unknown .exds-strip__dot{background:var(--ex-graphite-500)}
.is-fault .exds-strip__vlabel{color:var(--ex-red-600)}
`;
  if (typeof document !== "undefined" && !document.getElementById("exds-strip-css")) {
    const s = document.createElement("style");
    s.id = "exds-strip-css";
    s.textContent = CSS4;
    document.head.appendChild(s);
  }
  function ReadinessStrip({ mode, items = [], className = "", ...rest }) {
    return /* @__PURE__ */ react_default.createElement("div", { className: ["exds-strip", className].filter(Boolean).join(" "), ...rest }, mode && /* @__PURE__ */ react_default.createElement("div", { className: "exds-strip__mode" }, mode), items.map((it, i) => /* @__PURE__ */ react_default.createElement("div", { key: i, className: `exds-strip__item is-${it.state || "unknown"}` }, /* @__PURE__ */ react_default.createElement("span", { className: "exds-strip__k" }, it.label), /* @__PURE__ */ react_default.createElement("span", { className: "exds-strip__v" }, /* @__PURE__ */ react_default.createElement("span", { className: ["exds-strip__dot", it.state === "pending" ? "exds-strip__dot--hollow" : ""].filter(Boolean).join(" ") }), /* @__PURE__ */ react_default.createElement("span", { className: "exds-strip__vlabel" }, it.value)))));
  }

  // components/feedback/Badge.jsx
  var CSS5 = `
.exds-badge{display:inline-flex;align-items:center;gap:5px;
  font-family:var(--font-mono);font-size:var(--fs-xs);font-weight:600;letter-spacing:var(--ls-label);text-transform:uppercase;
  height:20px;padding:0 8px;border-radius:var(--radius-compact);border:1px solid transparent;white-space:nowrap}
.exds-badge svg{width:12px;height:12px}
.exds-badge--neutral{background:var(--surface-panel);color:var(--text-muted);border-color:var(--border-rule)}
.exds-badge--ready{background:var(--ex-field-100);color:var(--ex-field-500);border-color:var(--ex-field-500)}
.exds-badge--live{background:var(--ex-aqua-100);color:#138577;border-color:var(--ex-aqua-500)}
.exds-badge--caution{background:var(--ex-amber-100);color:#9a5d12;border-color:var(--ex-amber-500)}
.exds-badge--fault{background:var(--ex-red-100);color:var(--ex-red-600);border-color:var(--ex-red-600)}
.exds-badge--info{background:var(--ex-sky-100);color:#1668a8;border-color:var(--ex-sky-500)}
.exds-badge--solid{background:var(--accent);color:var(--accent-contrast);border-color:var(--accent)}
`;
  if (typeof document !== "undefined" && !document.getElementById("exds-badge-css")) {
    const s = document.createElement("style");
    s.id = "exds-badge-css";
    s.textContent = CSS5;
    document.head.appendChild(s);
  }
  function Badge({ tone = "neutral", icon = null, children, className = "" }) {
    return /* @__PURE__ */ react_default.createElement("span", { className: ["exds-badge", `exds-badge--${tone}`, className].filter(Boolean).join(" ") }, icon, children);
  }

  // components/feedback/StatusDot.jsx
  var CSS6 = `
.exds-statusdot{display:inline-flex;align-items:center;gap:7px;font-family:var(--font-ui);font-size:var(--fs-sm);color:var(--text-body)}
.exds-statusdot__dot{width:9px;height:9px;border-radius:var(--radius-round);flex:none;position:relative}
.exds-statusdot__dot--hollow{background:transparent;border:2px solid var(--ex-amber-500);width:10px;height:10px}
.exds-statusdot--ready .exds-statusdot__dot{background:var(--ex-field-500)}
.exds-statusdot--live .exds-statusdot__dot{background:var(--ex-aqua-500)}
.exds-statusdot--caution .exds-statusdot__dot{background:var(--ex-amber-500)}
.exds-statusdot--fault .exds-statusdot__dot{background:var(--ex-red-600)}
.exds-statusdot--unknown .exds-statusdot__dot{background:var(--ex-graphite-500)}
.exds-statusdot__label{font-family:var(--font-mono);font-size:var(--fs-xs);font-weight:600;letter-spacing:var(--ls-label);text-transform:uppercase}
/* pulsing ring for live */
.exds-statusdot--live.exds-statusdot--pulse .exds-statusdot__dot::after{
  content:"";position:absolute;inset:-4px;border-radius:var(--radius-round);
  border:1px solid var(--ex-aqua-500);animation:exds-pulse 1.6s var(--ease-out) infinite}
@keyframes exds-pulse{0%{transform:scale(.6);opacity:.9}100%{transform:scale(1.4);opacity:0}}
@media (prefers-reduced-motion: reduce){.exds-statusdot--pulse .exds-statusdot__dot::after{animation:none;opacity:0}}
`;
  if (typeof document !== "undefined" && !document.getElementById("exds-statusdot-css")) {
    const s = document.createElement("style");
    s.id = "exds-statusdot-css";
    s.textContent = CSS6;
    document.head.appendChild(s);
  }
  function StatusDot({ state = "unknown", label, pulse = false, className = "" }) {
    const hollow = state === "pending";
    const text = label ?? state.toUpperCase();
    return /* @__PURE__ */ react_default.createElement("span", { className: ["exds-statusdot", `exds-statusdot--${state}`, pulse ? "exds-statusdot--pulse" : "", className].filter(Boolean).join(" ") }, /* @__PURE__ */ react_default.createElement("span", { className: ["exds-statusdot__dot", hollow ? "exds-statusdot__dot--hollow" : ""].filter(Boolean).join(" ") }), /* @__PURE__ */ react_default.createElement("span", { className: "exds-statusdot__label" }, text));
  }

  // components/feedback/Toast.jsx
  var CSS7 = `
.exds-toast{display:flex;align-items:flex-start;gap:12px;font-family:var(--font-ui);
  background:var(--surface-card);border:1px solid var(--border-rule);border-left-width:3px;
  border-radius:var(--radius);box-shadow:var(--shadow-md);padding:12px 14px;min-width:300px;max-width:420px}
.exds-toast__icon{flex:none;width:20px;height:20px;margin-top:1px}
.exds-toast__icon svg{width:20px;height:20px}
.exds-toast__body{flex:1;min-width:0}
.exds-toast__title{font-size:var(--fs-body);font-weight:600;color:var(--text-strong)}
.exds-toast__msg{font-size:var(--fs-sm);color:var(--text-muted);margin-top:2px}
.exds-toast__close{flex:none;border:none;background:transparent;cursor:pointer;color:var(--text-muted);
  width:24px;height:24px;border-radius:var(--radius-compact);display:flex;align-items:center;justify-content:center}
.exds-toast__close:hover{background:var(--surface-hover);color:var(--text-body)}
.exds-toast__close svg{width:14px;height:14px}
.exds-toast--info{border-left-color:var(--ex-sky-500)} .exds-toast--info .exds-toast__icon{color:var(--ex-sky-500)}
.exds-toast--ready{border-left-color:var(--ex-field-500)} .exds-toast--ready .exds-toast__icon{color:var(--ex-field-500)}
.exds-toast--caution{border-left-color:var(--ex-amber-500)} .exds-toast--caution .exds-toast__icon{color:var(--ex-amber-500)}
.exds-toast--fault{border-left-color:var(--ex-red-600)} .exds-toast--fault .exds-toast__icon{color:var(--ex-red-600)}
`;
  if (typeof document !== "undefined" && !document.getElementById("exds-toast-css")) {
    const s = document.createElement("style");
    s.id = "exds-toast-css";
    s.textContent = CSS7;
    document.head.appendChild(s);
  }
  var X = () => /* @__PURE__ */ react_default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }, /* @__PURE__ */ react_default.createElement("path", { d: "M18 6 6 18M6 6l12 12" }));
  function Toast({ tone = "info", icon = null, title, children, onClose, className = "" }) {
    return /* @__PURE__ */ react_default.createElement("div", { role: "status", className: ["exds-toast", `exds-toast--${tone}`, className].filter(Boolean).join(" ") }, icon && /* @__PURE__ */ react_default.createElement("span", { className: "exds-toast__icon" }, icon), /* @__PURE__ */ react_default.createElement("div", { className: "exds-toast__body" }, title && /* @__PURE__ */ react_default.createElement("div", { className: "exds-toast__title" }, title), children && /* @__PURE__ */ react_default.createElement("div", { className: "exds-toast__msg" }, children)), onClose && /* @__PURE__ */ react_default.createElement("button", { type: "button", className: "exds-toast__close", "aria-label": "Dismiss", onClick: onClose }, /* @__PURE__ */ react_default.createElement(X, null)));
  }

  // components/forms/Button.jsx
  var CSS8 = `
.exds-btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  font-family:var(--font-ui);font-weight:600;font-size:var(--fs-body);
  line-height:1;white-space:nowrap;cursor:pointer;
  border-radius:var(--radius);border:1px solid transparent;
  height:var(--control-h);padding:0 16px;
  transition:background var(--dur) var(--ease-out),border-color var(--dur) var(--ease-out),color var(--dur) var(--ease-out);
  -webkit-font-smoothing:antialiased;
}
.exds-btn:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}
.exds-btn[disabled]{cursor:not-allowed;opacity:.45}
.exds-btn--sm{height:var(--control-h-sm);padding:0 12px;font-size:var(--fs-sm)}
.exds-btn--lg{height:var(--control-h-lg);padding:0 20px}
.exds-btn--block{width:100%}
.exds-btn svg{width:18px;height:18px;flex:none}

/* primary — carbon gradient, white text (matches app .primary-button) */
.exds-btn--primary{background:linear-gradient(135deg,var(--ex-carbon-800),var(--ex-carbon-950));color:#fff;border-color:transparent;box-shadow:0 10px 22px rgba(16,24,26,.2)}
.exds-btn--primary:hover:not([disabled]){filter:brightness(.96)}
.exds-btn--primary:active:not([disabled]){filter:brightness(.9)}

/* secondary — outline on surface */
.exds-btn--secondary{background:var(--surface-card);color:var(--text-body);border-color:var(--border-strong)}
.exds-btn--secondary:hover:not([disabled]){background:var(--surface-hover)}
.exds-btn--secondary:active:not([disabled]){background:var(--surface-panel)}

/* ghost — no chrome until hover */
.exds-btn--ghost{background:transparent;color:var(--text-body)}
.exds-btn--ghost:hover:not([disabled]){background:var(--surface-hover)}

/* danger — destructive / abort */
.exds-btn--danger{background:var(--ex-red-600);color:#fff;border-color:var(--ex-red-600)}
.exds-btn--danger:hover:not([disabled]){background:#cf322d}
.exds-btn--danger:active:not([disabled]){background:#b82b27}
`;
  if (typeof document !== "undefined" && !document.getElementById("exds-btn-css")) {
    const s = document.createElement("style");
    s.id = "exds-btn-css";
    s.textContent = CSS8;
    document.head.appendChild(s);
  }
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
    return /* @__PURE__ */ react_default.createElement("button", { type, className: cls, ...rest }, iconLeft, children != null && /* @__PURE__ */ react_default.createElement("span", null, children), iconRight);
  }

  // components/forms/IconButton.jsx
  var CSS9 = `
.exds-iconbtn{
  display:inline-flex;align-items:center;justify-content:center;
  border-radius:var(--radius);border:1px solid transparent;cursor:pointer;
  color:var(--text-body);background:transparent;
  width:var(--control-h);height:var(--control-h);flex:none;
  transition:background var(--dur) var(--ease-out),color var(--dur) var(--ease-out),border-color var(--dur) var(--ease-out);
}
.exds-iconbtn:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}
.exds-iconbtn[disabled]{cursor:not-allowed;opacity:.45}
.exds-iconbtn svg{width:18px;height:18px}
.exds-iconbtn--sm{width:var(--control-h-sm);height:var(--control-h-sm)}
.exds-iconbtn--sm svg{width:16px;height:16px}
.exds-iconbtn--lg{width:var(--control-h-lg);height:var(--control-h-lg)}
.exds-iconbtn--ghost:hover:not([disabled]){background:var(--surface-hover)}
.exds-iconbtn--outline{border-color:var(--border-strong);background:var(--surface-card)}
.exds-iconbtn--outline:hover:not([disabled]){background:var(--surface-hover)}
.exds-iconbtn--solid{background:var(--accent);color:var(--accent-contrast);border-color:var(--accent)}
.exds-iconbtn--solid:hover:not([disabled]){background:var(--ex-carbon-800)}
/* round — only when shape IS the control (play, target, reset) */
.exds-iconbtn--round{border-radius:var(--radius-round)}
.exds-iconbtn--danger{color:var(--ex-red-600)}
.exds-iconbtn--danger:hover:not([disabled]){background:var(--ex-red-100)}
`;
  if (typeof document !== "undefined" && !document.getElementById("exds-iconbtn-css")) {
    const s = document.createElement("style");
    s.id = "exds-iconbtn-css";
    s.textContent = CSS9;
    document.head.appendChild(s);
  }
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
    return /* @__PURE__ */ react_default.createElement("button", { type: "button", className: cls, ...rest, "aria-label": accessibleLabel, title: accessibleLabel }, icon);
  }

  // components/forms/Input.jsx
  var CSS10 = `
.exds-field{display:flex;flex-direction:column;gap:6px;font-family:var(--font-ui)}
.exds-field__label{font-family:var(--font-mono);font-size:var(--fs-xs);font-weight:500;letter-spacing:var(--ls-label);text-transform:uppercase;color:var(--text-muted)}
.exds-field__req{color:var(--ex-red-600);margin-left:4px}
.exds-input-wrap{display:flex;align-items:center;gap:8px;background:var(--surface-card);
  border:1px solid var(--border-rule);border-radius:var(--radius);height:var(--control-h);padding:0 12px;
  transition:border-color var(--dur) var(--ease-out),box-shadow var(--dur) var(--ease-out);}
.exds-input-wrap:focus-within{border-color:var(--focus-ring);box-shadow:0 0 0 1px var(--focus-ring)}
.exds-input-wrap--error{border-color:var(--ex-red-600)}
.exds-input-wrap--error:focus-within{border-color:var(--ex-red-600);box-shadow:0 0 0 1px var(--ex-red-600)}
.exds-input-wrap[data-disabled="true"]{background:var(--surface-panel);opacity:.6}
.exds-input{flex:1;min-width:0;border:none;outline:none;background:transparent;
  font-family:var(--font-ui);font-size:var(--fs-body);color:var(--text-body);height:100%}
.exds-input::placeholder{color:var(--text-muted)}
.exds-input--data{font-family:var(--font-data);font-variant-numeric:tabular-nums;text-align:right}
.exds-input__affix{font-family:var(--font-mono);font-size:var(--fs-sm);color:var(--text-muted);white-space:nowrap}
.exds-input__affix svg{width:16px;height:16px;display:block;color:var(--text-muted)}
.exds-field__hint{font-size:var(--fs-xs);color:var(--text-muted)}
.exds-field__hint--error{color:var(--ex-red-600);font-family:var(--font-mono)}
`;
  if (typeof document !== "undefined" && !document.getElementById("exds-input-css")) {
    const s = document.createElement("style");
    s.id = "exds-input-css";
    s.textContent = CSS10;
    document.head.appendChild(s);
  }
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
    const generatedId = react_default.useId().replaceAll(":", "");
    const fieldId = id || `exds-input-${generatedId}`;
    const messageId = error || hint ? `${fieldId}-message` : void 0;
    const describedBy = [ariaDescribedBy, messageId].filter(Boolean).join(" ") || void 0;
    return /* @__PURE__ */ react_default.createElement("div", { className: ["exds-field", className].filter(Boolean).join(" ") }, label && /* @__PURE__ */ react_default.createElement("label", { className: "exds-field__label", htmlFor: fieldId }, label, required && /* @__PURE__ */ react_default.createElement("span", { className: "exds-field__req", "aria-hidden": "true" }, "*")), /* @__PURE__ */ react_default.createElement(
      "div",
      {
        className: ["exds-input-wrap", error ? "exds-input-wrap--error" : ""].filter(Boolean).join(" "),
        "data-disabled": rest.disabled ? "true" : "false"
      },
      prefix && /* @__PURE__ */ react_default.createElement("span", { className: "exds-input__affix" }, prefix),
      /* @__PURE__ */ react_default.createElement(
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
      suffix && /* @__PURE__ */ react_default.createElement("span", { className: "exds-input__affix" }, suffix)
    ), error ? /* @__PURE__ */ react_default.createElement("span", { id: messageId, className: "exds-field__hint exds-field__hint--error" }, error) : hint && /* @__PURE__ */ react_default.createElement("span", { id: messageId, className: "exds-field__hint" }, hint));
  }

  // components/forms/SegmentedControl.jsx
  var CSS11 = `
.exds-seg{display:inline-flex;align-items:center;gap:2px;padding:3px;
  background:var(--surface-panel);border:1px solid var(--border-rule);border-radius:var(--radius);}
.exds-seg__btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;
  font-family:var(--font-mono);font-size:var(--fs-xs);font-weight:600;letter-spacing:var(--ls-label);text-transform:uppercase;
  color:var(--text-muted);background:transparent;border:none;cursor:pointer;
  height:26px;padding:0 12px;border-radius:var(--radius-compact);
  transition:background var(--dur) var(--ease-out),color var(--dur) var(--ease-out);}
.exds-seg__btn:hover:not([disabled]):not([data-active="true"]){color:var(--text-body)}
.exds-seg__btn[data-active="true"]{background:var(--accent);color:var(--accent-contrast)}
.exds-seg__btn[disabled]{opacity:.4;cursor:not-allowed}
.exds-seg__btn:focus-visible{outline:2px solid var(--focus-ring);outline-offset:2px}
.exds-seg__btn svg{width:14px;height:14px}
.exds-seg--lg .exds-seg__btn{height:32px;font-size:var(--fs-sm)}
`;
  if (typeof document !== "undefined" && !document.getElementById("exds-seg-css")) {
    const s = document.createElement("style");
    s.id = "exds-seg-css";
    s.textContent = CSS11;
    document.head.appendChild(s);
  }
  function SegmentedControl({ options = [], value, defaultValue, onChange, size = "md", ariaLabel = "Mode", className = "" }) {
    const isControlled = value !== void 0;
    const initialValue = options.find((option) => option.value === defaultValue && !option.disabled)?.value ?? options.find((option) => !option.disabled)?.value;
    const [internal, setInternal] = react_default.useState(initialValue);
    const current = isControlled ? value : internal;
    const selectedIndex = options.findIndex((option) => option.value === current && !option.disabled);
    const tabbableIndex = selectedIndex >= 0 ? selectedIndex : options.findIndex((option) => !option.disabled);
    const buttonRefs = react_default.useRef([]);
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
    return /* @__PURE__ */ react_default.createElement(
      "div",
      {
        className: ["exds-seg", size === "lg" ? "exds-seg--lg" : "", className].filter(Boolean).join(" "),
        role: "radiogroup",
        "aria-label": ariaLabel
      },
      options.map((o, index) => /* @__PURE__ */ react_default.createElement(
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
  var CSS12 = `
.exds-select-field{display:flex;flex-direction:column;gap:6px;font-family:var(--font-ui)}
.exds-select-field__label{font-family:var(--font-mono);font-size:var(--fs-xs);font-weight:500;letter-spacing:var(--ls-label);text-transform:uppercase;color:var(--text-muted)}
.exds-select-wrap{position:relative;display:flex;align-items:center;background:var(--surface-card);
  border:1px solid var(--border-rule);border-radius:var(--radius);height:var(--control-h);
  transition:border-color var(--dur) var(--ease-out),box-shadow var(--dur) var(--ease-out);}
.exds-select-wrap:focus-within{border-color:var(--focus-ring);box-shadow:0 0 0 1px var(--focus-ring)}
.exds-select{appearance:none;-webkit-appearance:none;border:none;outline:none;background:transparent;
  font-family:var(--font-ui);font-size:var(--fs-body);color:var(--text-body);
  height:100%;width:100%;padding:0 34px 0 12px;cursor:pointer}
.exds-select[disabled]{cursor:not-allowed;opacity:.55}
.exds-select-wrap__chev{position:absolute;right:10px;pointer-events:none;color:var(--text-muted);display:flex}
.exds-select-wrap__chev svg{width:16px;height:16px}
`;
  if (typeof document !== "undefined" && !document.getElementById("exds-select-css")) {
    const s = document.createElement("style");
    s.id = "exds-select-css";
    s.textContent = CSS12;
    document.head.appendChild(s);
  }
  var Chevron = () => /* @__PURE__ */ react_default.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ react_default.createElement("polyline", { points: "6 9 12 15 18 9" }));
  function Select({ label, options, id, className = "", children, ...rest }) {
    const generatedId = react_default.useId().replaceAll(":", "");
    const sid = id || `exds-select-${generatedId}`;
    return /* @__PURE__ */ react_default.createElement("div", { className: ["exds-select-field", className].filter(Boolean).join(" ") }, label && /* @__PURE__ */ react_default.createElement("label", { className: "exds-select-field__label", htmlFor: sid }, label), /* @__PURE__ */ react_default.createElement("div", { className: "exds-select-wrap" }, /* @__PURE__ */ react_default.createElement("select", { id: sid, className: "exds-select", ...rest }, options ? options.map((o) => /* @__PURE__ */ react_default.createElement("option", { key: o.value, value: o.value, disabled: o.disabled }, o.label)) : children), /* @__PURE__ */ react_default.createElement("span", { className: "exds-select-wrap__chev" }, /* @__PURE__ */ react_default.createElement(Chevron, null))));
  }

  // components/forms/Switch.jsx
  var CSS13 = `
.exds-switch{display:inline-flex;align-items:center;gap:10px;cursor:pointer;font-family:var(--font-ui);user-select:none}
.exds-switch[data-disabled="true"]{cursor:not-allowed;opacity:.45}
.exds-switch__track{position:relative;width:40px;height:22px;border-radius:var(--radius-round);
  background:var(--ex-graphite-400);border:1px solid transparent;flex:none;
  transition:background var(--dur) var(--ease-out);}
.exds-switch__track[data-on="true"]{background:var(--ex-field-500)}
.exds-switch__thumb{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:var(--radius-round);
  background:#fff;box-shadow:var(--shadow-sm);transition:transform var(--dur) var(--ease-out);}
.exds-switch__track[data-on="true"] .exds-switch__thumb{transform:translateX(18px)}
.exds-switch input{position:absolute;opacity:0;width:0;height:0}
.exds-switch input:focus-visible + .exds-switch__track{outline:2px solid var(--focus-ring);outline-offset:2px}
.exds-switch__label{font-size:var(--fs-body);color:var(--text-body)}
`;
  if (typeof document !== "undefined" && !document.getElementById("exds-switch-css")) {
    const s = document.createElement("style");
    s.id = "exds-switch-css";
    s.textContent = CSS13;
    document.head.appendChild(s);
  }
  function Switch({ checked, defaultChecked, onChange, disabled = false, label, id, className = "", ...rest }) {
    const isControlled = checked !== void 0;
    const [internal, setInternal] = react_default.useState(!!defaultChecked);
    const on = isControlled ? checked : internal;
    const handle = (e) => {
      if (!isControlled) setInternal(e.target.checked);
      if (onChange) onChange(e);
    };
    const generatedId = react_default.useId().replaceAll(":", "");
    const sid = id || `exds-switch-${generatedId}`;
    return /* @__PURE__ */ react_default.createElement("label", { className: ["exds-switch", className].filter(Boolean).join(" "), "data-disabled": disabled ? "true" : "false", htmlFor: sid }, /* @__PURE__ */ react_default.createElement("input", { id: sid, type: "checkbox", role: "switch", checked: on, disabled, onChange: handle, ...rest }), /* @__PURE__ */ react_default.createElement("span", { className: "exds-switch__track", "data-on": on ? "true" : "false" }, /* @__PURE__ */ react_default.createElement("span", { className: "exds-switch__thumb" })), label && /* @__PURE__ */ react_default.createElement("span", { className: "exds-switch__label" }, label));
  }
  return __toCommonJS(index_exports);
})();
window.ExopterDesignSystem_4c9fc9 = ExopterDesignSystem_4c9fc9;
