var xe = Object.defineProperty;
var He = (e, t, n) => t in e ? xe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var L = (e, t, n) => (He(e, typeof t != "symbol" ? t + "" : t, n), n);
const k = {}, Te = (e) => {
  const { type: t, currentTarget: n } = e;
  [...k[t]].forEach(([s, i]) => {
    n === s && [...i].forEach(([o, a]) => {
      o.apply(s, [e]), typeof a == "object" && a.once && le(s, t, o, a);
    });
  });
}, ce = (e, t, n, s) => {
  k[t] || (k[t] = /* @__PURE__ */ new Map());
  const i = k[t];
  i.has(e) || i.set(e, /* @__PURE__ */ new Map());
  const o = i.get(e), { size: a } = o;
  o.set(n, s), a || e.addEventListener(t, Te, s);
}, le = (e, t, n, s) => {
  const i = k[t], o = i && i.get(e), a = o && o.get(n), c = a !== void 0 ? a : s;
  o && o.has(n) && o.delete(n), i && (!o || !o.size) && i.delete(e), (!i || !i.size) && delete k[t], (!o || !o.size) && e.removeEventListener(
    t,
    Te,
    c
  );
}, w = "aria-expanded", Ne = "DOMContentLoaded", Ve = "keydown", Ke = "keyup", ge = "click", Ue = "mouseenter", We = "mouseleave", qe = "resize", ne = "ArrowDown", se = "ArrowUp", J = "ArrowLeft", _ = "ArrowRight", Qe = "Escape", oe = "Space", Be = "transitionDuration", Ge = "transitionDelay", ee = "transitionend", Ce = "transitionProperty", Xe = navigator.userAgentData, H = Xe, { userAgent: Ye } = navigator, V = Ye, ve = /iPhone|iPad|iPod|Android/i;
H ? H.brands.some((e) => ve.test(e.brand)) : ve.test(V);
const pe = /(iPhone|iPod|iPad)/;
H ? H.brands.some((e) => pe.test(e.brand)) : (
  /* istanbul ignore next */
  pe.test(V)
);
V && V.includes("Firefox");
const { head: q } = document;
["webkitPerspective", "perspective"].some((e) => e in q.style);
const Ze = (e, t, n, s) => {
  const i = s || !1;
  e.addEventListener(t, n, i);
}, Je = (e, t, n, s) => {
  const i = s || !1;
  e.removeEventListener(t, n, i);
}, _e = (e, t, n, s) => {
  const i = (o) => {
    (o.target === e || o.currentTarget === e) && (n.apply(e, [o]), Je(e, t, i, s));
  };
  Ze(e, t, i, s);
}, et = () => {
};
(() => {
  let e = !1;
  try {
    const t = Object.defineProperty({}, "passive", {
      get: () => (e = !0, e)
    });
    _e(document, Ne, et, t);
  } catch {
  }
  return e;
})();
["webkitTransform", "transform"].some((e) => e in q.style);
["webkitAnimation", "animation"].some((e) => e in q.style);
["webkitTransition", "transition"].some((e) => e in q.style);
const tt = (e, t) => e.getAttribute(t), T = (e, t, n) => e.setAttribute(t, n), ie = (e, ...t) => {
  e.classList.add(...t);
}, x = (e, ...t) => {
  e.classList.remove(...t);
}, m = (e, t) => e.classList.contains(t), Q = (e) => e != null && typeof e == "object" || !1, $ = (e) => Q(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((t) => e.nodeType === t) || !1, E = (e) => $(e) && e.nodeType === 1 || !1, A = /* @__PURE__ */ new Map(), R = {
  data: A,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (e, t, n) => {
    E(e) && (A.has(t) || A.set(t, /* @__PURE__ */ new Map()), A.get(t).set(e, n));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (e) => A.get(e) || null,
  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: (e, t) => {
    if (!E(e) || !t)
      return null;
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
    !n || !E(e) || (n.delete(e), n.size === 0 && A.delete(t));
  }
}, nt = (e, t) => R.get(e, t), st = (e) => Q(e) && e.constructor.name === "Window" || !1, $e = (e) => $(e) && e.nodeType === 9 || !1, y = (e) => st(e) ? e.document : $e(e) ? e : $(e) ? e.ownerDocument : window.document, ot = (e, ...t) => Object.assign(e, ...t), f = (e, t) => e.dispatchEvent(t), S = (e, t) => {
  const n = getComputedStyle(e), s = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return n.getPropertyValue(s);
}, it = (e) => {
  const t = S(e, Ce), n = S(e, Ge), s = n.includes("ms") ? (
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
  const t = S(e, Ce), n = S(e, Be), s = n.includes("ms") ? (
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
}, Le = (e, t) => {
  let n = 0;
  const s = new Event(ee), i = rt(e), o = it(e);
  if (i) {
    const a = (c) => {
      c.target === e && (t.apply(e, [c]), e.removeEventListener(ee, a), n = 1);
    };
    e.addEventListener(ee, a), setTimeout(() => {
      n || f(e, s);
    }, i + o + 17);
  } else
    t.apply(e, [s]);
}, be = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, te = (e) => Object.entries(e), at = (e) => e.toLowerCase(), ct = (e, t, n, s) => {
  const i = { ...n }, o = { ...e.dataset }, a = { ...t }, c = {}, l = "title";
  return te(o).forEach(([r, u]) => {
    const D = s && typeof r == "string" && r.includes(s) ? r.replace(s, "").replace(/[A-Z]/g, (Z) => at(Z)) : r;
    c[D] = be(u);
  }), te(i).forEach(([r, u]) => {
    i[r] = be(u);
  }), te(t).forEach(([r, u]) => {
    r in i ? a[r] = i[r] : r in c ? a[r] = c[r] : a[r] = r === l ? tt(e, l) : u;
  }), a;
}, lt = (e) => Object.keys(e), B = (e, t) => {
  const n = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return Q(t) && ot(n, t), n;
}, ut = { passive: !0 }, he = (e) => Q(e) && e.constructor.name === "Map" || !1, dt = (e) => typeof e == "number" || !1, h = /* @__PURE__ */ new Map(), N = {
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
    if (!E(e))
      return null;
    const n = h.get(e);
    return t && n && he(n) ? n.get(t) || /* istanbul ignore next */
    null : dt(n) ? n : null;
  },
  /**
   * Clears the element's timer.
   *
   * @param element target element
   * @param key a unique key
   */
  clear: (e, t) => {
    if (!E(e))
      return;
    const n = h.get(e);
    t && t.length && he(n) ? (clearTimeout(n.get(t)), n.delete(t), n.size === 0 && h.delete(e)) : (clearTimeout(n), h.delete(e));
  }
}, ft = (e) => y(e).documentElement, Ae = (e) => {
  var t;
  return e ? $e(e) ? e.defaultView : $(e) ? (t = e == null ? void 0 : e.ownerDocument) == null ? void 0 : t.defaultView : e : window;
}, gt = (e) => ft(e).dir === "rtl", d = (e, t) => e ? e.closest(t) || // break out of `ShadowRoot`
d(e.getRootNode().host, t) : null, vt = (e, t) => E(e) ? e : ($(t) ? t : y()).querySelector(e), Pe = (e, t) => ($(t) ? t : y()).getElementsByTagName(e), p = (e, t) => (t && $(t) ? t : y()).getElementsByClassName(
  e
), ke = (e, t) => e.matches(t), pt = "3.2.5", b = "navbar", O = "Navbar", G = `[data-function="${b}"]`, Se = `${G},.${b}`, v = "open", ue = "open-position", g = "open-mobile", F = "subnav", X = `${F}-toggle`, Me = `${b}-toggle`, me = {
  breakpoint: 768,
  toggleSiblings: !0,
  delay: 500
}, K = B(`show.${b}`), ze = B(`shown.${b}`), U = B(`hide.${b}`), re = B(`hidden.${b}`), M = (e) => nt(e, O), bt = (e) => new P(e), W = (e, t) => {
  (t ? ce : le)(Ae(e.menu), qe, e.listenResize, ut);
}, Y = (e) => {
  const { options: t, menu: n } = e, [s] = p(X, n);
  return s && S(s, "display") !== "none" || Ae(n).innerWidth < t.breakpoint;
}, Ee = (e, t) => {
  const n = t ? ce : le, { items: s, navbarToggle: i, menu: o } = e, a = y(o);
  [...s].forEach((c) => {
    const { lastElementChild: l } = c;
    l && m(l, F) && (n(c, Ue, je), n(c, We, ae));
    const [r] = p(X, c);
    r && n(r, ge, ye);
  }), n(a, Ve, mt), n(a, Ke, Et), i && n(i, ge, ye);
}, C = (e, t) => [...e.children].find((n) => ke(n, t)), ht = (e) => {
  const t = C(e, `.${F}`), n = C(e, "A");
  if (n && (f(n, K), K.defaultPrevented))
    return;
  ie(e, ue), ie(e, v);
  const { parentElement: s } = e;
  if (s) {
    const o = p(v, s);
    z([...o].filter((a) => a !== e));
  }
  t && Le(t, () => {
    N.clear(e, "in"), n && (f(n, ze), T(n, w, "true"));
  });
}, De = (e, t) => {
  const n = C(e, `.${F}`), s = C(e, "A"), i = C(e, X);
  if (!([v, g].some((o) => m(e, o)) && s && (f(s, U), U.defaultPrevented))) {
    if (m(e, v)) {
      const o = () => {
        x(e, ue), N.clear(e, "out"), s && (f(s, re), T(s, w, "false"));
      };
      x(e, v), t && n ? Le(n, o) : o();
    }
    m(e, g) && (x(e, g), [i, s].forEach((o) => {
      o && T(o, w, "false");
    }), s && f(s, re));
  }
}, z = (e) => {
  [...e].forEach((t) => De(t));
}, mt = (e) => {
  const { code: t, target: n } = e;
  (E(n) ? d(n, Se) : null) && [ne, se, oe].includes(t) && e.preventDefault();
};
function Et(e) {
  const { code: t } = e, { activeElement: n } = y(this), s = n && d(n, "nav"), i = s && M(s);
  if (!i || !n || this && !this.contains(n))
    return;
  const o = d(n, "LI");
  if (!o)
    return;
  const a = Y(i), { previousElementSibling: c, nextElementSibling: l } = o, r = d(o, `.${v}`), u = d(o, "UL"), [D] = p(F, o), Z = [oe, ne, J, _, se], I = u && S(u, "flex-direction") === "column", de = gt(o), Oe = de ? (
    /* istanbul ignore next */
    _
  ) : J, Re = de ? (
    /* istanbul ignore next */
    J
  ) : _, Fe = u && c && (t === se && I || t === Oe && !I), Ie = u && l && (t === ne && I || t === Re && !I);
  let j = null;
  if (t === Qe && r ? (ae.call(r), j = r) : !a && D && t === oe && (m(o, v) ? ae.call(o) : je.call(o)), Fe && o !== u.firstElementChild ? j = c : Ie && o !== u.lastElementChild && (j = l), j) {
    const { firstElementChild: fe } = j;
    fe && fe.focus();
  }
  !a && Z.includes(t) && e.preventDefault();
}
const ye = (e) => {
  e.preventDefault();
  const { currentTarget: t, target: n } = e, s = d(t, Se), i = s && M(s);
  if (!i)
    return;
  const { options: o, navbarToggle: a } = i;
  if (n === t || t.contains(n)) {
    const c = d(t, "LI") || s, l = d(t, `.${Me}`) === a ? a : C(c, `.${X}`), r = l === a ? null : C(c, "A"), u = p(g, c);
    if (m(c, g)) {
      if (r && (f(r, U), U.defaultPrevented))
        return;
      z(u), x(c, g), l && (T(l, w, "false"), l === a && W(i)), r && (T(r, w, "false"), f(r, re));
    } else {
      if (r && (f(r, K), K.defaultPrevented))
        return;
      if (l === a)
        W(i, !0);
      else {
        const D = o.toggleSiblings ? p(g, c.parentElement) : (
          /* istanbul ignore next */
          u
        );
        z(D);
      }
      ie(c, g), l && T(l, w, "true"), r && (T(r, w, "true"), f(r, ze));
    }
  }
};
function je() {
  const e = d(this, `${G},.${b}`), t = e && M(e), n = N.get(this, "out");
  if (!(!t || Y(t)) && (N.clear(this, "out"), !m(this, v) && !n)) {
    const s = () => ht(this);
    N.set(this, s, 17, "in");
  }
}
function ae() {
  const e = d(this, `${G},.${b}`), t = e && M(e);
  if (!(!t || Y(t)) && m(this, v)) {
    N.clear(this, "in");
    const n = () => {
      z(p(ue, this)), De(this, !0);
    };
    N.set(this, n, t.options.delay, "out");
  }
}
class P {
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
    const s = vt(t);
    if (!s)
      throw new TypeError(`${O} cannot initialize the specified target.`);
    const [i] = p(Me, s), o = M(s);
    o && o.dispose(), this.menu = s, this.options = ct(s, me, n || {}), this.items = Pe("LI", s), this.navbarToggle = i, Ee(this, !0), R.set(s, O, this);
  }
  get defaults() {
    return me;
  }
  get name() {
    return O;
  }
  /**
   * Destroy Navbar instance.
   */
  dispose() {
    z(this.items), Ee(this), W(this), R.remove(this.menu, O), lt(this).forEach((t) => {
      delete this[t];
    });
  }
}
L(P, "selector", G), L(P, "init", bt), L(P, "getInstance", M), L(P, "version", pt);
const we = (e) => {
  const { selector: t, init: n } = P;
  [...Pe("*", y(e))].filter((i) => ke(i, t)).forEach(n);
};
document.body ? we() : ce(document, Ne, () => we(), { once: !0 });
export {
  P as default
};
//# sourceMappingURL=navbar.mjs.map
