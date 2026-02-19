import { createContext as B, useContext as M, useState as C, useCallback as k, useRef as S, useLayoutEffect as z, useEffect as J } from "react";
import { jsx as R } from "react/jsx-runtime";
const j = ["shift", "alt", "meta", "mod", "ctrl", "control"], Q = {
  esc: "escape",
  return: "enter",
  left: "arrowleft",
  right: "arrowright",
  up: "arrowup",
  down: "arrowdown",
  ShiftLeft: "shift",
  ShiftRight: "shift",
  AltLeft: "alt",
  AltRight: "alt",
  MetaLeft: "meta",
  MetaRight: "meta",
  OSLeft: "meta",
  OSRight: "meta",
  ControlLeft: "ctrl",
  ControlRight: "ctrl"
};
function K(e) {
  return (Q[e.trim()] || e.trim()).toLowerCase().replace(/key|digit|numpad/, "");
}
function D(e) {
  return j.includes(e);
}
function P(e, n = ",") {
  return e.toLowerCase().split(n);
}
function b(e, n = "+", r = ">", i = !1, u, f) {
  let o = [], y = !1;
  e = e.trim(), e.includes(r) ? (y = !0, o = e.toLocaleLowerCase().split(r).map((d) => K(d))) : o = e.toLocaleLowerCase().split(n).map((d) => K(d));
  const c = {
    alt: o.includes("alt"),
    ctrl: o.includes("ctrl") || o.includes("control"),
    shift: o.includes("shift"),
    meta: o.includes("meta"),
    mod: o.includes("mod"),
    useKey: i
  }, m = o.filter((d) => !j.includes(d));
  return {
    ...c,
    keys: m,
    description: u,
    isSequence: y,
    hotkey: e,
    metadata: f
  };
}
typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.code !== void 0 && _([K(e.code)]);
}), document.addEventListener("keyup", (e) => {
  e.code !== void 0 && I([K(e.code)]);
})), typeof window < "u" && (window.addEventListener("blur", () => {
  L.clear();
}), window.addEventListener("contextmenu", () => {
  setTimeout(() => {
    L.clear();
  }, 0);
}));
const L = /* @__PURE__ */ new Set();
function x(e) {
  return Array.isArray(e);
}
function U(e, n = ",") {
  return (x(e) ? e : e.split(n)).every((i) => L.has(i.trim().toLowerCase()));
}
function _(e) {
  const n = Array.isArray(e) ? e : [e];
  L.has("meta") && L.forEach((r) => {
    D(r) || L.delete(r.toLowerCase());
  }), n.forEach((r) => {
    L.add(r.toLowerCase());
  });
}
function I(e) {
  const n = Array.isArray(e) ? e : [e];
  e === "meta" ? L.clear() : n.forEach((r) => {
    L.delete(r.toLowerCase());
  });
}
const V = {
  comma: ",",
  period: "."
};
function X(e, n, r) {
  (typeof r == "function" && r(e, n) || r === !0) && e.preventDefault();
}
function Y(e, n, r) {
  return typeof r == "function" ? r(e, n) : r === !0 || r === void 0;
}
const Z = [
  "input",
  "textarea",
  "select",
  "searchbox",
  "slider",
  "spinbutton",
  "menuitem",
  "menuitemcheckbox",
  "menuitemradio",
  "option",
  "radio",
  "textbox"
];
function ee(e) {
  return F(e, Z);
}
function F(e, n = !1) {
  const { target: r, composed: i } = e;
  let u, f;
  return te(r) && i ? (u = e.composedPath()[0] && e.composedPath()[0].tagName, f = e.composedPath()[0] && e.composedPath()[0].role) : (u = r && r.tagName, f = r && r.role), x(n) ? !!(u && n && n.some((o) => o.toLowerCase() === u.toLowerCase() || o === f)) : !!(u && n && n);
}
function te(e) {
  return !!e.tagName && !e.tagName.startsWith("-") && e.tagName.includes("-");
}
function re(e, n) {
  return e.length === 0 && n ? !1 : n ? e.some((r) => n.includes(r)) || e.includes("*") : !0;
}
const ne = (e, n, r = !1) => {
  const { alt: i, meta: u, mod: f, shift: o, ctrl: y, keys: c, useKey: m } = n, { code: d, key: t, ctrlKey: a, metaKey: l, shiftKey: h, altKey: w } = e, p = K(d);
  if (m && c?.length === 1) {
    if ((V[c[0]] ?? c[0]) !== t.toLowerCase())
      return !1;
    if (!r) {
      if (i !== w || o && !h) return !1;
      if (f) {
        if (!l && !a) return !1;
      } else if (u !== l || y !== a) return !1;
      if (!o && h && t !== t.toLowerCase())
        return !1;
    }
    return !0;
  }
  if (!c?.includes(p) && !["ctrl", "control", "unknown", "meta", "alt", "shift", "os"].includes(p))
    return !1;
  if (!r) {
    if (i !== w && p !== "alt" || o !== h && p !== "shift")
      return !1;
    if (f) {
      if (!l && !a)
        return !1;
    } else if (u !== l && p !== "meta" && p !== "os" || y !== a && p !== "ctrl" && p !== "control")
      return !1;
  }
  return c && c.length === 1 && c.includes(p) ? !0 : c && c.length > 0 ? c.includes(p) ? U(c) : !1 : !c || c.length === 0;
}, $ = B(void 0), oe = () => M($);
function se({ addHotkey: e, removeHotkey: n, children: r }) {
  return /* @__PURE__ */ R($.Provider, { value: { addHotkey: e, removeHotkey: n }, children: r });
}
function N(e, n) {
  return e && n && typeof e == "object" && typeof n == "object" ? Object.keys(e).length === Object.keys(n).length && // @ts-expect-error TS7053
  Object.keys(e).reduce((r, i) => r && N(e[i], n[i]), !0) : e === n;
}
const W = B({
  hotkeys: [],
  activeScopes: [],
  // This array has to be empty instead of containing '*' as default, to check if the provider is set or not
  toggleScope: () => {
  },
  enableScope: () => {
  },
  disableScope: () => {
  }
}), ie = () => M(W), de = ({ initiallyActiveScopes: e = ["*"], children: n }) => {
  const [r, i] = C(e), [u, f] = C([]), o = k((t) => {
    i((a) => a.includes("*") ? [t] : Array.from(/* @__PURE__ */ new Set([...a, t])));
  }, []), y = k((t) => {
    i((a) => a.filter((l) => l !== t));
  }, []), c = k((t) => {
    i((a) => a.includes(t) ? a.filter((l) => l !== t) : a.includes("*") ? [t] : Array.from(/* @__PURE__ */ new Set([...a, t])));
  }, []), m = k((t) => {
    f((a) => [...a, t]);
  }, []), d = k((t) => {
    f((a) => a.filter((l) => !N(l, t)));
  }, []);
  return /* @__PURE__ */ R(
    W.Provider,
    {
      value: { activeScopes: r, hotkeys: u, enableScope: o, disableScope: y, toggleScope: c },
      children: /* @__PURE__ */ R(se, { addHotkey: m, removeHotkey: d, children: n })
    }
  );
};
function ue(e) {
  const n = S(void 0);
  return N(n.current, e) || (n.current = e), n.current;
}
const q = (e) => {
  e.stopPropagation(), e.preventDefault(), e.stopImmediatePropagation();
}, ce = typeof window < "u" ? z : J;
function le(e, n, r, i) {
  const u = S(null), f = S(!1), o = Array.isArray(r) ? Array.isArray(i) ? void 0 : i : r, y = x(e) ? e.join(o?.delimiter) : e, c = Array.isArray(r) ? r : Array.isArray(i) ? i : void 0, m = k(n, c ?? []), d = S(m);
  c ? d.current = m : d.current = n;
  const t = ue(o), { activeScopes: a } = ie(), l = oe();
  return ce(() => {
    if (t?.enabled === !1 || !re(a, t?.scopes))
      return;
    let h = [], w;
    const p = (s, T = !1) => {
      if (!(ee(s) && !F(s, t?.enableOnFormTags))) {
        if (u.current !== null) {
          const v = u.current.getRootNode();
          if ((v instanceof Document || v instanceof ShadowRoot) && v.activeElement !== u.current && !u.current.contains(v.activeElement)) {
            q(s);
            return;
          }
        }
        s.target?.isContentEditable && !t?.enableOnContentEditable || P(y, t?.delimiter).forEach((v) => {
          if (v.includes(t?.splitKey ?? "+") && v.includes(t?.sequenceSplitKey ?? ">")) {
            console.warn(
              `Hotkey ${v} contains both ${t?.splitKey ?? "+"} and ${t?.sequenceSplitKey ?? ">"} which is not supported.`
            );
            return;
          }
          const g = b(
            v,
            t?.splitKey,
            t?.sequenceSplitKey,
            t?.useKey,
            t?.description,
            t?.metadata
          );
          if (g.isSequence) {
            w = setTimeout(() => {
              h = [];
            }, t?.sequenceTimeoutMs ?? 1e3);
            const H = g.useKey ? s.key : K(s.code);
            if (D(H.toLowerCase()))
              return;
            h.push(H);
            const G = g.keys?.[h.length - 1];
            if (H !== G) {
              h = [], w && clearTimeout(w);
              return;
            }
            h.length === g.keys?.length && (d.current(s, g), w && clearTimeout(w), h = []);
          } else if (ne(s, g, t?.ignoreModifiers) || g.keys?.includes("*")) {
            if (t?.ignoreEventWhen?.(s) || T && f.current)
              return;
            if (X(s, g, t?.preventDefault), !Y(s, g, t?.enabled)) {
              q(s);
              return;
            }
            d.current(s, g), T || (f.current = !0);
          }
        });
      }
    }, A = (s) => {
      s.code !== void 0 && (_(K(s.code)), (t?.keydown === void 0 && t?.keyup !== !0 || t?.keydown) && p(s));
    }, O = (s) => {
      s.code !== void 0 && (I(K(s.code)), f.current = !1, t?.keyup && p(s, !0));
    }, E = u.current || o?.document || document;
    return E.addEventListener("keyup", O, o?.eventListenerOptions), E.addEventListener("keydown", A, o?.eventListenerOptions), l && P(y, t?.delimiter).forEach((s) => {
      l.addHotkey(
        b(
          s,
          t?.splitKey,
          t?.sequenceSplitKey,
          t?.useKey,
          t?.description,
          t?.metadata
        )
      );
    }), () => {
      E.removeEventListener("keyup", O, o?.eventListenerOptions), E.removeEventListener("keydown", A, o?.eventListenerOptions), l && P(y, t?.delimiter).forEach((s) => {
        l.removeHotkey(
          b(
            s,
            t?.splitKey,
            t?.sequenceSplitKey,
            t?.useKey,
            t?.description,
            t?.metadata
          )
        );
      }), h = [], w && clearTimeout(w);
    };
  }, [y, t, a]), u;
}
function ye(e = !1) {
  const [n, r] = C(/* @__PURE__ */ new Set()), [i, u] = C(!1), f = k(
    (m) => {
      m.code !== void 0 && (m.preventDefault(), m.stopPropagation(), r((d) => {
        const t = new Set(d);
        return t.add(K(e ? m.key : m.code)), t;
      }));
    },
    [e]
  ), o = k(() => {
    typeof document < "u" && (document.removeEventListener("keydown", f), u(!1));
  }, [f]), y = k(() => {
    r(/* @__PURE__ */ new Set()), typeof document < "u" && (o(), document.addEventListener("keydown", f), u(!0));
  }, [f, o]), c = k(() => {
    r(/* @__PURE__ */ new Set());
  }, []);
  return [n, { start: y, stop: o, resetKeys: c, isRecording: i }];
}
export {
  de as HotkeysProvider,
  U as isHotkeyPressed,
  le as useHotkeys,
  ie as useHotkeysContext,
  ye as useRecordHotkeys
};
