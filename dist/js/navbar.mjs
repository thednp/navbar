var Pe = Object.defineProperty;
var De = (e, n, t) => n in e ? Pe(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var $ = (e, n, t) => De(e, typeof n != "symbol" ? n + "" : n, t);
const S = {}, ve = (e) => {
  const { type: n, currentTarget: t } = e;
  S[n].forEach((s, i) => {
    t === i && s.forEach((o, a) => {
      a.apply(i, [e]), typeof o == "object" && o.once && pe(i, n, a, o);
    });
  });
}, he = (e, n, t, s) => {
  S[n] || (S[n] = /* @__PURE__ */ new Map());
  const i = S[n];
  i.has(e) || i.set(e, /* @__PURE__ */ new Map());
  const o = i.get(
    e
  ), { size: a } = o;
  o.set(t, s), a || e.addEventListener(
    n,
    ve,
    s
  );
}, pe = (e, n, t, s) => {
  const i = S[n], o = i && i.get(e), a = o && o.get(t), c = a !== void 0 ? a : s;
  o && o.has(t) && o.delete(t), i && (!o || !o.size) && i.delete(e), (!i || !i.size) && delete S[n], (!o || !o.size) && e.removeEventListener(
    n,
    ve,
    c
  );
}, y = "aria-expanded", Oe = "DOMContentLoaded", Re = "keydown", je = "keyup", ae = "click", Fe = "mouseenter", He = "mouseleave", Q = "ArrowDown", Y = "ArrowUp", Z = "ArrowLeft", X = "ArrowRight", Ie = "Escape", ee = "Space", We = "transitionDuration", Ke = "transitionDelay", _ = "transitionend", be = "transitionProperty", Ve = (e, n) => e.getAttribute(n), C = (e, n, t) => e.setAttribute(n, t), ne = (e, ...n) => {
  e.classList.add(...n);
}, I = (e, ...n) => {
  e.classList.remove(...n);
}, E = (e, n) => e.classList.contains(n), q = (e) => e != null && typeof e == "object" || !1, P = (e) => q(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (n) => e.nodeType === n
) || !1, g = (e) => P(e) && e.nodeType === 1 || !1, A = /* @__PURE__ */ new Map(), j = {
  data: A,
  set: (e, n, t) => {
    g(e) && (A.has(n) || A.set(n, /* @__PURE__ */ new Map()), A.get(n).set(e, t));
  },
  getAllFor: (e) => A.get(e) || null,
  get: (e, n) => {
    if (!g(e) || !n) return null;
    const t = j.getAllFor(n);
    return e && t && t.get(e) || null;
  },
  remove: (e, n) => {
    const t = j.getAllFor(n);
    !t || !g(e) || (t.delete(e), t.size === 0 && A.delete(n));
  }
}, qe = (e, n) => j.get(e, n), xe = (e) => e == null ? void 0 : e.trim().replace(
  /(?:^\w|[A-Z]|\b\w)/g,
  (n, t) => t === 0 ? n.toLowerCase() : n.toUpperCase()
).replace(/\s+/g, ""), Be = (e) => q(e) && e.constructor.name === "Window" || !1, me = (e) => P(e) && e.nodeType === 9 || !1, w = (e) => me(e) ? e : P(e) ? e.ownerDocument : Be(e) ? e.document : globalThis.document, Ue = (e, ...n) => Object.assign(e, ...n), d = (e, n) => e.dispatchEvent(n), M = (e, n, t) => {
  const s = getComputedStyle(e, t), i = n.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return s.getPropertyValue(i);
}, Ge = (e) => {
  const n = M(e, be), t = M(e, Ke), s = t.includes("ms") ? 1 : 1e3, i = n && n !== "none" ? parseFloat(t) * s : 0;
  return Number.isNaN(i) ? 0 : i;
}, Ze = (e) => {
  const n = M(e, be), t = M(e, We), s = t.includes("ms") ? 1 : 1e3, i = n && n !== "none" ? parseFloat(t) * s : 0;
  return Number.isNaN(i) ? 0 : i;
}, Ee = (e, n) => {
  let t = 0;
  const s = new Event(_), i = Ze(e), o = Ge(e);
  if (i) {
    const a = (c) => {
      c.target === e && (n.apply(e, [c]), e.removeEventListener(_, a), t = 1);
    };
    e.addEventListener(_, a), setTimeout(() => {
      t || d(e, s);
    }, i + o + 17);
  } else
    n.apply(e, [s]);
}, ce = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, J = (e) => Object.entries(e), Xe = (e, n, t, s) => {
  if (!g(e)) return n;
  const i = { ...t }, o = { ...e.dataset }, a = { ...n }, c = {}, l = "title";
  return J(o).forEach(([r, u]) => {
    const D = xe(r);
    c[D] = ce(u);
  }), J(i).forEach(([r, u]) => {
    i[r] = ce(u);
  }), J(n).forEach(([r, u]) => {
    r in i ? a[r] = i[r] : r in c ? a[r] = c[r] : a[r] = r === l ? Ve(e, l) : u;
  }), a;
}, _e = (e) => Object.keys(e), x = (e, n) => {
  const t = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return q(n) && Ue(t, n), t;
}, le = (e) => q(e) && e.constructor.name === "Map" || !1, Je = (e) => typeof e == "number" || !1, m = /* @__PURE__ */ new Map(), N = {
  set: (e, n, t, s) => {
    g(e) && (s && s.length ? (m.has(e) || m.set(e, /* @__PURE__ */ new Map()), m.get(e).set(s, setTimeout(n, t))) : m.set(e, setTimeout(n, t)));
  },
  get: (e, n) => {
    if (!g(e)) return null;
    const t = m.get(e);
    return n && t && le(t) ? t.get(n) || null : Je(t) ? t : null;
  },
  clear: (e, n) => {
    if (!g(e)) return;
    const t = m.get(e);
    n && n.length && le(t) ? (clearTimeout(t.get(n)), t.delete(n), t.size === 0 && m.delete(e)) : (clearTimeout(t), m.delete(e));
  }
}, Qe = (e) => g(e) && "offsetWidth" in e || !1, Ye = (e) => w(e).documentElement, en = (e) => {
  var n;
  return e ? me(e) ? e.defaultView : P(e) ? (n = e == null ? void 0 : e.ownerDocument) == null ? void 0 : n.defaultView : e : window;
}, we = (e, n) => e.matches(n), nn = (e) => Ye(e).dir === "rtl", f = (e, n) => !e || !n ? null : e.closest(n) || f(e.getRootNode().host, n) || null, tn = (e, n) => g(e) ? e : (g(n) ? n : w()).querySelector(e), ye = (e, n) => (P(n) ? n : w()).getElementsByTagName(
  e
), p = (e, n) => (n && P(n) ? n : w()).getElementsByClassName(
  e
), sn = "3.3.0", b = "navbar", R = "Navbar", B = `[data-function="${b}"]`, Ce = `${B},.${b}`, h = "open", oe = "open-position", v = "open-mobile", F = "subnav", U = `${F}-toggle`, Ne = `${b}-toggle`, ue = {
  breakpoint: 768,
  toggleSiblings: !0,
  delay: 500
}, W = x(`show.${b}`), Te = x(`shown.${b}`), K = x(`hide.${b}`), te = x(`hidden.${b}`), k = (e) => qe(e, R), on = (e) => new L(e), V = ({ menu: e, _observer: n }, t) => {
  t ? n.observe(e) : n.disconnect();
}, G = (e) => {
  const { options: n, menu: t } = e, [s] = p(U, t);
  return s && M(s, "display") !== "none" || en(t).innerWidth < n.breakpoint;
}, fe = (e, n) => {
  const t = n ? he : pe, { items: s, navbarToggle: i, menu: o } = e, a = w(o);
  Array.from(s).forEach((c) => {
    const { lastElementChild: l } = c;
    l && E(l, F) && (t(c, Fe, Ae), t(c, He, se));
    const [r] = p(U, c);
    r && t(
      r,
      ae,
      de
    );
  }), t(a, Re, an), t(a, je, cn), i && t(i, ae, de);
}, T = (e, n) => Array.from(e.children).find(
  (t) => we(t, n)
), rn = (e) => {
  const n = T(e, `.${F}`), t = T(e, "A");
  if (t && (d(t, W), W.defaultPrevented))
    return;
  ne(e, oe), ne(e, h);
  const { parentElement: s } = e;
  if (s) {
    const o = p(h, s);
    z(Array.from(o).filter((a) => a !== e));
  }
  n && Ee(n, () => {
    N.clear(e, "in"), t && (d(t, Te), C(t, y, "true"));
  });
}, $e = (e, n) => {
  const t = T(e, `.${F}`), s = T(e, "A"), i = T(e, U);
  if (!([h, v].some((o) => E(e, o)) && s && (d(s, K), K.defaultPrevented))) {
    if (E(e, h)) {
      const o = () => {
        I(e, oe), N.clear(e, "out"), s && (d(s, te), C(s, y, "false"));
      };
      I(e, h), n && t ? Ee(t, o) : o();
    }
    E(e, v) && (I(e, v), [i, s].forEach((o) => {
      o && C(o, y, "false");
    }), s && d(s, te));
  }
}, z = (e) => {
  Array.from(e).forEach((n) => $e(n));
}, an = (e) => {
  const { code: n, target: t } = e;
  (Qe(t) ? f(t, Ce) : null) && [Q, Y, ee].includes(n) && e.preventDefault();
};
function cn(e) {
  const { code: n } = e, { activeElement: t } = w(this), s = t && f(t, "nav"), i = s && k(s);
  if (!i || !t || this && !this.contains(t))
    return;
  const o = f(t, "LI");
  if (!o) return;
  const a = G(i), { previousElementSibling: c, nextElementSibling: l } = o, r = f(o, `.${h}`), u = f(o, "UL"), [D] = p(F, o), Le = [
    ee,
    Q,
    Z,
    X,
    Y
  ], H = u && M(u, "flex-direction") === "column", ie = nn(o), Se = ie ? X : Z, Me = ie ? Z : X, ke = u && c && (n === Y && H || n === Se && !H), ze = u && l && (n === Q && H || n === Me && !H);
  let O = null;
  if (n === Ie && r ? (se.call(r), O = r) : !a && D && n === ee && (E(o, h) ? se.call(o) : Ae.call(o)), ke && o !== u.firstElementChild ? O = c : ze && o !== u.lastElementChild && (O = l), O) {
    const { firstElementChild: re } = O;
    re && re.focus();
  }
  !a && Le.includes(n) && e.preventDefault();
}
const de = (e) => {
  e.preventDefault();
  const { currentTarget: n, target: t } = e, s = f(n, Ce), i = s && k(s);
  if (!i) return;
  const { options: o, navbarToggle: a } = i;
  if (t !== n && !(n != null && n.contains(t))) return;
  const c = f(n, "LI") || s, l = f(n, `.${Ne}`) === a ? a : T(c, `.${U}`), r = l === a ? null : T(c, "A"), u = p(v, c);
  if (E(c, v)) {
    if (r && (d(r, K), K.defaultPrevented))
      return;
    z(u), I(c, v), l && (C(l, y, "false"), l === a && V(i)), r && (C(r, y, "false"), d(r, te));
  } else {
    if (r && (d(r, W), W.defaultPrevented))
      return;
    if (l === a)
      V(i, !0);
    else {
      const D = o.toggleSiblings ? p(
        v,
        c.parentElement
      ) : u;
      z(D);
    }
    ne(c, v), l && C(l, y, "true"), r && (C(r, y, "true"), d(r, Te));
  }
};
function Ae() {
  const e = f(this, `${B},.${b}`), n = e && k(e), t = N.get(this, "out");
  if (!(!n || G(n)) && (N.clear(this, "out"), !E(this, h) && !t)) {
    const s = () => rn(this);
    N.set(this, s, 17, "in");
  }
}
function se() {
  const e = f(this, `${B},.${b}`), n = e && k(e);
  if (!(!n || G(n)) && E(this, h)) {
    N.clear(this, "in");
    const t = () => {
      z(p(oe, this)), $e(this, !0);
    };
    N.set(this, t, n.options.delay, "out");
  }
}
class L {
  constructor(n, t) {
    $(this, "listenResize", () => {
      G(this) || (z(
        p(v, w(this.menu))
      ), V(this));
    });
    const s = tn(n);
    if (!s)
      throw new TypeError(
        `${R} cannot initialize the specified target.`
      );
    const [i] = p(
      Ne,
      s
    ), o = k(s);
    o && o.dispose(), this.menu = s, this.options = Xe(s, ue, t || {}), this.items = ye("LI", s), this.navbarToggle = i, this._observer = new ResizeObserver(this.listenResize), fe(this, !0), j.set(s, R, this);
  }
  get defaults() {
    return ue;
  }
  get name() {
    return R;
  }
  dispose() {
    z(this.items), fe(this), V(this), j.remove(this.menu, R), _e(this).forEach((n) => {
      delete this[n];
    });
  }
}
$(L, "selector", B), $(L, "init", on), $(L, "getInstance", k), $(L, "version", sn);
const ge = (e) => {
  const { selector: n, init: t } = L;
  [...ye("*", w(e))].filter((i) => we(i, n)).forEach(t);
};
document.body ? ge() : he(document, Oe, () => ge(), {
  once: !0
});
export {
  L as default
};
//# sourceMappingURL=navbar.mjs.map
