var xe = Object.defineProperty;
var Ke = (e, t, n) => t in e ? xe(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var k = (e, t, n) => (Ke(e, typeof t != "symbol" ? t + "" : t, n), n);
const P = {}, Te = (e) => {
  const { type: t, currentTarget: n } = e;
  [...P[t]].forEach(([s, i]) => {
    n === s && [...i].forEach(([o, a]) => {
      o.apply(s, [e]), typeof a == "object" && a.once && le(s, t, o, a);
    });
  });
}, ce = (e, t, n, s) => {
  P[t] || (P[t] = /* @__PURE__ */ new Map());
  const i = P[t];
  i.has(e) || i.set(e, /* @__PURE__ */ new Map());
  const o = i.get(e), { size: a } = o;
  o.set(n, s), a || e.addEventListener(t, Te, s);
}, le = (e, t, n, s) => {
  const i = P[t], o = i && i.get(e), a = o && o.get(n), c = a !== void 0 ? a : s;
  o && o.has(n) && o.delete(n), i && (!o || !o.size) && i.delete(e), (!i || !i.size) && delete P[t], (!o || !o.size) && e.removeEventListener(t, Te, c);
}, y = "aria-expanded", Ne = "DOMContentLoaded", Ve = "keydown", He = "keyup", ge = "click", Qe = "mouseenter", We = "mouseleave", Ze = "resize", ne = "ArrowDown", se = "ArrowUp", Y = "ArrowLeft", _ = "ArrowRight", qe = "Escape", oe = "Space", Be = "transitionDuration", Ge = "transitionDelay", ee = "transitionend", Ce = "transitionProperty", Ue = navigator.userAgentData, K = Ue, { userAgent: Je } = navigator, V = Je, ve = /iPhone|iPad|iPod|Android/i;
K ? K.brands.some((e) => ve.test(e.brand)) : ve.test(V);
const pe = /(iPhone|iPod|iPad)/;
K ? K.brands.some((e) => pe.test(e.brand)) : (
  /* istanbul ignore next */
  pe.test(V)
);
V && V.includes("Firefox");
const { head: Z } = document;
["webkitPerspective", "perspective"].some((e) => e in Z.style);
const Xe = (e, t, n, s) => {
  const i = s || !1;
  e.addEventListener(t, n, i);
}, Ye = (e, t, n, s) => {
  const i = s || !1;
  e.removeEventListener(t, n, i);
}, _e = (e, t, n, s) => {
  const i = (o) => {
    (o.target === e || o.currentTarget === e) && (n.apply(e, [o]), Ye(e, t, i, s));
  };
  Xe(e, t, i, s);
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
["webkitTransform", "transform"].some((e) => e in Z.style);
["webkitAnimation", "animation"].some((e) => e in Z.style);
["webkitTransition", "transition"].some((e) => e in Z.style);
const tt = (e, t) => e.getAttribute(t), T = (e, t, n) => e.setAttribute(t, n), ie = (e, ...t) => {
  e.classList.add(...t);
}, x = (e, ...t) => {
  e.classList.remove(...t);
}, h = (e, t) => e.classList.contains(t), q = (e) => e != null && typeof e == "object" || !1, $ = (e) => q(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((t) => e.nodeType === t) || !1, E = (e) => $(e) && e.nodeType === 1 || !1, L = /* @__PURE__ */ new Map(), F = {
  data: L,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (e, t, n) => {
    E(e) && (L.has(t) || L.set(t, /* @__PURE__ */ new Map()), L.get(t).set(e, n));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (e) => L.get(e) || null,
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
    const n = F.getAllFor(t);
    return e && n && n.get(e) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (e, t) => {
    const n = F.getAllFor(t);
    !n || !E(e) || (n.delete(e), n.size === 0 && L.delete(t));
  }
}, nt = (e, t) => F.get(e, t), st = (e) => q(e) && e.constructor.name === "Window" || !1, $e = (e) => $(e) && e.nodeType === 9 || !1, w = (e) => st(e) ? e.document : $e(e) ? e : $(e) ? e.ownerDocument : window.document, ot = (e, ...t) => Object.assign(e, ...t), f = (e, t) => e.dispatchEvent(t), M = (e, t) => {
  const n = getComputedStyle(e), s = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return n.getPropertyValue(s);
}, it = (e) => {
  const t = M(e, Ce), n = M(e, Ge), s = n.includes("ms") ? (
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
  const t = M(e, Ce), n = M(e, Be), s = n.includes("ms") ? (
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
}, ke = (e, t) => {
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
    const O = s && typeof r == "string" && r.includes(s) ? r.replace(s, "").replace(/[A-Z]/g, (X) => at(X)) : r;
    c[O] = be(u);
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
  return q(t) && ot(n, t), n;
}, ut = { passive: !0 }, me = (e) => q(e) && e.constructor.name === "Map" || !1, dt = (e) => typeof e == "number" || !1, m = /* @__PURE__ */ new Map(), N = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (e, t, n, s) => {
    E(e) && (s && s.length ? (m.has(e) || m.set(e, /* @__PURE__ */ new Map()), m.get(e).set(s, setTimeout(t, n))) : m.set(e, setTimeout(t, n)));
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
    const n = m.get(e);
    return t && n && me(n) ? n.get(t) || /* istanbul ignore next */
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
    const n = m.get(e);
    t && t.length && me(n) ? (clearTimeout(n.get(t)), n.delete(t), n.size === 0 && m.delete(e)) : (clearTimeout(n), m.delete(e));
  }
}, ft = (e) => w(e).documentElement, Le = (e) => {
  var t;
  return e ? $e(e) ? e.defaultView : $(e) ? (t = e == null ? void 0 : e.ownerDocument) == null ? void 0 : t.defaultView : e : window;
}, gt = (e) => ft(e).dir === "rtl", d = (e, t) => e ? e.closest(t) || // break out of `ShadowRoot`
d(e.getRootNode().host, t) : null, vt = (e, t) => E(e) ? e : ($(t) ? t : w()).querySelector(e), Ae = (e, t) => ($(t) ? t : w()).getElementsByTagName(e), p = (e, t) => (t && $(t) ? t : w()).getElementsByClassName(
  e
), Pe = (e, t) => e.matches(t), pt = "3.2.4", b = "navbar", R = "Navbar", G = `[data-function="${b}"]`, Me = `${G},.${b}`, v = "open", ue = "open-position", g = "open-mobile", j = "subnav", U = `${j}-toggle`, Se = `${b}-toggle`, he = {
  breakpoint: 768,
  toggleSiblings: !0,
  delay: 500
}, H = B(`show.${b}`), ze = B(`shown.${b}`), Q = B(`hide.${b}`), re = B(`hidden.${b}`), S = (e) => nt(e, R), bt = (e) => new A(e), W = (e, t) => {
  (t ? ce : le)(Le(e.menu), Ze, e.listenResize, ut);
}, J = (e) => {
  const { options: t, menu: n } = e, [s] = p(U, n);
  return s && M(s, "display") !== "none" || Le(n).innerWidth < t.breakpoint;
}, Ee = (e, t) => {
  const n = t ? ce : le, { items: s, navbarToggle: i, menu: o } = e, a = w(o);
  [...s].forEach((c) => {
    const { lastElementChild: l } = c;
    l && h(l, j) && (n(c, Qe, De), n(c, We, ae));
    const [r] = p(U, c);
    r && n(r, ge, we);
  }), n(a, Ve, ht), n(a, He, Et), i && n(i, ge, we);
}, C = (e, t) => [...e.children].find((n) => Pe(n, t)), mt = (e) => {
  const t = C(e, `.${j}`), n = C(e, "A");
  if (n && (f(n, H), H.defaultPrevented))
    return;
  ie(e, ue), ie(e, v);
  const { parentElement: s } = e;
  if (s) {
    const o = p(v, s);
    z([...o].filter((a) => a !== e));
  }
  t && ke(t, () => {
    N.clear(e, "in"), n && (f(n, ze), T(n, y, "true"));
  });
}, Oe = (e, t) => {
  const n = C(e, `.${j}`), s = C(e, "A"), i = C(e, U);
  if (!([v, g].some((o) => h(e, o)) && s && (f(s, Q), Q.defaultPrevented))) {
    if (h(e, v)) {
      const o = () => {
        x(e, ue), N.clear(e, "out"), s && (f(s, re), T(s, y, "false"));
      };
      x(e, v), t && n ? ke(n, o) : o();
    }
    h(e, g) && (x(e, g), [i, s].forEach((o) => {
      o && T(o, y, "false");
    }), s && f(s, re));
  }
}, z = (e) => {
  [...e].forEach((t) => Oe(t));
}, ht = (e) => {
  const { code: t, target: n } = e;
  (E(n) ? d(n, Me) : null) && [ne, se, oe].includes(t) && e.preventDefault();
};
function Et(e) {
  const { code: t } = e, { activeElement: n } = w(this), s = n && d(n, "nav"), i = s && S(s);
  if (!i || !n || this && !this.contains(n))
    return;
  const o = d(n, "LI");
  if (!o)
    return;
  const a = J(i), { previousElementSibling: c, nextElementSibling: l } = o, r = d(o, `.${v}`), u = d(o, "UL"), [O] = p(j, o), X = [oe, ne, Y, _, se], I = u && M(u, "flex-direction") === "column", de = gt(o), Re = de ? (
    /* istanbul ignore next */
    _
  ) : Y, Fe = de ? (
    /* istanbul ignore next */
    Y
  ) : _, je = u && c && (t === se && I || t === Re && !I), Ie = u && l && (t === ne && I || t === Fe && !I);
  let D = null;
  if (t === qe && r ? (ae.call(r), D = r) : !a && O && t === oe && (h(o, v) ? ae.call(o) : De.call(o)), je && o !== u.firstElementChild ? D = c : Ie && o !== u.lastElementChild && (D = l), D) {
    const { firstElementChild: fe } = D;
    fe && fe.focus();
  }
  !a && X.includes(t) && e.preventDefault();
}
const we = (e) => {
  e.preventDefault();
  const { currentTarget: t, target: n } = e, s = d(t, Me), i = s && S(s);
  if (!i)
    return;
  const { options: o, navbarToggle: a } = i;
  if (n === t || t.contains(n)) {
    const c = d(t, "LI") || s, l = d(t, `.${Se}`) === a ? a : C(c, `.${U}`), r = l === a ? null : C(c, "A"), u = p(g, c);
    if (h(c, g)) {
      if (r && (f(r, Q), Q.defaultPrevented))
        return;
      z(u), x(c, g), l && (T(l, y, "false"), l === a && W(i)), r && (T(r, y, "false"), f(r, re));
    } else {
      if (r && (f(r, H), H.defaultPrevented))
        return;
      if (l === a)
        W(i, !0);
      else {
        const O = o.toggleSiblings ? p(g, c.parentElement) : (
          /* istanbul ignore next */
          u
        );
        z(O);
      }
      ie(c, g), l && T(l, y, "true"), r && (T(r, y, "true"), f(r, ze));
    }
  }
};
function De() {
  const e = d(this, `${G},.${b}`), t = e && S(e), n = N.get(this, "out");
  if (!(!t || J(t)) && (N.clear(this, "out"), !h(this, v) && !n)) {
    const s = () => mt(this);
    N.set(this, s, 17, "in");
  }
}
function ae() {
  const e = d(this, `${G},.${b}`), t = e && S(e);
  if (!(!t || J(t)) && h(this, v)) {
    N.clear(this, "in");
    const n = () => {
      z(p(ue, this)), Oe(this, !0);
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
    k(this, "listenResize", () => {
      J(this) || (z(p(g, w(this.menu))), W(this));
    });
    const s = vt(t);
    if (!s)
      throw new TypeError(`${R} cannot initialize the specified target.`);
    const [i] = p(Se, s), o = S(s);
    o && o.dispose(), this.menu = s, this.options = ct(s, he, n || {}), this.items = Ae("LI", s), this.navbarToggle = i, Ee(this, !0), F.set(s, R, this);
  }
  get defaults() {
    return he;
  }
  get name() {
    return R;
  }
  /**
   * Destroy Navbar instance.
   */
  dispose() {
    z(this.items), Ee(this), W(this), F.remove(this.menu, R), lt(this).forEach((t) => {
      delete this[t];
    });
  }
}
k(A, "selector", G), k(A, "init", bt), k(A, "getInstance", S), k(A, "version", pt);
const ye = (e) => {
  const { selector: t, init: n } = A;
  [...Ae("*", w(e))].filter((i) => Pe(i, t)).forEach(n);
};
document.body ? ye() : ce(document, Ne, () => ye(), { once: !0 });
export {
  A as default
};
//# sourceMappingURL=navbar.mjs.map
