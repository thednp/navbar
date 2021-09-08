/*!
* Navbar.js v2.1.9 (http://thednp.github.io/navbar.js)
* Copyright 2016-2021 © thednp
* Licensed under MIT (https://github.com/thednp/navbar.js/blob/master/LICENSE)
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Navbar = factory());
}(this, (function () { 'use strict';

  const supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

  const transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

  const transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

  function getElementTransitionDuration(element) {
    const computedStyle = getComputedStyle(element);
    const propertyValue = computedStyle[transitionProperty];
    const durationValue = computedStyle[transitionDuration];
    const durationScale = durationValue.includes('ms') ? 1 : 1000;
    const duration = supportTransition && propertyValue && propertyValue !== 'none'
      ? parseFloat(durationValue) * durationScale : 0;

    return !Number.isNaN(duration) ? duration : 0;
  }

  function queryElement(selector, parent) {
    const lookUp = parent && parent instanceof Element ? parent : document;
    return selector instanceof Element ? selector : lookUp.querySelector(selector);
  }

  function normalizeValue(value) {
    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    if (!Number.isNaN(+value)) {
      return +value;
    }

    if (value === '' || value === 'null') {
      return null;
    }

    // string / function / Element / Object
    return value;
  }

  function normalizeOptions(element, defaultOps, inputOps, ns) {
    const normalOps = {};
    const dataOps = {};
    const data = { ...element.dataset };

    Object.keys(data)
      .forEach((k) => {
        const key = k.includes(ns)
          ? k.replace(ns, '').replace(/[A-Z]/, (match) => match.toLowerCase())
          : k;

        dataOps[key] = normalizeValue(data[k]);
      });

    Object.keys(inputOps)
      .forEach((k) => {
        inputOps[k] = normalizeValue(inputOps[k]);
      });

    Object.keys(defaultOps)
      .forEach((k) => {
        if (k in inputOps) {
          normalOps[k] = inputOps[k];
        } else if (k in dataOps) {
          normalOps[k] = dataOps[k];
        } else {
          normalOps[k] = defaultOps[k];
        }
      });

    return normalOps;
  }

  function addClass(element, classNAME) {
    element.classList.add(classNAME);
  }

  function hasClass(element, classNAME) {
    return element.classList.contains(classNAME);
  }

  function removeClass(element, classNAME) {
    element.classList.remove(classNAME);
  }

  const addEventListener = 'addEventListener';

  const removeEventListener = 'removeEventListener';

  var version = "2.1.9";

  // NAVBAR GC
  // =========
  const navbarString = 'navbar';
  const navbarComponent = 'Navbar';
  const navbarSelector = `[data-function="${navbarString}"]`;
  const openNavClass = 'open';
  const openPositionClass = 'open-position';
  const openMobileClass = 'open-mobile';
  const parentToggleClass = 'parent-toggle';
  const defaultNavbarOptions = {
    breakpoint: 768,
    toggleSiblings: true,
    delay: 500,
  };

  // NAVBAR PRIVATE METHODS
  // ======================
  function closeNavbar(self, element, leave) {
    if (hasClass(element, openNavClass)) {
      removeClass(element, openNavClass);
      if (leave) {
        setTimeout(() => {
          removeClass(element, openPositionClass);
          element.isOpen = 0;
        }, self.transitionDuration);
      } else {
        removeClass(element, openPositionClass);
        element.isOpen = 0;
      }
    }
    if (hasClass(element, openMobileClass)) removeClass(element, openMobileClass);
  }

  function checkNavbarView(self) {
    const { options, firstToggle } = self;
    return (firstToggle && getComputedStyle(firstToggle).display !== 'none')
      || window.innerWidth < options.breakpoint;
  }

  function toggleNavbarEvents(self, add) {
    const action = add ? addEventListener : removeEventListener;
    const { items, navbarToggle } = self;

    Array.from(items).forEach((listItem) => {
      if (hasClass(listItem.lastElementChild, 'subnav')) {
        listItem[action]('mouseenter', navbarEnterHandler);
        listItem[action]('mouseleave', navbarLeaveHandler);
        listItem[action]('focusin', navbarEnterHandler);
        listItem[action]('focusout', navbarLeaveHandler);
      }
      const [toggleElement] = listItem.getElementsByClassName(parentToggleClass);
      if (toggleElement) toggleElement[action]('click', navbarClickHandler);
    });

    if (navbarToggle) navbarToggle[action]('click', navbarClickHandler);
  }

  // NAVBAR EVENT LISTENERS
  // ======================
  function navbarClickHandler(e) {
    e.preventDefault();

    const { target } = e;
    const that = this;
    const menu = that.closest(`${navbarSelector},.${navbarString}`);
    const self = menu[navbarComponent];
    const { options } = self;

    if (target === that || that.contains(target)) {
      const element = that.closest('LI') || that.closest(`.${navbarString}`);

      if (!hasClass(element, openMobileClass)) {
        addClass(element, openMobileClass);

        const lookup = options.toggleSiblings
          ? element.parentNode.getElementsByTagName('LI')
          : element.getElementsByTagName('LI');

        Array.from(lookup).forEach((x) => { if (x !== element) closeNavbar(self, x); });
      } else {
        removeClass(element, openMobileClass);
      }
    }
  }

  function navbarEnterHandler() {
    const target = this; // this is now the event target, the LI
    const menu = target.closest(`${navbarSelector},.${navbarString}`);
    const self = menu && menu[navbarComponent];

    clearTimeout(self.timer);
    if (self && !target.isOpen && !checkNavbarView(self)) {
      self.timer = setTimeout(() => {
        addClass(target, openPositionClass);
        addClass(target, openNavClass);
        target.isOpen = 1;

        Array.from(target.parentNode.getElementsByTagName('LI'))
          .forEach((x) => {
            if (x !== target) closeNavbar(self, x);
          });
      }, 17);
    }
  }

  function navbarLeaveHandler() {
    const target = this;
    const menu = target.closest(`${navbarSelector},.${navbarString}`);
    const self = menu && menu[navbarComponent];

    if (self && target.isOpen && !checkNavbarView(self)) {
      clearTimeout(self.timer);
      self.timer = setTimeout(() => closeNavbar(self, target, 1), self.options.delay);
    }
  }

  // NAVBAR DEFINITION
  // =================
  class Navbar {
    constructor(target, config) {
      // bind
      const self = this;

      // instance targets
      self.menu = queryElement(target);
      const { menu } = self;
      const firstSubnav = queryElement('.subnav', menu);

      // reset on re-init
      if (menu[navbarComponent]) menu[navbarComponent].dispose();

      // set options
      self.options = normalizeOptions(menu, defaultNavbarOptions, config || {});

      // internal targets
      self.items = menu.getElementsByTagName('LI');
      self.navbarToggle = queryElement(`.${navbarString}-toggle`, menu);
      [self.firstToggle] = menu.getElementsByClassName(parentToggleClass);

      // set additional properties
      self.timer = null;
      self.transitionDuration = firstSubnav ? getElementTransitionDuration(firstSubnav) : 0;

      // attach events
      toggleNavbarEvents(self, 1);

      // attach instance to element
      menu[navbarComponent] = self;
    }

    // NAVBAR PUBLIC METHOD
    // ====================
    dispose() {
      const self = this;
      toggleNavbarEvents(self);
      delete self.menu[navbarComponent];
    }
  }

  Navbar.init = {
    component: navbarComponent,
    selector: navbarSelector,
    constructor: Navbar,
    version,
  };

  // DATA API
  function initNavbar(context) {
    const lookup = context instanceof Element ? context : document;

    const { selector, constructor } = Navbar.init;
    const navs = lookup.querySelectorAll(selector);

    Array.from(navs).map((x) => new constructor(x));
  }
  // initialize when loaded
  if (document.body) initNavbar();
  else document.addEventListener('DOMContentLoaded', initNavbar, { once: true });

  return Navbar;

})));
