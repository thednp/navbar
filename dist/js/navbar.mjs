var je = Object.defineProperty;
var Fe = (e, t, n) => t in e ? je(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var A = (e, t, n) => (Fe(e, typeof t != "symbol" ? t + "" : t, n), n);
var z = {};
(function(e) {
  Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
  const t = {}, n = (a) => {
    const { type: c, currentTarget: i } = a;
    [...t[c]].forEach(([l, f]) => {
      i === l && [...f].forEach(([d, g]) => {
        d.apply(l, [a]), typeof g == "object" && g.once && o(l, c, d, g);
      });
    });
  }, s = (a, c, i, l) => {
    t[c] || (t[c] = /* @__PURE__ */ new Map());
    const f = t[c];
    f.has(a) || f.set(a, /* @__PURE__ */ new Map());
    const d = f.get(a), { size: g } = d;
    d.set(i, l), g || a.addEventListener(c, n, l);
  }, o = (a, c, i, l) => {
    const f = t[c], d = f && f.get(a), g = d && d.get(i), V = g !== void 0 ? g : l;
    d && d.has(i) && d.delete(i), f && (!d || !d.size) && f.delete(a), (!f || !f.size) && delete t[c], (!d || !d.size) && a.removeEventListener(c, n, V);
  }, r = s, u = o;
  e.addListener = s, e.globalListener = n, e.off = u, e.on = r, e.registry = t, e.removeListener = o;
})(z);
const N = "aria-expanded", ye = "DOMContentLoaded", Ie = "keydown", Ke = "keyup", de = "click", Ve = "mouseenter", He = "mouseleave", Qe = "resize", se = "ArrowDown", oe = "ArrowUp", x = "ArrowLeft", ee = "ArrowRight", We = "Escape", ie = "Space", Ze = "transitionDuration", qe = "transitionDelay", te = "transitionend", we = "transitionProperty", Be = navigator.userAgentData, Q = Be, { userAgent: Ge } = navigator, W = Ge, fe = /iPhone|iPad|iPod|Android/i;
Q ? Q.brands.some((e) => fe.test(e.brand)) : fe.test(W);
const ge = /(iPhone|iPod|iPad)/;
Q ? Q.brands.some((e) => ge.test(e.brand)) : (
  /* istanbul ignore next */
  ge.test(W)
);
W && W.includes("Firefox");
const { head: G } = document;
["webkitPerspective", "perspective"].some((e) => e in G.style);
const Ue = (e, t, n, s) => {
  const o = s || !1;
  e.addEventListener(t, n, o);
}, Je = (e, t, n, s) => {
  const o = s || !1;
  e.removeEventListener(t, n, o);
}, Xe = (e, t, n, s) => {
  const o = (r) => {
    (r.target === e || r.currentTarget === e) && (n.apply(e, [r]), Je(e, t, o, s));
  };
  Ue(e, t, o, s);
}, Ye = () => {
};
(() => {
  let e = !1;
  try {
    const t = Object.defineProperty({}, "passive", {
      get: () => (e = !0, e)
    });
    Xe(document, ye, Ye, t);
  } catch {
  }
  return e;
})();
["webkitTransform", "transform"].some((e) => e in G.style);
["webkitAnimation", "animation"].some((e) => e in G.style);
["webkitTransition", "transition"].some((e) => e in G.style);
const _e = (e, t) => e.getAttribute(t), C = (e, t, n) => e.setAttribute(t, n), re = (e, ...t) => {
  e.classList.add(...t);
}, H = (e, ...t) => {
  e.classList.remove(...t);
}, w = (e, t) => e.classList.contains(t), U = (e) => e != null && typeof e == "object" || !1, $ = (e) => U(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((t) => e.nodeType === t) || !1, L = (e) => $(e) && e.nodeType === 1 || !1, S = /* @__PURE__ */ new Map(), I = {
  data: S,
  /**
   * Sets web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @param instance the component instance
   */
  set: (e, t, n) => {
    L(e) && (S.has(t) || S.set(t, /* @__PURE__ */ new Map()), S.get(t).set(e, n));
  },
  /**
   * Returns all instances for specified component.
   *
   * @param component the component's name or a unique key
   * @returns all the component instances
   */
  getAllFor: (e) => S.get(e) || null,
  /**
   * Returns the instance associated with the target.
   *
   * @param element target element
   * @param component the component's name or a unique key
   * @returns the instance
   */
  get: (e, t) => {
    if (!L(e) || !t)
      return null;
    const n = I.getAllFor(t);
    return e && n && n.get(e) || null;
  },
  /**
   * Removes web components data.
   *
   * @param element target element
   * @param component the component's name or a unique key
   */
  remove: (e, t) => {
    const n = I.getAllFor(t);
    !n || !L(e) || (n.delete(e), n.size === 0 && S.delete(t));
  }
}, xe = (e, t) => I.get(e, t), et = (e) => U(e) && e.constructor.name === "Window" || !1, Le = (e) => $(e) && e.nodeType === 9 || !1, T = (e) => et(e) ? e.document : Le(e) ? e : $(e) ? e.ownerDocument : window.document, tt = (e, ...t) => Object.assign(e, ...t), b = (e, t) => e.dispatchEvent(t), O = (e, t) => {
  const n = getComputedStyle(e), s = t.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return n.getPropertyValue(s);
}, nt = (e) => {
  const t = O(e, we), n = O(e, qe), s = n.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, o = t && t !== "none" ? parseFloat(n) * s : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(o) ? (
    /* istanbul ignore next */
    0
  ) : o;
}, st = (e) => {
  const t = O(e, we), n = O(e, Ze), s = n.includes("ms") ? (
    /* istanbul ignore next */
    1
  ) : 1e3, o = t && t !== "none" ? parseFloat(n) * s : (
    /* istanbul ignore next */
    0
  );
  return Number.isNaN(o) ? (
    /* istanbul ignore next */
    0
  ) : o;
}, Te = (e, t) => {
  let n = 0;
  const s = new Event(te), o = st(e), r = nt(e);
  if (o) {
    const u = (a) => {
      a.target === e && (t.apply(e, [a]), e.removeEventListener(te, u), n = 1);
    };
    e.addEventListener(te, u), setTimeout(() => {
      n || b(e, s);
    }, o + r + 17);
  } else
    t.apply(e, [s]);
}, ve = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, ne = (e) => Object.entries(e), ot = (e) => e.toLowerCase(), it = (e, t, n, s) => {
  const o = { ...n }, r = { ...e.dataset }, u = { ...t }, a = {}, c = "title";
  return ne(r).forEach(([i, l]) => {
    const f = s && typeof i == "string" && i.includes(s) ? i.replace(s, "").replace(/[A-Z]/g, (d) => ot(d)) : i;
    a[f] = ve(l);
  }), ne(o).forEach(([i, l]) => {
    o[i] = ve(l);
  }), ne(t).forEach(([i, l]) => {
    i in o ? u[i] = o[i] : i in a ? u[i] = a[i] : u[i] = i === c ? _e(e, c) : l;
  }), u;
}, rt = (e) => Object.keys(e), J = (e, t) => {
  const n = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return U(t) && tt(n, t), n;
}, at = { passive: !0 }, be = (e) => U(e) && e.constructor.name === "Map" || !1, ct = (e) => typeof e == "number" || !1, y = /* @__PURE__ */ new Map(), k = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   *
   * @param element target element
   * @param callback the callback
   * @param delay the execution delay
   * @param key a unique key
   */
  set: (e, t, n, s) => {
    L(e) && (s && s.length ? (y.has(e) || y.set(e, /* @__PURE__ */ new Map()), y.get(e).set(s, setTimeout(t, n))) : y.set(e, setTimeout(t, n)));
  },
  /**
   * Returns the timer associated with the target.
   *
   * @param element target element
   * @param key a unique
   * @returns the timer
   */
  get: (e, t) => {
    if (!L(e))
      return null;
    const n = y.get(e);
    return t && n && be(n) ? n.get(t) || /* istanbul ignore next */
    null : ct(n) ? n : null;
  },
  /**
   * Clears the element's timer.
   *
   * @param element target element
   * @param key a unique key
   */
  clear: (e, t) => {
    if (!L(e))
      return;
    const n = y.get(e);
    t && t.length && be(n) ? (clearTimeout(n.get(t)), n.delete(t), n.size === 0 && y.delete(e)) : (clearTimeout(n), y.delete(e));
  }
}, lt = (e) => T(e).documentElement, Ne = (e) => {
  var t;
  return e ? Le(e) ? e.defaultView : $(e) ? (t = e == null ? void 0 : e.ownerDocument) == null ? void 0 : t.defaultView : e : window;
}, ut = (e) => lt(e).dir === "rtl", v = (e, t) => e ? e.closest(t) || // break out of `ShadowRoot`
v(e.getRootNode().host, t) : null, dt = (e, t) => L(e) ? e : ($(t) ? t : T()).querySelector(e), Ce = (e, t) => ($(t) ? t : T()).getElementsByTagName(e), h = (e, t) => (t && $(t) ? t : T()).getElementsByClassName(
  e
), ke = (e, t) => e.matches(t), ft = "3.2.1", E = "navbar", F = "Navbar", X = `[data-function="${E}"]`, Pe = `${X},.${E}`, p = "open", le = "open-position", m = "open-mobile", K = "subnav", Y = `${K}-toggle`, $e = `${E}-toggle`, me = {
  breakpoint: 768,
  toggleSiblings: !0,
  delay: 500
}, Z = J(`show.${E}`), Ae = J(`shown.${E}`), q = J(`hide.${E}`), ae = J(`hidden.${E}`), D = (e) => xe(e, F), gt = (e) => new M(e), B = (e, t) => {
  (t ? z.addListener : z.removeListener)(Ne(e.menu), Qe, e.listenResize, at);
}, _ = (e) => {
  const { options: t, menu: n } = e, [s] = h(Y, n);
  return s && O(s, "display") !== "none" || Ne(n).innerWidth < t.breakpoint;
}, pe = (e, t) => {
  const n = t ? z.addListener : z.removeListener, { items: s, navbarToggle: o, menu: r } = e, u = T(r);
  [...s].forEach((a) => {
    const { lastElementChild: c } = a;
    c && w(c, K) && (n(a, Ve, Me), n(a, He, ce));
    const [i] = h(Y, a);
    i && n(i, de, he);
  }), n(u, Ie, bt), n(u, Ke, mt), o && n(o, de, he);
}, P = (e, t) => [...e.children].find((n) => ke(n, t)), vt = (e) => {
  const t = P(e, `.${K}`), n = P(e, "A");
  if (n && (b(n, Z), Z.defaultPrevented))
    return;
  re(e, le), re(e, p);
  const { parentElement: s } = e;
  if (s) {
    const r = h(p, s);
    R([...r].filter((u) => u !== e));
  }
  t && Te(t, () => {
    k.clear(e, "in"), n && (b(n, Ae), C(n, N, "true"));
  });
}, Se = (e, t) => {
  const n = P(e, `.${K}`), s = P(e, "A"), o = P(e, Y);
  if (!([p, m].some((r) => w(e, r)) && s && (b(s, q), q.defaultPrevented))) {
    if (w(e, p)) {
      const r = () => {
        H(e, le), k.clear(e, "out"), s && (b(s, ae), C(s, N, "false"));
      };
      H(e, p), t && n ? Te(n, r) : r();
    }
    w(e, m) && (H(e, m), [o, s].forEach((r) => {
      r && C(r, N, "false");
    }), s && b(s, ae));
  }
}, R = (e) => {
  [...e].forEach((t) => Se(t));
}, bt = (e) => {
  const { code: t, target: n } = e;
  (L(n) ? v(n, Pe) : null) && [se, oe, ie].includes(t) && e.preventDefault();
};
function mt(e) {
  const { code: t } = e, { activeElement: n } = T(this), s = n && v(n, "nav"), o = s && D(s);
  if (!o || !n || this && !this.contains(n))
    return;
  const r = v(n, "LI");
  if (!r)
    return;
  const u = _(o), { previousElementSibling: a, nextElementSibling: c } = r, i = v(r, `.${p}`), l = v(r, "UL"), [f] = h(K, r), d = [ie, se, x, ee, oe], g = l && O(l, "flex-direction") === "column", V = ut(r), ze = V ? (
    /* istanbul ignore next */
    ee
  ) : x, Oe = V ? (
    /* istanbul ignore next */
    x
  ) : ee, De = l && a && (t === oe && g || t === ze && !g), Re = l && c && (t === se && g || t === Oe && !g);
  let j = null;
  if (t === We && i ? (ce.call(i), j = i) : !u && f && t === ie && (w(r, p) ? ce.call(r) : Me.call(r)), De && r !== l.firstElementChild ? j = a : Re && r !== l.lastElementChild && (j = c), j) {
    const { firstElementChild: ue } = j;
    ue && ue.focus();
  }
  !u && d.includes(t) && e.preventDefault();
}
const he = (e) => {
  e.preventDefault();
  const { currentTarget: t, target: n } = e, s = v(t, Pe), o = s && D(s);
  if (!o)
    return;
  const { options: r, navbarToggle: u } = o;
  if (n === t || t.contains(n)) {
    const a = v(t, "LI") || s, c = v(t, `.${$e}`) === u ? u : P(a, `.${Y}`), i = c === u ? null : P(a, "A"), l = h(m, a);
    if (w(a, m)) {
      if (i && (b(i, q), q.defaultPrevented))
        return;
      R(l), H(a, m), c && (C(c, N, "false"), c === u && B(o)), i && (C(i, N, "false"), b(i, ae));
    } else {
      if (i && (b(i, Z), Z.defaultPrevented))
        return;
      if (c === u)
        B(o, !0);
      else {
        const f = r.toggleSiblings ? h(m, a.parentElement) : (
          /* istanbul ignore next */
          l
        );
        R(f);
      }
      re(a, m), c && C(c, N, "true"), i && (C(i, N, "true"), b(i, Ae));
    }
  }
};
function Me() {
  const e = v(this, `${X},.${E}`), t = e && D(e), n = k.get(this, "out");
  if (!(!t || _(t)) && (k.clear(this, "out"), !w(this, p) && !n)) {
    const s = () => vt(this);
    k.set(this, s, 17, "in");
  }
}
function ce() {
  const e = v(this, `${X},.${E}`), t = e && D(e);
  if (!(!t || _(t)) && w(this, p)) {
    k.clear(this, "in");
    const n = () => {
      R(h(le, this)), Se(this, !0);
    };
    k.set(this, n, t.options.delay, "out");
  }
}
class M {
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
    A(this, "listenResize", () => {
      _(this) || (R(h(m, T(this.menu))), B(this));
    });
    const s = dt(t);
    if (!s)
      throw new TypeError(`${F} cannot initialize the specified target.`);
    const [o] = h($e, s), r = D(s);
    r && r.dispose(), this.menu = s, this.options = it(s, me, n || {}), this.items = Ce("LI", s), this.navbarToggle = o, pe(this, !0), I.set(s, F, this);
  }
  get defaults() {
    return me;
  }
  get name() {
    return F;
  }
  /**
   * Destroy Navbar instance.
   */
  dispose() {
    R(this.items), pe(this), B(this), I.remove(this.menu, F), rt(this).forEach((t) => {
      delete this[t];
    });
  }
}
A(M, "selector", X), A(M, "init", gt), A(M, "getInstance", D), A(M, "version", ft);
const Ee = (e) => {
  const { selector: t, init: n } = M;
  [...Ce("*", T(e))].filter((o) => ke(o, t)).forEach(n);
};
document.body ? Ee() : z.addListener(document, ye, () => Ee(), { once: !0 });
export {
  M as default
};
//# sourceMappingURL=navbar.mjs.map
