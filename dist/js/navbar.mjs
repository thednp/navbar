var Oe = Object.defineProperty;
var Pe = (e, n, t) => n in e ? Oe(e, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[n] = t;
var $ = (e, n, t) => Pe(e, typeof n != "symbol" ? n + "" : n, t);
const M = {}, ve = (e) => {
  const { type: n, currentTarget: t } = e;
  M[n].forEach((s, i) => {
    t === i && s.forEach((o, a) => {
      a.apply(i, [e]), typeof o == "object" && o.once && pe(i, n, a, o);
    });
  });
}, he = (e, n, t, s) => {
  M[n] || (M[n] = /* @__PURE__ */ new Map());
  const i = M[n];
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
  const i = M[n], o = i && i.get(e), a = o && o.get(t), l = a !== void 0 ? a : s;
  o && o.has(t) && o.delete(t), i && (!o || !o.size) && i.delete(e), (!i || !i.size) && delete M[n], (!o || !o.size) && e.removeEventListener(
    n,
    ve,
    l
  );
}, y = "aria-expanded", De = "DOMContentLoaded", Re = "keydown", Fe = "keyup", ae = "click", je = "mouseenter", He = "mouseleave", _ = "ArrowDown", Y = "ArrowUp", G = "ArrowLeft", J = "ArrowRight", Ie = "Escape", ee = "Space", We = "transitionDuration", Ke = "transitionDelay", Q = "transitionend", be = "transitionProperty", Ue = (e, n) => e.getAttribute(n), N = (e, n, t) => e.setAttribute(n, t), ne = (e, ...n) => {
  e.classList.add(...n);
}, I = (e, ...n) => {
  e.classList.remove(...n);
}, E = (e, n) => e.classList.contains(n), V = (e) => e != null && typeof e == "object" || !1, O = (e) => V(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some(
  (n) => e.nodeType === n
) || !1, g = (e) => O(e) && e.nodeType === 1 || !1, A = /* @__PURE__ */ new Map(), F = {
  data: A,
  set: (e, n, t) => {
    g(e) && (A.has(n) || A.set(n, /* @__PURE__ */ new Map()), A.get(n).set(e, t));
  },
  getAllFor: (e) => A.get(e) || null,
  get: (e, n) => {
    if (!g(e) || !n) return null;
    const t = F.getAllFor(n);
    return e && t && t.get(e) || null;
  },
  remove: (e, n) => {
    const t = F.getAllFor(n);
    !t || !g(e) || (t.delete(e), t.size === 0 && A.delete(n));
  }
}, Ve = (e, n) => F.get(e, n), Ze = (e) => e == null ? void 0 : e.trim().replace(
  /(?:^\w|[A-Z]|\b\w)/g,
  (n, t) => t === 0 ? n.toLowerCase() : n.toUpperCase()
).replace(/\s+/g, ""), xe = (e) => V(e) && e.constructor.name === "Window" || !1, me = (e) => O(e) && e.nodeType === 9 || !1, w = (e) => me(e) ? e : O(e) ? e.ownerDocument : xe(e) ? e.document : globalThis.document, qe = (e, ...n) => Object.assign(e, ...n), d = (e, n) => e.dispatchEvent(n), S = (e, n, t) => {
  const s = getComputedStyle(e, t), i = n.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
  return s.getPropertyValue(i);
}, Be = (e) => {
  const n = S(e, be), t = S(e, Ke), s = t.includes("ms") ? 1 : 1e3, i = n && n !== "none" ? parseFloat(t) * s : 0;
  return Number.isNaN(i) ? 0 : i;
}, Ge = (e) => {
  const n = S(e, be), t = S(e, We), s = t.includes("ms") ? 1 : 1e3, i = n && n !== "none" ? parseFloat(t) * s : 0;
  return Number.isNaN(i) ? 0 : i;
}, Ee = (e, n) => {
  let t = 0;
  const s = new Event(Q), i = Ge(e), o = Be(e);
  if (i) {
    const a = (l) => {
      l.target === e && (n.apply(e, [l]), e.removeEventListener(Q, a), t = 1);
    };
    e.addEventListener(Q, a), setTimeout(() => {
      t || d(e, s);
    }, i + o + 17);
  } else
    n.apply(e, [s]);
}, le = (e) => ["true", !0].includes(e) ? !0 : ["false", !1].includes(e) ? !1 : ["null", "", null, void 0].includes(e) ? null : e !== "" && !Number.isNaN(+e) ? +e : e, X = (e) => Object.entries(e), Je = (e, n, t, s) => {
  if (!g(e)) return n;
  const i = { ...t }, o = { ...e.dataset }, a = { ...n }, l = {}, c = "title";
  return X(o).forEach(([r, u]) => {
    const P = Ze(r);
    l[P] = le(u);
  }), X(i).forEach(([r, u]) => {
    i[r] = le(u);
  }), X(n).forEach(([r, u]) => {
    r in i ? a[r] = i[r] : r in l ? a[r] = l[r] : a[r] = r === c ? Ue(e, c) : u;
  }), a;
}, Qe = (e) => Object.keys(e), Z = (e, n) => {
  const t = new CustomEvent(e, {
    cancelable: !0,
    bubbles: !0
  });
  return V(n) && qe(t, n), t;
}, ce = (e) => V(e) && e.constructor.name === "Map" || !1, Xe = (e) => typeof e == "number" || !1, m = /* @__PURE__ */ new Map(), T = {
  set: (e, n, t, s) => {
    g(e) && (s && s.length ? (m.has(e) || m.set(e, /* @__PURE__ */ new Map()), m.get(e).set(s, setTimeout(n, t))) : m.set(e, setTimeout(n, t)));
  },
  get: (e, n) => {
    if (!g(e)) return null;
    const t = m.get(e);
    return n && t && ce(t) ? t.get(n) || null : Xe(t) ? t : null;
  },
  clear: (e, n) => {
    if (!g(e)) return;
    const t = m.get(e);
    n && n.length && ce(t) ? (clearTimeout(t.get(n)), t.delete(n), t.size === 0 && m.delete(e)) : (clearTimeout(t), m.delete(e));
  }
}, _e = (e) => g(e) && "offsetWidth" in e || !1, Ye = (e) => w(e).documentElement, en = (e) => {
  var n;
  return e ? me(e) ? e.defaultView : O(e) ? (n = e == null ? void 0 : e.ownerDocument) == null ? void 0 : n.defaultView : e : window;
}, we = (e, n) => e.matches(n), nn = (e) => Ye(e).dir === "rtl", f = (e, n) => !e || !n ? null : e.closest(n) || f(e.getRootNode().host, n) || null, tn = (e, n) => g(e) ? e : (g(n) ? n : w()).querySelector(e), ye = (e, n) => (O(n) ? n : w()).getElementsByTagName(
  e
), p = (e, n) => (n && O(n) ? n : w()).getElementsByClassName(
  e
), sn = "3.3.1", b = "navbar", R = "Navbar", x = `[data-function="${b}"]`, Ne = `${x},.${b}`, h = "open", oe = "open-position", v = "open-mobile", j = "subnav", q = `${j}-toggle`, Te = `${b}-toggle`, ue = {
  breakpoint: 768,
  toggleSiblings: !0,
  delay: 500
}, W = Z(`show.${b}`), Ce = Z(`shown.${b}`), K = Z(`hide.${b}`), te = Z(`hidden.${b}`), k = (e) => Ve(e, R), on = (e) => new L(e), U = ({ menu: e, _observer: n }, t) => {
  t ? n.observe(e) : n.disconnect();
}, B = (e) => {
  const { options: n, menu: t } = e, [s] = p(q, t);
  return s && S(s, "display") !== "none" || en(t).innerWidth < n.breakpoint;
}, fe = (e, n) => {
  const t = n ? he : pe, { items: s, navbarToggle: i, menu: o } = e, a = w(o);
  Array.from(s).forEach((l) => {
    const { lastElementChild: c } = l;
    c && E(c, j) && (t(l, je, Ae), t(l, He, se));
    const [r] = p(q, l);
    r && t(
      r,
      ae,
      de
    );
  }), t(a, Re, an), t(a, Fe, ln), i && t(i, ae, de);
}, C = (e, n) => Array.from(e.children).find(
  (t) => we(t, n)
), rn = (e) => {
  const n = C(e, `.${j}`), t = C(e, "A");
  if (t && (d(t, W), W.defaultPrevented))
    return;
  ne(e, oe), ne(e, h);
  const { parentElement: s } = e;
  if (s) {
    const o = p(h, s);
    z(Array.from(o).filter((a) => a !== e));
  }
  n && Ee(n, () => {
    T.clear(e, "in"), t && (d(t, Ce), N(t, y, "true"));
  });
}, $e = (e, n) => {
  const t = C(e, `.${j}`), s = C(e, "A"), i = C(e, q);
  if (!([h, v].some((o) => E(e, o)) && s && (d(s, K), K.defaultPrevented))) {
    if (E(e, h)) {
      const o = () => {
        I(e, oe), T.clear(e, "out"), s && (d(s, te), N(s, y, "false"));
      };
      I(e, h), n && t ? Ee(t, o) : o();
    }
    E(e, v) && (I(e, v), [i, s].forEach((o) => {
      o && N(o, y, "false");
    }), s && d(s, te));
  }
}, z = (e) => {
  Array.from(e).forEach((n) => $e(n));
}, an = (e) => {
  const { code: n, target: t } = e;
  (_e(t) ? f(t, Ne) : null) && [_, Y, ee].includes(n) && e.preventDefault();
};
function ln(e) {
  const { code: n } = e, { activeElement: t } = w(this), s = t && f(t, "nav"), i = s && k(s);
  if (!i || !t || this && !this.contains(t))
    return;
  const o = f(t, "LI");
  if (!o) return;
  const a = B(i), { previousElementSibling: l, nextElementSibling: c } = o, r = f(o, `.${h}`), u = f(o, "UL"), [P] = p(j, o), Le = [
    ee,
    _,
    G,
    J,
    Y
  ], H = u && S(u, "flex-direction") === "column", ie = nn(o), Me = ie ? J : G, Se = ie ? G : J, ke = u && l && (n === Y && H || n === Me && !H), ze = u && c && (n === _ && H || n === Se && !H);
  let D = null;
  if (n === Ie && r ? (se.call(r), D = r) : !a && P && n === ee && (E(o, h) ? se.call(o) : Ae.call(o)), ke && o !== u.firstElementChild ? D = l : ze && o !== u.lastElementChild && (D = c), D) {
    const { firstElementChild: re } = D;
    re && re.focus();
  }
  !a && Le.includes(n) && e.preventDefault();
}
const de = (e) => {
  e.preventDefault();
  const { currentTarget: n, target: t } = e, s = f(n, Ne), i = s && k(s);
  if (!i) return;
  const { options: o, navbarToggle: a } = i;
  if (t !== n && !(n != null && n.contains(t))) return;
  const l = f(n, "LI") || s, c = f(n, `.${Te}`) === a ? a : C(l, `.${q}`), r = c === a ? null : C(l, "A"), u = p(v, l);
  if (E(l, v)) {
    if (r && (d(r, K), K.defaultPrevented))
      return;
    z(u), I(l, v), c && (N(c, y, "false"), c === a && U(i)), r && (N(r, y, "false"), d(r, te));
  } else {
    if (r && (d(r, W), W.defaultPrevented))
      return;
    if (c === a)
      U(i, !0);
    else {
      const P = o.toggleSiblings ? p(
        v,
        l.parentElement
      ) : u;
      z(P);
    }
    ne(l, v), c && N(c, y, "true"), r && (N(r, y, "true"), d(r, Ce));
  }
};
function Ae() {
  const e = f(this, `${x},.${b}`), n = e && k(e), t = T.get(this, "out");
  if (!(!n || B(n)) && (T.clear(this, "out"), !E(this, h) && !t)) {
    const s = () => rn(this);
    T.set(this, s, 17, "in");
  }
}
function se() {
  const e = f(this, `${x},.${b}`), n = e && k(e);
  if (!(!n || B(n)) && E(this, h)) {
    T.clear(this, "in");
    const t = () => {
      z(p(oe, this)), $e(this, !0);
    };
    T.set(this, t, n.options.delay, "out");
  }
}
class L {
  constructor(n, t) {
    $(this, "listenResize", () => {
      B(this) || (z(
        p(v, w(this.menu))
      ), U(this));
    });
    const s = tn(n);
    if (!s)
      throw new TypeError(
        `${R} cannot initialize the specified target.`
      );
    const [i] = p(
      Te,
      s
    ), o = k(s);
    o && o.dispose(), this.menu = s, this.options = Je(s, ue, t || {}), this.items = ye("LI", s), this.navbarToggle = i, this._observer = new ResizeObserver(this.listenResize), fe(this, !0), F.set(s, R, this);
  }
  get defaults() {
    return ue;
  }
  get name() {
    return R;
  }
  dispose() {
    z(this.items), fe(this), U(this), F.remove(this.menu, R), Qe(this).forEach((n) => {
      delete this[n];
    });
  }
}
$(L, "selector", x), $(L, "init", on), $(L, "getInstance", k), $(L, "version", sn);
const ge = (e) => {
  const { selector: n, init: t } = L;
  [...ye("*", w(e))].filter((i) => we(i, n)).forEach(t);
};
document.body ? ge() : he(document, De, () => ge(), {
  once: !0
});
export {
  L as default
};
//# sourceMappingURL=navbar.mjs.map
