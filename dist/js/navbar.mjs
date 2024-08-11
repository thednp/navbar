var xe = Object.defineProperty;
var He = (e, t, n) => t in e ? xe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var L = (e, t, n) => He(e, typeof t != "symbol" ? t + "" : t, n);
const k = {}, we = (e) => {
  const { type: t, currentTarget: n } = e;
  [...k[t]].forEach(([s, i]) => {
    n === s && [...i].forEach(([o, r]) => {
      o.apply(s, [e]), typeof r == "object" && r.once && ce(s, t, o, r);
    });
  });
}, ae = (e, t, n, s) => {
  k[t] || (k[t] = /* @__PURE__ */ new Map());
  const i = k[t];
  i.has(e) || i.set(e, /* @__PURE__ */ new Map());
  const o = i.get(e), { size: r } = o;
  o.set(n, s), r || e.addEventListener(t, we, s);
}, ce = (e, t, n, s) => {
  const i = k[t], o = i && i.get(e), r = o && o.get(n), c = r !== void 0 ? r : s;
  o && o.has(n) && o.delete(n), i && (!o || !o.size) && i.delete(e), (!i || !i.size) && delete k[t], (!o || !o.size) && e.removeEventListener(
    t,
    we,
    c
  );
}, w = "aria-expanded", Te = "DOMContentLoaded", Ve = "keydown", Ke = "keyup", fe = "click", Ue = "mouseenter", We = "mouseleave", qe = "resize", te = "ArrowDown", ne = "ArrowUp", J = "ArrowLeft", Z = "ArrowRight", Qe = "Escape", se = "Space", Be = "transitionDuration", Ge = "transitionDelay", _ = "transitionend", Ne = "transitionProperty", Xe = navigator.userAgentData, H = Xe, { userAgent: Ye } = navigator, V = Ye, ge = /iPhone|iPad|iPod|Android/i;
H ? H.brands.some((e) => ge.test(e.brand)) : ge.test(V);
const ve = /(iPhone|iPod|iPad)/;
H ? H.brands.some((e) => ve.test(e.brand)) : (
  /* istanbul ignore next */
  ve.test(V)
);
V && V.includes("Firefox");
const { head: q } = document;
["webkitPerspective", "perspective"].some((e) => e in q.style);
const Je = (e, t, n, s) => {
  const i = s || !1;
  e.addEventListener(t, n, i);
}, Ze = (e, t, n, s) => {
  const i = s || !1;
  e.removeEventListener(t, n, i);
}, _e = (e, t, n, s) => {
  const i = (o) => {
    (o.target === e || o.currentTarget === e) && (n.apply(e, [o]), Ze(e, t, i, s));
  };
  Je(e, t, i, s);
}, et = () => {
};
(() => {
  let e = !1;
  try {
    const t = Object.defineProperty({}, "passive", {
      get: () => (e = !0, e)
    });
    _e(document, Te, et, t);
  } catch {
  }
  return e;
})();
["webkitTransform", "transform"].some((e) => e in q.style);
["webkitAnimation", "animation"].some((e) => e in q.style);
["webkitTransition", "transition"].some((e) => e in q.style);
const tt = (e, t) => e.getAttribute(t), T = (e, t, n) => e.setAttribute(t, n), oe = (e, ...t) => {
  e.classList.add(...t);
}, x = (e, ...t) => {
  e.classList.remove(...t);
}, m = (e, t) => e.classList.contains(t), Q = (e) => e != null && typeof e == "object" || !1, $ = (e) => Q(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((t) => e.nodeType === t) || !1, E = (e) => $(e) && e.nodeType === 1 || !1, P = /* @__PURE__ */ new Map(), R = {
  data: P,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (e, t, n) => {
    E(e) && (P.has(t) || P.set(t, /* @__PURE__ */ new Map()), P.get(t).set(e, n));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (e) => P.get(e) || null,
  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: (e, t) => {
    if (!E(e) || !t) return null;
    const n = R.getAllFor(t);
    return e && n && n.get(e) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (e, t) => {
    const n = R.getAllFor(t);
    !n || !E(e) || (n.delete(e), n.size === 0 && P.delete(t));
  }
}, nt = (e, t) => R.get(e, t), st = (e) => Q(e) && e.constructor.name === "Window" || !1, Ce = (e) => $(e) && e.nodeType === 9 || !1, y = (e) => st(e) ? e.document : Ce(e) ? e : $(e) ? e.ownerDocument : window.document, ot = (e, ...t) => Object.assign(e, ...t), f = (e, t) => e.dispatchEvent(t), S = (e, t) => {
  const n = getComputedStyle(e), s = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return n.getPropertyValue(s);
}, it = (e) => {
  const t = S(e, Ne), n = S(e, Ge), s = n.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, i = t && t !== "none" ? parseFloat(n) * s : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(i) ? (
    /* istanbul ignore next */
    0
  ) : i;
}, rt = (e) => {
  const t = S(e, Ne), n = S(e, Be), s = n.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, i = t && t !== "none" ? parseFloat(n) * s : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(i) ? (
    /* istanbul ignore next */
    0
  ) : i;
}, $e = (e, t) => {
  let n = 0;
  const s = new Event(_), i = rt(e), o = it(e);
  if (i) {
    const r = (c) => {
      c.target === e && (t.apply(e, [c]), e.removeEventListener(_, r), n = 1);
    };
    e.addEventListener(_, r), setTimeout(() => {
      n || f(e, s);
    }, i + o + 17);
  } else
    t.apply(e, [s]);
}, pe = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, ee = (e) => Object.entries(e), at = (e, t, n, s) => {
  const i = { ...n }, o = { ...e.dataset }, r = { ...t }, c = {}, l = "title";
  return ee(o).forEach(([a, u]) => {
    const D = a;
    c[D] = pe(u);
  }), ee(i).forEach(([a, u]) => {
    i[a] = pe(u);
  }), ee(t).forEach(([a, u]) => {
    a in i ? r[a] = i[a] : a in c ? r[a] = c[a] : r[a] = a === l ? tt(e, l) : u;
  }), r;
}, ct = (e) => Object.keys(e), B = (e, t) => {
  const n = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return Q(t) && ot(n, t), n;
}, lt = { passive: !0 }, be = (e) => Q(e) && e.constructor.name === "Map" || !1, ut = (e) => typeof e == "number" || !1, h = /* @__PURE__ */ new Map(), N = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (e, t, n, s) => {
    E(e) && (s && s.length ? (h.has(e) || h.set(e, /* @__PURE__ */ new Map()), h.get(e).set(s, setTimeout(t, n))) : h.set(e, setTimeout(t, n)));
  },
  /**
   * Returns the timer associated with the target.
   *
   * @param element target element
   * @param key a unique
   * @returns the timer
   */
  get: (e, t) => {
    if (!E(e)) return null;
    const n = h.get(e);
    return t && n && be(n) ? n.get(t) || /* istanbul ignore next */
    null : ut(n) ? n : null;
  },
  /**
   * Clears the element's timer.
   *
   * @param element target element
   * @param key a unique key
   */
  clear: (e, t) => {
    if (!E(e)) return;
    const n = h.get(e);
    t && t.length && be(n) ? (clearTimeout(n.get(t)), n.delete(t), n.size === 0 && h.delete(e)) : (clearTimeout(n), h.delete(e));
  }
}, dt = (e) => y(e).documentElement, Le = (e) => {
  var t;
  return e ? Ce(e) ? e.defaultView : $(e) ? (t = e == null ? void 0 : e.ownerDocument) == null ? void 0 : t.defaultView : e : window;
}, ft = (e) => dt(e).dir === "rtl", d = (e, t) => e ? e.closest(t) || // break out of `ShadowRoot`
d(e.getRootNode().host, t) : null, gt = (e, t) => E(e) ? e : ($(t) ? t : y()).querySelector(e), Pe = (e, t) => ($(t) ? t : y()).getElementsByTagName(e), p = (e, t) => (t && $(t) ? t : y()).getElementsByClassName(
  e
), Ae = (e, t) => e.matches(t), vt = "3.2.6", b = "navbar", O = "Navbar", G = `[data-function="${b}"]`, ke = `${G},.${b}`, v = "open", le = "open-position", g = "open-mobile", F = "subnav", X = `${F}-toggle`, Se = `${b}-toggle`, he = {
  breakpoint: 768,
  toggleSiblings: !0,
  delay: 500
}, K = B(`show.${b}`), Me = B(`shown.${b}`), U = B(`hide.${b}`), ie = B(`hidden.${b}`), M = (e) => nt(e, O), pt = (e) => new A(e), W = (e, t) => {
  (t ? ae : ce)(Le(e.menu), qe, e.listenResize, lt);
}, Y = (e) => {
  const { options: t, menu: n } = e, [s] = p(X, n);
  return s && S(s, "display") !== "none" || Le(n).innerWidth < t.breakpoint;
}, me = (e, t) => {
  const n = t ? ae : ce, { items: s, navbarToggle: i, menu: o } = e, r = y(o);
  [...s].forEach((c) => {
    const { lastElementChild: l } = c;
    l && m(l, F) && (n(c, Ue, De), n(c, We, re));
    const [a] = p(X, c);
    a && n(a, fe, Ee);
  }), n(r, Ve, ht), n(r, Ke, mt), i && n(i, fe, Ee);
}, C = (e, t) => [...e.children].find((n) => Ae(n, t)), bt = (e) => {
  const t = C(e, `.${F}`), n = C(e, "A");
  if (n && (f(n, K), K.defaultPrevented))
    return;
  oe(e, le), oe(e, v);
  const { parentElement: s } = e;
  if (s) {
    const o = p(v, s);
    z([...o].filter((r) => r !== e));
  }
  t && $e(t, () => {
    N.clear(e, "in"), n && (f(n, Me), T(n, w, "true"));
  });
}, ze = (e, t) => {
  const n = C(e, `.${F}`), s = C(e, "A"), i = C(e, X);
  if (!([v, g].some((o) => m(e, o)) && s && (f(s, U), U.defaultPrevented))) {
    if (m(e, v)) {
      const o = () => {
        x(e, le), N.clear(e, "out"), s && (f(s, ie), T(s, w, "false"));
      };
      x(e, v), t && n ? $e(n, o) : o();
    }
    m(e, g) && (x(e, g), [i, s].forEach((o) => {
      o && T(o, w, "false");
    }), s && f(s, ie));
  }
}, z = (e) => {
  [...e].forEach((t) => ze(t));
}, ht = (e) => {
  const { code: t, target: n } = e;
  (E(n) ? d(n, ke) : null) && [te, ne, se].includes(t) && e.preventDefault();
};
function mt(e) {
  const { code: t } = e, { activeElement: n } = y(this), s = n && d(n, "nav"), i = s && M(s);
  if (!i || !n || this && !this.contains(n)) return;
  const o = d(n, "LI");
  if (!o) return;
  const r = Y(i), { previousElementSibling: c, nextElementSibling: l } = o, a = d(o, `.${v}`), u = d(o, "UL"), [D] = p(F, o), je = [se, te, J, Z, ne], I = u && S(u, "flex-direction") === "column", ue = ft(o), Oe = ue ? (
    /* istanbul ignore next */
    Z
  ) : J, Re = ue ? (
    /* istanbul ignore next */
    J
  ) : Z, Fe = u && c && (t === ne && I || t === Oe && !I), Ie = u && l && (t === te && I || t === Re && !I);
  let j = null;
  if (t === Qe && a ? (re.call(a), j = a) : !r && D && t === se && (m(o, v) ? re.call(o) : De.call(o)), Fe && o !== u.firstElementChild ? j = c : Ie && o !== u.lastElementChild && (j = l), j) {
    const { firstElementChild: de } = j;
    de && de.focus();
  }
  !r && je.includes(t) && e.preventDefault();
}
const Ee = (e) => {
  e.preventDefault();
  const { currentTarget: t, target: n } = e, s = d(t, ke), i = s && M(s);
  if (!i) return;
  const { options: o, navbarToggle: r } = i;
  if (n === t || t.contains(n)) {
    const c = d(t, "LI") || s, l = d(t, `.${Se}`) === r ? r : C(c, `.${X}`), a = l === r ? null : C(c, "A"), u = p(g, c);
    if (m(c, g)) {
      if (a && (f(a, U), U.defaultPrevented))
        return;
      z(u), x(c, g), l && (T(l, w, "false"), l === r && W(i)), a && (T(a, w, "false"), f(a, ie));
    } else {
      if (a && (f(a, K), K.defaultPrevented))
        return;
      if (l === r)
        W(i, !0);
      else {
        const D = o.toggleSiblings ? p(g, c.parentElement) : (
          /* istanbul ignore next */
          u
        );
        z(D);
      }
      oe(c, g), l && T(l, w, "true"), a && (T(a, w, "true"), f(a, Me));
    }
  }
};
function De() {
  const e = d(this, `${G},.${b}`), t = e && M(e), n = N.get(this, "out");
  if (!(!t || Y(t)) && (N.clear(this, "out"), !m(this, v) && !n)) {
    const s = () => bt(this);
    N.set(this, s, 17, "in");
  }
}
function re() {
  const e = d(this, `${G},.${b}`), t = e && M(e);
  if (!(!t || Y(t)) && m(this, v)) {
    N.clear(this, "in");
    const n = () => {
      z(p(le, this)), ze(this, !0);
    };
    N.set(this, n, t.options.delay, "out");
  }
}
class A {
  /**
   * @param target HTMLElement or selector
   * @param config instance options
   */
  constructor(t, n) {
    // NAVBAR PUBLIC METHODS
    // =====================
    /**
     * Window `resize` event listener.
     */
    L(this, "listenResize", () => {
      Y(this) || (z(p(g, y(this.menu))), W(this));
    });
    const s = gt(t);
    if (!s) throw new TypeError(`${O} cannot initialize the specified target.`);
    const [i] = p(Se, s), o = M(s);
    o && o.dispose(), this.menu = s, this.options = at(s, he, n || {}), this.items = Pe("LI", s), this.navbarToggle = i, me(this, !0), R.set(s, O, this);
  }
  get defaults() {
    return he;
  }
  get name() {
    return O;
  }
  /**
   * Destroy Navbar instance.
   */
  dispose() {
    z(this.items), me(this), W(this), R.remove(this.menu, O), ct(this).forEach((t) => {
      delete this[t];
    });
  }
}
L(A, "selector", G), L(A, "init", pt), L(A, "getInstance", M), L(A, "version", vt);
const ye = (e) => {
  const { selector: t, init: n } = A;
  [...Pe("*", y(e))].filter((i) => Ae(i, t)).forEach(n);
};
document.body ? ye() : ae(document, Te, () => ye(), { once: !0 });
export {
  A as default
};
//# sourceMappingURL=navbar.mjs.map
