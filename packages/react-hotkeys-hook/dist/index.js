import { createContext as M, useContext as j, useState as b, useCallback as g, useRef as A, useLayoutEffect as J, useEffect as Q } from "react";
import { jsx as q } from "react/jsx-runtime";
const D = ["shift", "alt", "meta", "mod", "ctrl", "control"], U = {
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
  return (U[e.trim()] || e.trim()).toLowerCase().replace(/key|digit|numpad/, "");
}
function _(e) {
  return D.includes(e);
}
function P(e, o = ",") {
  return e.toLowerCase().split(o);
}
function R(e, o = "+", r = ">", i = !1, c, f) {
  let n = [], y = !1;
  e = e.trim(), e.includes(r) ? (y = !0, n = e.toLocaleLowerCase().split(r).map((d) => K(d))) : n = e.toLocaleLowerCase().split(o).map((d) => K(d));
  const u = {
    alt: n.includes("alt"),
    ctrl: n.includes("ctrl") || n.includes("control"),
    shift: n.includes("shift"),
    meta: n.includes("meta"),
    mod: n.includes("mod"),
    useKey: i
  }, m = n.filter((d) => !D.includes(d));
  return {
    ...u,
    keys: m,
    description: c,
    isSequence: y,
    hotkey: e,
    metadata: f
  };
}
typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.code !== void 0 && I([K(e.code)]);
}), document.addEventListener("keyup", (e) => {
  e.code !== void 0 && F([K(e.code)]);
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
function V(e, o = ",") {
  return (x(e) ? e : e.split(o)).every((i) => L.has(i.trim().toLowerCase()));
}
function I(e) {
  const o = Array.isArray(e) ? e : [e];
  L.has("meta") && L.forEach((r) => {
    _(r) || L.delete(r.toLowerCase());
  }), o.forEach((r) => {
    L.add(r.toLowerCase());
  });
}
function F(e) {
  const o = Array.isArray(e) ? e : [e];
  e === "meta" ? L.clear() : o.forEach((r) => {
    L.delete(r.toLowerCase());
  });
}
const X = {
  comma: ",",
  period: ".",
  slash: "/",
  backslash: "\\",
  semicolon: ";",
  quote: "'",
  backquote: "`",
  bracketleft: "[",
  bracketright: "]",
  minus: "-",
  equal: "="
}, O = {
  ",": "<",
  ".": ">",
  "/": "?",
  ";": ":",
  "'": '"',
  "\\": "|",
  "`": "~",
  "[": "{",
  "]": "}",
  "-": "_",
  "=": "+"
};
function Y(e, o, r) {
  (typeof r == "function" && r(e, o) || r === !0) && e.preventDefault();
}
function Z(e, o, r) {
  return typeof r == "function" ? r(e, o) : r === !0 || r === void 0;
}
const ee = [
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
function te(e) {
  return $(e, ee);
}
function $(e, o = !1) {
  const { target: r, composed: i } = e;
  let c, f;
  return re(r) && i ? (c = e.composedPath()[0] && e.composedPath()[0].tagName, f = e.composedPath()[0] && e.composedPath()[0].role) : (c = r && r.tagName, f = r && r.role), x(o) ? !!(c && o && o.some((n) => n.toLowerCase() === c.toLowerCase() || n === f)) : !!(c && o && o);
}
function re(e) {
  return !!e.tagName && !e.tagName.startsWith("-") && e.tagName.includes("-");
}
function oe(e, o) {
  return e.length === 0 && o ? !1 : o ? e.some((r) => o.includes(r)) || e.includes("*") : !0;
}
const ne = (e, o, r = !1) => {
  const { alt: i, meta: c, mod: f, shift: n, ctrl: y, keys: u, useKey: m } = o, { code: d, key: t, ctrlKey: a, metaKey: l, shiftKey: h, altKey: w } = e, p = K(d);
  if (m && u?.length === 1) {
    const S = X[u[0]] ?? u[0], C = [S];
    if (n && O[S] && C.push(O[S]), !C.includes(t.toLowerCase()))
      return !1;
    if (!r) {
      if (i !== w || n && !h) return !1;
      if (f) {
        if (!l && !a) return !1;
      } else if (c !== l || y !== a) return !1;
      if (!n && h && t !== t.toLowerCase())
        return !1;
    }
    return !0;
  }
  if (!u?.includes(p) && !["ctrl", "control", "unknown", "meta", "alt", "shift", "os"].includes(p))
    return !1;
  if (!r) {
    if (i !== w && p !== "alt" || n !== h && p !== "shift")
      return !1;
    if (f) {
      if (!l && !a)
        return !1;
    } else if (c !== l && p !== "meta" && p !== "os" || y !== a && p !== "ctrl" && p !== "control")
      return !1;
  }
  return u && u.length === 1 && u.includes(p) ? !0 : u && u.length > 0 ? u.includes(p) ? V(u) : !1 : !u || u.length === 0;
}, W = M(void 0), se = () => j(W);
function ie({ addHotkey: e, removeHotkey: o, children: r }) {
  return /* @__PURE__ */ q(W.Provider, { value: { addHotkey: e, removeHotkey: o }, children: r });
}
function T(e, o) {
  return e && o && typeof e == "object" && typeof o == "object" ? Object.keys(e).length === Object.keys(o).length && // @ts-expect-error TS7053
  Object.keys(e).reduce((r, i) => r && T(e[i], o[i]), !0) : e === o;
}
const G = M({
  hotkeys: [],
  activeScopes: [],
  // This array has to be empty instead of containing '*' as default, to check if the provider is set or not
  toggleScope: () => {
  },
  enableScope: () => {
  },
  disableScope: () => {
  }
}), ce = () => j(G), le = ({ initiallyActiveScopes: e = ["*"], children: o }) => {
  const [r, i] = b(e), [c, f] = b([]), n = g((t) => {
    i((a) => a.includes("*") ? [t] : Array.from(/* @__PURE__ */ new Set([...a, t])));
  }, []), y = g((t) => {
    i((a) => a.filter((l) => l !== t));
  }, []), u = g((t) => {
    i((a) => a.includes(t) ? a.filter((l) => l !== t) : a.includes("*") ? [t] : Array.from(/* @__PURE__ */ new Set([...a, t])));
  }, []), m = g((t) => {
    f((a) => [...a, t]);
  }, []), d = g((t) => {
    f((a) => a.filter((l) => !T(l, t)));
  }, []);
  return /* @__PURE__ */ q(
    G.Provider,
    {
      value: { activeScopes: r, hotkeys: c, enableScope: n, disableScope: y, toggleScope: u },
      children: /* @__PURE__ */ q(ie, { addHotkey: m, removeHotkey: d, children: o })
    }
  );
};
function ue(e) {
  const o = A(void 0);
  return T(o.current, e) || (o.current = e), o.current;
}
const B = (e) => {
  e.stopPropagation(), e.preventDefault(), e.stopImmediatePropagation();
}, ae = typeof window < "u" ? J : Q;
function ye(e, o, r, i) {
  const c = A(null), f = A(!1), n = Array.isArray(r) ? Array.isArray(i) ? void 0 : i : r, y = x(e) ? e.join(n?.delimiter) : e, u = Array.isArray(r) ? r : Array.isArray(i) ? i : void 0, m = g(o, u ?? []), d = A(m);
  u ? d.current = m : d.current = o;
  const t = ue(n), { activeScopes: a } = ce(), l = se();
  return ae(() => {
    if (t?.enabled === !1 || !oe(a, t?.scopes))
      return;
    let h = [], w;
    const p = (s, N = !1) => {
      if (!(te(s) && !$(s, t?.enableOnFormTags))) {
        if (c.current !== null) {
          const v = c.current.getRootNode();
          if ((v instanceof Document || v instanceof ShadowRoot) && v.activeElement !== c.current && !c.current.contains(v.activeElement)) {
            B(s);
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
          const k = R(
            v,
            t?.splitKey,
            t?.sequenceSplitKey,
            t?.useKey,
            t?.description,
            t?.metadata
          );
          if (k.isSequence) {
            w = setTimeout(() => {
              h = [];
            }, t?.sequenceTimeoutMs ?? 1e3);
            const H = k.useKey ? s.key : K(s.code);
            if (_(H.toLowerCase()))
              return;
            h.push(H);
            const z = k.keys?.[h.length - 1];
            if (H !== z) {
              h = [], w && clearTimeout(w);
              return;
            }
            h.length === k.keys?.length && (d.current(s, k), w && clearTimeout(w), h = []);
          } else if (ne(s, k, t?.ignoreModifiers) || k.keys?.includes("*")) {
            if (t?.ignoreEventWhen?.(s) || N && f.current)
              return;
            if (Y(s, k, t?.preventDefault), !Z(s, k, t?.enabled)) {
              B(s);
              return;
            }
            d.current(s, k), N || (f.current = !0);
          }
        });
      }
    }, S = (s) => {
      s.code !== void 0 && (I(K(s.code)), (t?.keydown === void 0 && t?.keyup !== !0 || t?.keydown) && p(s));
    }, C = (s) => {
      s.code !== void 0 && (F(K(s.code)), f.current = !1, t?.keyup && p(s, !0));
    }, E = c.current || n?.document || document;
    return E.addEventListener("keyup", C, n?.eventListenerOptions), E.addEventListener("keydown", S, n?.eventListenerOptions), l && P(y, t?.delimiter).forEach((s) => {
      l.addHotkey(
        R(
          s,
          t?.splitKey,
          t?.sequenceSplitKey,
          t?.useKey,
          t?.description,
          t?.metadata
        )
      );
    }), () => {
      E.removeEventListener("keyup", C, n?.eventListenerOptions), E.removeEventListener("keydown", S, n?.eventListenerOptions), l && P(y, t?.delimiter).forEach((s) => {
        l.removeHotkey(
          R(
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
  }, [y, t, a]), c;
}
function me(e = !1) {
  const [o, r] = b(/* @__PURE__ */ new Set()), [i, c] = b(!1), f = g(
    (m) => {
      m.code !== void 0 && (m.preventDefault(), m.stopPropagation(), r((d) => {
        const t = new Set(d);
        return t.add(K(e ? m.key : m.code)), t;
      }));
    },
    [e]
  ), n = g(() => {
    typeof document < "u" && (document.removeEventListener("keydown", f), c(!1));
  }, [f]), y = g(() => {
    r(/* @__PURE__ */ new Set()), typeof document < "u" && (n(), document.addEventListener("keydown", f), c(!0));
  }, [f, n]), u = g(() => {
    r(/* @__PURE__ */ new Set());
  }, []);
  return [o, { start: y, stop: n, resetKeys: u, isRecording: i }];
}
export {
  le as HotkeysProvider,
  V as isHotkeyPressed,
  ye as useHotkeys,
  ce as useHotkeysContext,
  me as useRecordHotkeys
};
