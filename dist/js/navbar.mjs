var ci = Object.defineProperty;
var ri = (e, o, c) => o in e ? ci(e, o, { enumerable: !0, configurable: !0, writable: !0, value: c }) : e[o] = c;
var V = (e, o, c) => (ri(e, typeof o != "symbol" ? o + "" : o, c), c);
var U = {};
(function(e) {
  Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
  const o = {}, c = (d) => {
    const { type: m, currentTarget: v } = d;
    [...o[m]].forEach(([f, b]) => {
      v === f && [...b].forEach(([h, C]) => {
        h.apply(f, [d]), typeof C == "object" && C.once && g(f, m, h, C);
      });
    });
  }, l = (d, m, v, f) => {
    o[m] || (o[m] = /* @__PURE__ */ new Map());
    const b = o[m];
    b.has(d) || b.set(d, /* @__PURE__ */ new Map());
    const h = b.get(d), { size: C } = h;
    h.set(v, f), C || d.addEventListener(m, c, f);
  }, g = (d, m, v, f) => {
    const b = o[m], h = b && b.get(d), C = h && h.get(v), $ = C !== void 0 ? C : f;
    h && h.has(v) && h.delete(v), b && (!h || !h.size) && b.delete(d), (!b || !b.size) && delete o[m], (!h || !h.size) && d.removeEventListener(m, c, $);
  }, u = l, A = g;
  e.addListener = l, e.globalListener = c, e.off = A, e.on = u, e.registry = o, e.removeListener = g;
})(U);
var a = {};
(function(e) {
  Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
  const o = "aria-checked", c = "aria-description", l = "aria-describedby", g = "aria-expanded", u = "aria-haspopup", A = "aria-hidden", d = "aria-label", m = "aria-labelledby", v = "aria-modal", f = "aria-pressed", b = "aria-selected", h = "aria-valuemin", C = "aria-valuemax", $ = "aria-valuenow", fe = "aria-valuetext", ne = "abort", ae = "beforeunload", ie = "blur", I = "change", q = "contextmenu", he = "DOMContentLoaded", Me = "DOMMouseScroll", Oe = "error", ze = "focus", Ie = "focusin", Be = "focusout", Pe = "gesturechange", He = "gestureend", Re = "gesturestart", $e = "keydown", Fe = "keypress", We = "keyup", Ve = "load", je = "click", Ue = "dblclick", Qe = "mousedown", Ke = "mouseup", qe = "hover", Ge = "mouseenter", Je = "mouseleave", Ze = "mousein", Xe = "mouseout", Ye = "mouseover", _e = "mousemove", pe = "mousewheel", xe = "move", et = "orientationchange", tt = "pointercancel", nt = "pointerdown", at = "pointerleave", it = "pointermove", ot = "pointerup", st = "readystatechange", ct = "reset", rt = "resize", lt = "select", ut = "selectend", dt = "selectstart", mt = "scroll", vt = "submit", gt = "touchstart", Et = "touchmove", ft = "touchcancel", ht = "touchend", bt = "unload", on = { DOMContentLoaded: he, DOMMouseScroll: Me, abort: ne, beforeunload: ae, blur: ie, change: I, click: je, contextmenu: q, dblclick: Ue, error: Oe, focus: ze, focusin: Ie, focusout: Be, gesturechange: Pe, gestureend: He, gesturestart: Re, hover: qe, keydown: $e, keypress: Fe, keyup: We, load: Ve, mousedown: Qe, mousemove: _e, mousein: Ze, mouseout: Xe, mouseenter: Ge, mouseleave: Je, mouseover: Ye, mouseup: Ke, mousewheel: pe, move: xe, orientationchange: et, pointercancel: tt, pointerdown: nt, pointerleave: at, pointermove: it, pointerup: ot, readystatechange: st, reset: ct, resize: rt, scroll: mt, select: lt, selectend: ut, selectstart: dt, submit: vt, touchcancel: ft, touchend: ht, touchmove: Et, touchstart: gt, unload: bt }, sn = "drag", cn = "dragstart", rn = "dragenter", ln = "dragleave", un = "dragover", dn = "dragend", mn = "loadstart", vn = { start: "mousedown", end: "mouseup", move: "mousemove", cancel: "mouseleave" }, gn = { down: "mousedown", up: "mouseup" }, En = "onmouseleave" in document ? ["mouseenter", "mouseleave"] : ["mouseover", "mouseout"], fn = { start: "touchstart", end: "touchend", move: "touchmove", cancel: "touchcancel" }, hn = { in: "focusin", out: "focusout" }, bn = { Backspace: "Backspace", Tab: "Tab", Enter: "Enter", Shift: "Shift", Control: "Control", Alt: "Alt", Pause: "Pause", CapsLock: "CapsLock", Escape: "Escape", Scape: "Space", ArrowLeft: "ArrowLeft", ArrowUp: "ArrowUp", ArrowRight: "ArrowRight", ArrowDown: "ArrowDown", Insert: "Insert", Delete: "Delete", Meta: "Meta", ContextMenu: "ContextMenu", ScrollLock: "ScrollLock" }, yn = "Alt", wn = "ArrowDown", An = "ArrowUp", kn = "ArrowLeft", Cn = "ArrowRight", Nn = "Backspace", Tn = "CapsLock", Sn = "Control", Ln = "Delete", Dn = "Enter", Mn = "Escape", On = "Insert", zn = "Meta", In = "Pause", Bn = "ScrollLock", Pn = "Shift", Hn = "Space", Rn = "Tab", yt = "animationDuration", wt = "animationDelay", be = "animationName", oe = "animationend", At = "transitionDuration", kt = "transitionDelay", se = "transitionend", ye = "transitionProperty", $n = "addEventListener", Fn = "removeEventListener", Wn = { linear: "linear", easingSinusoidalIn: "cubic-bezier(0.47,0,0.745,0.715)", easingSinusoidalOut: "cubic-bezier(0.39,0.575,0.565,1)", easingSinusoidalInOut: "cubic-bezier(0.445,0.05,0.55,0.95)", easingQuadraticIn: "cubic-bezier(0.550,0.085,0.680,0.530)", easingQuadraticOut: "cubic-bezier(0.250,0.460,0.450,0.940)", easingQuadraticInOut: "cubic-bezier(0.455,0.030,0.515,0.955)", easingCubicIn: "cubic-bezier(0.55,0.055,0.675,0.19)", easingCubicOut: "cubic-bezier(0.215,0.61,0.355,1)", easingCubicInOut: "cubic-bezier(0.645,0.045,0.355,1)", easingQuarticIn: "cubic-bezier(0.895,0.03,0.685,0.22)", easingQuarticOut: "cubic-bezier(0.165,0.84,0.44,1)", easingQuarticInOut: "cubic-bezier(0.77,0,0.175,1)", easingQuinticIn: "cubic-bezier(0.755,0.05,0.855,0.06)", easingQuinticOut: "cubic-bezier(0.23,1,0.32,1)", easingQuinticInOut: "cubic-bezier(0.86,0,0.07,1)", easingExponentialIn: "cubic-bezier(0.95,0.05,0.795,0.035)", easingExponentialOut: "cubic-bezier(0.19,1,0.22,1)", easingExponentialInOut: "cubic-bezier(1,0,0,1)", easingCircularIn: "cubic-bezier(0.6,0.04,0.98,0.335)", easingCircularOut: "cubic-bezier(0.075,0.82,0.165,1)", easingCircularInOut: "cubic-bezier(0.785,0.135,0.15,0.86)", easingBackIn: "cubic-bezier(0.6,-0.28,0.735,0.045)", easingBackOut: "cubic-bezier(0.175,0.885,0.32,1.275)", easingBackInOut: "cubic-bezier(0.68,-0.55,0.265,1.55)" }, Vn = "offsetHeight", jn = "offsetWidth", Un = "scrollHeight", Qn = "scrollWidth", Kn = "tabindex", qn = navigator.userAgentData, G = qn, { userAgent: Gn } = navigator, J = Gn, Ct = /iPhone|iPad|iPod|Android/i;
  let we = !1;
  G ? we = G.brands.some((t) => Ct.test(t.brand)) : we = Ct.test(J);
  const Jn = we, Nt = /(iPhone|iPod|iPad)/, Zn = G ? G.brands.some((t) => Nt.test(t.brand)) : Nt.test(J), Xn = J ? J.includes("Firefox") : !1, { head: Z } = document, Yn = ["webkitPerspective", "perspective"].some((t) => t in Z.style), Tt = (t, n, i, s) => {
    const r = s || !1;
    t.addEventListener(n, i, r);
  }, St = (t, n, i, s) => {
    const r = s || !1;
    t.removeEventListener(n, i, r);
  }, Lt = (t, n, i, s) => {
    const r = (w) => {
      (w.target === t || w.currentTarget === t) && (i.apply(t, [w]), St(t, n, r, s));
    };
    Tt(t, n, r, s);
  }, Dt = () => {
  }, _n = (() => {
    let t = !1;
    try {
      const n = Object.defineProperty({}, "passive", { get: () => (t = !0, t) });
      Lt(document, he, Dt, n);
    } catch {
    }
    return t;
  })(), pn = ["webkitTransform", "transform"].some((t) => t in Z.style), xn = "ontouchstart" in window || "msMaxTouchPoints" in navigator, ea = ["webkitAnimation", "animation"].some((t) => t in Z.style), ta = ["webkitTransition", "transition"].some((t) => t in Z.style), Mt = (t, n) => t.getAttribute(n), na = (t, n, i) => n.getAttributeNS(t, i), aa = (t, n) => t.hasAttribute(n), ia = (t, n, i) => n.hasAttributeNS(t, i), oa = (t, n, i) => t.setAttribute(n, i), sa = (t, n, i, s) => n.setAttributeNS(t, i, s), ca = (t, n) => t.removeAttribute(n), ra = (t, n, i) => n.removeAttributeNS(t, i), la = (t, ...n) => {
    t.classList.add(...n);
  }, ua = (t, ...n) => {
    t.classList.remove(...n);
  }, da = (t, n) => t.classList.contains(n), { body: ma } = document, { documentElement: va } = document, ga = (t) => Array.from(t), L = (t) => t != null && typeof t == "object" || !1, y = (t) => L(t) && typeof t.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((n) => t.nodeType === n) || !1, N = (t) => y(t) && t.nodeType === 1 || !1, X = /* @__PURE__ */ new Map(), ce = { set: (t, n, i) => {
    N(t) && (X.has(n) || X.set(n, /* @__PURE__ */ new Map()), X.get(n).set(t, i));
  }, getAllFor: (t) => X.get(t) || null, get: (t, n) => {
    if (!N(t) || !n)
      return null;
    const i = ce.getAllFor(n);
    return t && i && i.get(t) || null;
  }, remove: (t, n) => {
    const i = ce.getAllFor(n);
    !i || !N(t) || (i.delete(t), i.size === 0 && X.delete(n));
  } }, Ea = (t, n) => ce.get(t, n), Y = (t) => typeof t == "string" || !1, Ae = (t) => L(t) && t.constructor.name === "Window" || !1, ke = (t) => y(t) && t.nodeType === 9 || !1, S = (t) => Ae(t) ? t.document : ke(t) ? t : y(t) ? t.ownerDocument : window.document, _ = (t, ...n) => Object.assign(t, ...n), Ot = (t) => {
    if (!t)
      return;
    if (Y(t))
      return S().createElement(t);
    const { tagName: n } = t, i = Ot(n);
    if (!i)
      return;
    const s = { ...t };
    return delete s.tagName, _(i, s);
  }, zt = (t, n) => {
    if (!t || !n)
      return;
    if (Y(n))
      return S().createElementNS(t, n);
    const { tagName: i } = n, s = zt(t, i);
    if (!s)
      return;
    const r = { ...n };
    return delete r.tagName, _(s, r);
  }, Ce = (t, n) => t.dispatchEvent(n), fa = (t, n, i) => i.indexOf(t) === n, D = (t, n) => {
    const i = getComputedStyle(t), s = n.replace("webkit", "Webkit").replace(/([A-Z])/g, "-$1").toLowerCase();
    return i.getPropertyValue(s);
  }, It = (t) => {
    const n = D(t, be), i = D(t, wt), s = i.includes("ms") ? 1 : 1e3, r = n && n !== "none" ? parseFloat(i) * s : 0;
    return Number.isNaN(r) ? 0 : r;
  }, Bt = (t) => {
    const n = D(t, be), i = D(t, yt), s = i.includes("ms") ? 1 : 1e3, r = n && n !== "none" ? parseFloat(i) * s : 0;
    return Number.isNaN(r) ? 0 : r;
  }, ha = (t, n) => {
    let i = 0;
    const s = new Event(oe), r = Bt(t), w = It(t);
    if (r) {
      const k = (T) => {
        T.target === t && (n.apply(t, [T]), t.removeEventListener(oe, k), i = 1);
      };
      t.addEventListener(oe, k), setTimeout(() => {
        i || Ce(t, s);
      }, r + w + 17);
    } else
      n.apply(t, [s]);
  }, Pt = (t) => {
    const n = D(t, ye), i = D(t, kt), s = i.includes("ms") ? 1 : 1e3, r = n && n !== "none" ? parseFloat(i) * s : 0;
    return Number.isNaN(r) ? 0 : r;
  }, Ht = (t) => {
    const n = D(t, ye), i = D(t, At), s = i.includes("ms") ? 1 : 1e3, r = n && n !== "none" ? parseFloat(i) * s : 0;
    return Number.isNaN(r) ? 0 : r;
  }, ba = (t, n) => {
    let i = 0;
    const s = new Event(se), r = Ht(t), w = Pt(t);
    if (r) {
      const k = (T) => {
        T.target === t && (n.apply(t, [T]), t.removeEventListener(se, k), i = 1);
      };
      t.addEventListener(se, k), setTimeout(() => {
        i || Ce(t, s);
      }, r + w + 17);
    } else
      n.apply(t, [s]);
  }, ya = (t) => Float32Array.from(Array.from(t)), wa = (t) => Float64Array.from(Array.from(t)), Aa = (t, n) => t.focus(n), Ne = (t) => ["true", !0].includes(t) ? !0 : ["false", !1].includes(t) ? !1 : ["null", "", null, void 0].includes(t) ? null : t !== "" && !Number.isNaN(+t) ? +t : t, p = (t) => Object.entries(t), Rt = (t) => t.toLowerCase(), ka = (t, n, i, s) => {
    const r = { ...i }, w = { ...t.dataset }, k = { ...n }, T = {}, P = "title";
    return p(w).forEach(([E, H]) => {
      const le = s && typeof E == "string" && E.includes(s) ? E.replace(s, "").replace(/[A-Z]/g, (si) => Rt(si)) : E;
      T[le] = Ne(H);
    }), p(r).forEach(([E, H]) => {
      r[E] = Ne(H);
    }), p(n).forEach(([E, H]) => {
      E in r ? k[E] = r[E] : E in T ? k[E] = T[E] : k[E] = E === P ? Mt(t, P) : H;
    }), k;
  }, Ca = (t, n) => L(t) && (Object.hasOwn(t, n) || n in t), Na = (t) => Object.keys(t), Ta = (t) => Object.values(t), Sa = (t, n) => {
    const i = new CustomEvent(t, { cancelable: !0, bubbles: !0 });
    return L(n) && _(i, n), i;
  }, La = { passive: !0 }, Da = (t) => t.offsetHeight, Ma = (t, n) => {
    p(n).forEach(([i, s]) => {
      if (s && Y(i) && i.includes("--"))
        t.style.setProperty(i, s);
      else {
        const r = {};
        r[i] = s, _(t.style, r);
      }
    });
  }, re = (t) => L(t) && t.constructor.name === "Map" || !1, $t = (t) => typeof t == "number" || !1, B = /* @__PURE__ */ new Map(), Oa = { set: (t, n, i, s) => {
    N(t) && (s && s.length ? (B.has(t) || B.set(t, /* @__PURE__ */ new Map()), B.get(t).set(s, setTimeout(n, i))) : B.set(t, setTimeout(n, i)));
  }, get: (t, n) => {
    if (!N(t))
      return null;
    const i = B.get(t);
    return n && i && re(i) ? i.get(n) || null : $t(i) ? i : null;
  }, clear: (t, n) => {
    if (!N(t))
      return;
    const i = B.get(t);
    n && n.length && re(i) ? (clearTimeout(i.get(n)), i.delete(n), i.size === 0 && B.delete(t)) : (clearTimeout(i), B.delete(t));
  } }, za = (t) => t.toUpperCase(), F = (t, n) => {
    const { width: i, height: s, top: r, right: w, bottom: k, left: T } = t.getBoundingClientRect();
    let P = 1, E = 1;
    if (n && N(t)) {
      const { offsetWidth: H, offsetHeight: le } = t;
      P = H > 0 ? Math.round(i) / H : 1, E = le > 0 ? Math.round(s) / le : 1;
    }
    return { width: i / P, height: s / E, top: r / E, right: w / P, bottom: k / E, left: T / P, x: T / P, y: r / E };
  }, Ia = (t) => S(t).body, x = (t) => S(t).documentElement, Ba = (t) => S(t).head, Pa = (t) => {
    const n = Ae(t), i = n ? t.scrollX : t.scrollLeft, s = n ? t.scrollY : t.scrollTop;
    return { x: i, y: s };
  }, Ft = (t) => y(t) && t.constructor.name === "ShadowRoot" || !1, Ha = (t) => t.nodeName === "HTML" ? t : N(t) && t.assignedSlot || y(t) && t.parentNode || Ft(t) && t.host || x(t), Wt = (t) => {
    if (!N(t))
      return !1;
    const { width: n, height: i } = F(t), { offsetWidth: s, offsetHeight: r } = t;
    return Math.round(n) !== s || Math.round(i) !== r;
  }, Ra = (t, n, i) => {
    const s = N(n), r = F(t, s && Wt(n)), w = { x: 0, y: 0 };
    if (s) {
      const k = F(n, !0);
      w.x = k.x + n.clientLeft, w.y = k.y + n.clientTop;
    }
    return { x: r.left + i.x - w.x, y: r.top + i.y - w.y, width: r.width, height: r.height };
  };
  let Vt = 0, jt = 0;
  const W = /* @__PURE__ */ new Map(), Ut = (t, n) => {
    let i = n ? Vt : jt;
    if (n) {
      const s = Ut(t), r = W.get(s) || /* @__PURE__ */ new Map();
      W.has(s) || W.set(s, r), re(r) && !r.has(n) ? (r.set(n, i), Vt += 1) : i = r.get(n);
    } else {
      const s = t.id || t;
      W.has(s) ? i = W.get(s) : (W.set(s, i), jt += 1);
    }
    return i;
  }, $a = (t) => {
    var n;
    return t ? ke(t) ? t.defaultView : y(t) ? (n = t == null ? void 0 : t.ownerDocument) == null ? void 0 : n.defaultView : t : window;
  }, Qt = (t) => Array.isArray(t) || !1, Fa = (t) => y(t) && t.nodeName === "CANVAS" || !1, Kt = (t) => N(t) && !!t.shadowRoot || !1, Wa = (t) => y(t) && [1, 2, 3, 4, 5, 6, 7, 8].some((n) => t.nodeType === n) || !1, Va = (t) => {
    if (!y(t))
      return !1;
    const { top: n, bottom: i } = F(t), { clientHeight: s } = x(t);
    return n <= s && i >= 0;
  }, ja = (t) => {
    if (!y(t))
      return !1;
    const { clientWidth: n, clientHeight: i } = x(t), { top: s, left: r, bottom: w, right: k } = F(t, !0);
    return s >= 0 && r >= 0 && w <= i && k <= n;
  }, Ua = (t) => Qt(t) && t.every(N) || !1, Qa = (t) => typeof t == "function" || !1, Ka = (t) => L(t) && t.constructor.name === "HTMLCollection" || !1, qa = (t) => N(t) && t.tagName === "IMG" || !1, Ga = (t) => {
    if (!Y(t))
      return !1;
    try {
      JSON.parse(t);
    } catch {
      return !1;
    }
    return !0;
  }, Ja = (t) => L(t) && t.constructor.name === "WeakMap" || !1, Za = (t) => y(t) && ["SVG", "Image", "Video", "Canvas"].some((n) => t.constructor.name.includes(n)) || !1, Xa = (t) => L(t) && t.constructor.name === "NodeList" || !1, Ya = (t) => x(t).dir === "rtl", _a = (t) => y(t) && t.constructor.name.includes("SVG") || !1, pa = (t) => y(t) && ["TABLE", "TD", "TH"].includes(t.nodeName) || !1, qt = (t, n) => t ? t.closest(n) || qt(t.getRootNode().host, n) : null, xa = (t, n) => N(t) ? t : (y(n) ? n : S()).querySelector(t), Gt = (t, n) => (y(n) ? n : S()).getElementsByTagName(t), ei = (t) => [...Gt("*", t)].filter(Kt), ti = (t, n) => S(n).getElementById(t) || null, ni = (t, n) => (y(n) ? n : S()).querySelectorAll(t), ai = (t, n) => (n && y(n) ? n : S()).getElementsByClassName(t), ii = (t, n) => t.matches(n), oi = "2.0.0alpha12";
  e.ArrayFrom = ga, e.DOMContentLoadedEvent = he, e.DOMMouseScrollEvent = Me, e.Data = ce, e.Float32ArrayFrom = ya, e.Float64ArrayFrom = wa, e.ObjectAssign = _, e.ObjectEntries = p, e.ObjectHasOwn = Ca, e.ObjectKeys = Na, e.ObjectValues = Ta, e.Timer = Oa, e.abortEvent = ne, e.addClass = la, e.addEventListener = $n, e.animationDelay = wt, e.animationDuration = yt, e.animationEndEvent = oe, e.animationName = be, e.ariaChecked = o, e.ariaDescribedBy = l, e.ariaDescription = c, e.ariaExpanded = g, e.ariaHasPopup = u, e.ariaHidden = A, e.ariaLabel = d, e.ariaLabelledBy = m, e.ariaModal = v, e.ariaPressed = f, e.ariaSelected = b, e.ariaValueMax = C, e.ariaValueMin = h, e.ariaValueNow = $, e.ariaValueText = fe, e.beforeunloadEvent = ae, e.bezierEasings = Wn, e.blurEvent = ie, e.changeEvent = I, e.closest = qt, e.contextmenuEvent = q, e.createCustomEvent = Sa, e.createElement = Ot, e.createElementNS = zt, e.dispatchEvent = Ce, e.distinct = fa, e.documentBody = ma, e.documentElement = va, e.documentHead = Z, e.dragEvent = sn, e.dragendEvent = dn, e.dragenterEvent = rn, e.dragleaveEvent = ln, e.dragoverEvent = un, e.dragstartEvent = cn, e.emulateAnimationEnd = ha, e.emulateTransitionEnd = ba, e.errorEvent = Oe, e.focus = Aa, e.focusEvent = ze, e.focusEvents = hn, e.focusinEvent = Ie, e.focusoutEvent = Be, e.gesturechangeEvent = Pe, e.gestureendEvent = He, e.gesturestartEvent = Re, e.getAttribute = Mt, e.getAttributeNS = na, e.getBoundingClientRect = F, e.getCustomElements = ei, e.getDocument = S, e.getDocumentBody = Ia, e.getDocumentElement = x, e.getDocumentHead = Ba, e.getElementAnimationDelay = It, e.getElementAnimationDuration = Bt, e.getElementById = ti, e.getElementStyle = D, e.getElementTransitionDelay = Pt, e.getElementTransitionDuration = Ht, e.getElementsByClassName = ai, e.getElementsByTagName = Gt, e.getInstance = Ea, e.getNodeScroll = Pa, e.getParentNode = Ha, e.getRectRelativeToOffsetParent = Ra, e.getUID = Ut, e.getWindow = $a, e.hasAttribute = aa, e.hasAttributeNS = ia, e.hasClass = da, e.isApple = Zn, e.isArray = Qt, e.isCanvas = Fa, e.isCustomElement = Kt, e.isDocument = ke, e.isElement = Wa, e.isElementInScrollRange = Va, e.isElementInViewport = ja, e.isElementsArray = Ua, e.isFirefox = Xn, e.isFunction = Qa, e.isHTMLCollection = Ka, e.isHTMLElement = N, e.isHTMLImageElement = qa, e.isJSON = Ga, e.isMap = re, e.isMedia = Za, e.isMobile = Jn, e.isNode = y, e.isNodeList = Xa, e.isNumber = $t, e.isObject = L, e.isRTL = Ya, e.isSVGElement = _a, e.isScaledElement = Wt, e.isShadowRoot = Ft, e.isString = Y, e.isTableElement = pa, e.isWeakMap = Ja, e.isWindow = Ae, e.keyAlt = yn, e.keyArrowDown = wn, e.keyArrowLeft = kn, e.keyArrowRight = Cn, e.keyArrowUp = An, e.keyBackspace = Nn, e.keyCapsLock = Tn, e.keyControl = Sn, e.keyDelete = Ln, e.keyEnter = Dn, e.keyEscape = Mn, e.keyInsert = On, e.keyMeta = zn, e.keyPause = In, e.keyScrollLock = Bn, e.keyShift = Pn, e.keySpace = Hn, e.keyTab = Rn, e.keyboardEventKeys = bn, e.keydownEvent = $e, e.keypressEvent = Fe, e.keyupEvent = We, e.loadEvent = Ve, e.loadstartEvent = mn, e.matches = ii, e.mouseClickEvents = gn, e.mouseHoverEvents = En, e.mouseSwipeEvents = vn, e.mouseclickEvent = je, e.mousedblclickEvent = Ue, e.mousedownEvent = Qe, e.mouseenterEvent = Ge, e.mousehoverEvent = qe, e.mouseinEvent = Ze, e.mouseleaveEvent = Je, e.mousemoveEvent = _e, e.mouseoutEvent = Xe, e.mouseoverEvent = Ye, e.mouseupEvent = Ke, e.mousewheelEvent = pe, e.moveEvent = xe, e.nativeEvents = on, e.noop = Dt, e.normalizeOptions = ka, e.normalizeValue = Ne, e.off = St, e.offsetHeight = Vn, e.offsetWidth = jn, e.on = Tt, e.one = Lt, e.orientationchangeEvent = et, e.passiveHandler = La, e.pointercancelEvent = tt, e.pointerdownEvent = nt, e.pointerleaveEvent = at, e.pointermoveEvent = it, e.pointerupEvent = ot, e.querySelector = xa, e.querySelectorAll = ni, e.readystatechangeEvent = st, e.reflow = Da, e.removeAttribute = ca, e.removeAttributeNS = ra, e.removeClass = ua, e.removeEventListener = Fn, e.resetEvent = ct, e.resizeEvent = rt, e.scrollEvent = mt, e.scrollHeight = Un, e.scrollWidth = Qn, e.selectEvent = lt, e.selectendEvent = ut, e.selectstartEvent = dt, e.setAttribute = oa, e.setAttributeNS = sa, e.setElementStyle = Ma, e.submitEvent = vt, e.support3DTransform = Yn, e.supportAnimation = ea, e.supportPassive = _n, e.supportTouch = xn, e.supportTransform = pn, e.supportTransition = ta, e.tabindex = Kn, e.toLowerCase = Rt, e.toUpperCase = za, e.touchEvents = fn, e.touchcancelEvent = ft, e.touchendEvent = ht, e.touchmoveEvent = Et, e.touchstartEvent = gt, e.transitionDelay = kt, e.transitionDuration = At, e.transitionEndEvent = se, e.transitionProperty = ye, e.unloadEvent = bt, e.userAgent = J, e.userAgentData = G, e.version = oi;
})(a);
const li = "3.2.0", z = "navbar", ee = "Navbar", ve = `[data-function="${z}"]`, _t = `${ve},.${z}`, O = "open", Le = "open-position", M = "open-mobile", te = "subnav", ge = `${te}-toggle`, pt = `${z}-toggle`, Jt = {
  breakpoint: 768,
  toggleSiblings: !0,
  delay: 500
}, ue = a.createCustomEvent(`show.${z}`), xt = a.createCustomEvent(`shown.${z}`), de = a.createCustomEvent(`hide.${z}`), Te = a.createCustomEvent(`hidden.${z}`), Q = (e) => a.getInstance(e, ee), ui = (e) => new j(e), me = (e, o) => {
  (o ? U.addListener : U.removeListener)(a.getWindow(e.menu), a.resizeEvent, e.listenResize, a.passiveHandler);
}, Ee = (e) => {
  const { options: o, menu: c } = e, [l] = a.getElementsByClassName(ge, c);
  return l && a.getElementStyle(l, "display") !== "none" || a.getWindow(c).innerWidth < o.breakpoint;
}, Zt = (e, o) => {
  const c = o ? U.addListener : U.removeListener, { items: l, navbarToggle: g, menu: u } = e, A = a.getDocument(u);
  [...l].forEach((d) => {
    const { lastElementChild: m } = d;
    m && a.hasClass(m, te) && (c(d, a.mouseenterEvent, tn), c(d, a.mouseleaveEvent, Se));
    const [v] = a.getElementsByClassName(ge, d);
    v && c(v, a.mouseclickEvent, Xt);
  }), c(A, a.keydownEvent, mi), c(A, a.keyupEvent, vi), g && c(g, a.mouseclickEvent, Xt);
}, R = (e, o) => [...e.children].find((c) => a.matches(c, o)), di = (e) => {
  const o = R(e, `.${te}`), c = R(e, "A");
  if (c && (a.dispatchEvent(c, ue), ue.defaultPrevented))
    return;
  a.addClass(e, Le), a.addClass(e, O);
  const { parentElement: l } = e;
  if (l) {
    const u = a.getElementsByClassName(O, l);
    K([...u].filter((A) => A !== e));
  }
  const g = () => {
    a.Timer.clear(e, "in"), c && (a.dispatchEvent(c, xt), a.setAttribute(c, a.ariaExpanded, "true"));
  };
  o && a.emulateTransitionEnd(o, g);
}, en = (e, o) => {
  const c = R(e, `.${te}`), l = R(e, "A"), g = R(e, ge);
  if (!([O, M].some((u) => a.hasClass(e, u)) && l && (a.dispatchEvent(l, de), de.defaultPrevented))) {
    if (a.hasClass(e, O)) {
      const u = () => {
        a.removeClass(e, Le), a.Timer.clear(e, "out"), l && (a.dispatchEvent(l, Te), a.setAttribute(l, a.ariaExpanded, "false"));
      };
      a.removeClass(e, O), o && c ? a.emulateTransitionEnd(c, u) : u();
    }
    a.hasClass(e, M) && (a.removeClass(e, M), [g, l].forEach((u) => {
      u && a.setAttribute(u, a.ariaExpanded, "false");
    }), l && a.dispatchEvent(l, Te));
  }
}, K = (e) => {
  [...e].forEach((o) => en(o));
}, mi = (e) => {
  const { code: o, target: c } = e;
  a.isHTMLElement(c) && a.closest(c, _t) && [a.keyArrowDown, a.keyArrowUp, a.keySpace].includes(o) && e.preventDefault();
};
function vi(e) {
  const { code: o } = e, { activeElement: c } = a.getDocument(this), l = c && a.closest(c, "nav"), g = l && Q(l);
  if (!g || !c || this && !this.contains(c))
    return;
  const u = a.closest(c, "LI");
  if (!u)
    return;
  const A = Ee(g), { previousElementSibling: d, nextElementSibling: m } = u, v = a.closest(u, `.${O}`), f = a.closest(u, "UL"), [b] = a.getElementsByClassName(te, u), h = [a.keySpace, a.keyArrowDown, a.keyArrowLeft, a.keyArrowRight, a.keyArrowUp], C = f && a.getElementStyle(f, "flex-direction") === "column", $ = a.isRTL(u), fe = $ ? (
    /* istanbul ignore next */
    a.keyArrowRight
  ) : a.keyArrowLeft, ne = $ ? (
    /* istanbul ignore next */
    a.keyArrowLeft
  ) : a.keyArrowRight, ae = f && d && (o === a.keyArrowUp && C || o === fe && !C), ie = f && m && (o === a.keyArrowDown && C || o === ne && !C);
  let I = null;
  if (o === a.keyEscape && v ? (Se.call(v), I = v) : !A && b && o === a.keySpace && (a.hasClass(u, O) ? Se.call(u) : tn.call(u)), ae && u !== f.firstElementChild ? I = d : ie && u !== f.lastElementChild && (I = m), I) {
    const { firstElementChild: q } = I;
    q && q.focus();
  }
  !A && h.includes(o) && e.preventDefault();
}
const Xt = (e) => {
  e.preventDefault();
  const { currentTarget: o, target: c } = e, l = a.closest(o, _t), g = l && Q(l);
  if (!g)
    return;
  const { options: u, navbarToggle: A } = g;
  if (c === o || o.contains(c)) {
    const d = a.closest(o, "LI") || l, m = a.closest(o, `.${pt}`) === A ? A : R(d, `.${ge}`), v = m === A ? null : R(d, "A"), f = a.getElementsByClassName(M, d);
    if (a.hasClass(d, M)) {
      if (v && (a.dispatchEvent(v, de), de.defaultPrevented))
        return;
      K(f), a.removeClass(d, M), m && (a.setAttribute(m, a.ariaExpanded, "false"), m === A && me(g)), v && (a.setAttribute(v, a.ariaExpanded, "false"), a.dispatchEvent(v, Te));
    } else {
      if (v && (a.dispatchEvent(v, ue), ue.defaultPrevented))
        return;
      if (m === A)
        me(g, !0);
      else {
        const b = u.toggleSiblings ? a.getElementsByClassName(M, d.parentElement) : (
          /* istanbul ignore next */
          f
        );
        K(b);
      }
      a.addClass(d, M), m && a.setAttribute(m, a.ariaExpanded, "true"), v && (a.setAttribute(v, a.ariaExpanded, "true"), a.dispatchEvent(v, xt));
    }
  }
};
function tn() {
  const e = a.closest(this, `${ve},.${z}`), o = e && Q(e), c = a.Timer.get(this, "out");
  if (!(!o || Ee(o)) && (a.Timer.clear(this, "out"), !a.hasClass(this, O) && !c)) {
    const l = () => di(this);
    a.Timer.set(this, l, 17, "in");
  }
}
function Se() {
  const e = a.closest(this, `${ve},.${z}`), o = e && Q(e);
  if (!(!o || Ee(o)) && a.hasClass(this, O)) {
    a.Timer.clear(this, "in");
    const c = () => {
      K(a.getElementsByClassName(Le, this)), en(this, !0);
    };
    a.Timer.set(this, c, o.options.delay, "out");
  }
}
class j {
  /**
   * @param target HTMLElement or selector
   * @param config instance options
   */
  constructor(o, c) {
    // NAVBAR PUBLIC METHODS
    // =====================
    /**
     * Window `resize` event listener.
     */
    V(this, "listenResize", () => {
      Ee(this) || (K(a.getElementsByClassName(M, a.getDocument(this.menu))), me(this));
    });
    const l = a.querySelector(o);
    if (!l)
      throw new TypeError(`${ee} cannot initialize the specified target.`);
    const [g] = a.getElementsByClassName(pt, l), u = Q(l);
    u && u.dispose(), this.menu = l, this.options = a.normalizeOptions(l, Jt, c || {}), this.items = a.getElementsByTagName("LI", l), this.navbarToggle = g, Zt(this, !0), a.Data.set(l, ee, this);
  }
  get defaults() {
    return Jt;
  }
  get name() {
    return ee;
  }
  /**
   * Destroy Navbar instance.
   */
  dispose() {
    K(this.items), Zt(this), me(this), a.Data.remove(this.menu, ee), a.ObjectKeys(this).forEach((o) => {
      delete this[o];
    });
  }
}
V(j, "selector", ve), V(j, "init", ui), V(j, "getInstance", Q), V(j, "version", li);
const nn = (e) => e != null && typeof e == "object" || !1, De = (e) => nn(e) && typeof e.nodeType == "number" && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].some((o) => e.nodeType === o) || !1, gi = (e) => nn(e) && e.constructor.name === "Window" || !1, Ei = (e) => De(e) && e.nodeType === 9 || !1, an = (e) => gi(e) ? e.document : Ei(e) ? e : De(e) ? e.ownerDocument : window.document, fi = (e, o) => (De(o) ? o : an()).getElementsByTagName(e), hi = (e, o) => e.matches(o), bi = "DOMContentLoaded", Yt = (e) => {
  const { selector: o, init: c } = j;
  [...fi("*", an(e))].filter((g) => hi(g, o)).forEach(c);
};
document.body ? Yt() : U.addListener(document, bi, () => Yt(), { once: !0 });
export {
  j as default
};
//# sourceMappingURL=navbar.mjs.map
