/*!
* Navbar.js v3.0.1 (http://thednp.github.io/navbar.js)
* Copyright 2016-2021 © thednp
* Licensed under MIT (https://github.com/thednp/navbar.js/blob/master/LICENSE)
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Navbar = factory());
}(this, (function () { 'use strict';

  const transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

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

  function emulateTransitionEnd(element, handler) {
    let called = 0;
    const endEvent = new Event(transitionEndEvent);
    const duration = getElementTransitionDuration(element);

    if (duration) {
      element.addEventListener(transitionEndEvent, function transitionEndWrapper(e) {
        if (e.target === element) {
          handler.apply(element, [e]);
          element.removeEventListener(transitionEndEvent, transitionEndWrapper);
          called = 1;
        }
      });
      setTimeout(() => {
        if (!called) element.dispatchEvent(endEvent);
      }, duration + 17);
    } else {
      handler.apply(element, [endEvent]);
    }
  }

  const addEventListener = 'addEventListener';

  const removeEventListener = 'removeEventListener';

  const supportPassive = (() => {
    let result = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          result = true;
          return result;
        },
      });
      document[addEventListener]('DOMContentLoaded', function wrap() {
        document[removeEventListener]('DOMContentLoaded', wrap, opts);
      }, opts);
    } catch (e) {
      throw Error('Passive events are not supported');
    }

    return result;
  })();

  // general event options

  var passiveHandler = supportPassive ? { passive: true } : false;

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

  var version = "3.0.1";

  // NAVBAR GC
  // =========
  const navbarString = 'navbar';
  const navbarComponent = 'Navbar';
  const navbarSelector = `[data-function="${navbarString}"]`;
  const openNavClass = 'open';
  const openPositionClass = 'open-position';
  const openMobileClass = 'open-mobile';
  const subnavClass = 'subnav';
  const subnavToggleClass = `${subnavClass}-toggle`;
  const navbarToggleClass = `${navbarString}-toggle`;
  const ariaExpanded = 'aria-expanded';
  const defaultNavbarOptions = {
    breakpoint: 768,
    toggleSiblings: true,
    delay: 500,
  };
  const navbarEventOptions = { cancelable: true };
  const showNavbarEvent = new CustomEvent('show.navbar', navbarEventOptions);
  const shownNavbarEvent = new CustomEvent('shown.navbar', navbarEventOptions);
  const hideNavbarEvent = new CustomEvent('hide.navbar', navbarEventOptions);
  const hiddenNavbarEvent = new CustomEvent('hidden.navbar', navbarEventOptions);

  // NAVBAR PRIVATE METHODS
  // ======================
  function toggleNavbarResizeEvent(add) {
    const action = add ? addEventListener : removeEventListener;
    if (!document.querySelector(`li.${openMobileClass}`)) {
      window[action]('resize', resizeNavbarHandler, passiveHandler);
    }
  }

  function resizeNavbarHandler() {
    closeNavbars(document.getElementsByClassName(openMobileClass));
    toggleNavbarResizeEvent();
  }

  function checkNavbarView(self) { // returns TRUE if "is mobile"
    const { options, menu } = self;
    const [firstToggle] = menu.getElementsByClassName(subnavToggleClass);
    return (firstToggle && getComputedStyle(firstToggle).display !== 'none')
      || window.innerWidth < options.breakpoint;
  }

  function toggleNavbarEvents(self, add) {
    const action = add ? addEventListener : removeEventListener;
    const { items, navbarToggle, menu } = self;

    Array.from(items).forEach((x) => {
      if (hasClass(x.lastElementChild, subnavClass)) {
        x[action]('mouseenter', navbarEnterHandler);
        x[action]('mouseleave', navbarLeaveHandler);
      }

      const [toggleElement] = x.getElementsByClassName(subnavToggleClass);
      if (toggleElement) toggleElement[action]('click', navbarClickHandler);
    });

    menu[action]('keydown', navbarKeyHandler);
    if (navbarToggle) navbarToggle[action]('click', navbarClickHandler);
  }

  function findChild(element, selector) {
    return Array.from(element.children).find((x) => selector === x.tagName || hasClass(x, selector));
  }

  function openNavbar(element) {
    const subMenu = findChild(element, subnavClass);
    const anchor = findChild(element, 'A');

    if (anchor) {
      anchor.dispatchEvent(showNavbarEvent);
      if (showNavbarEvent.isDefaultPrevented) return;
    }

    addClass(element, openPositionClass);
    addClass(element, openNavClass);

    if (anchor) anchor.setAttribute(ariaExpanded, true);

    const siblings = element.parentNode.getElementsByTagName('LI');
    closeNavbars(Array.from(siblings).filter((x) => x !== element));

    if (anchor) {
      emulateTransitionEnd(subMenu, () => {
        anchor.dispatchEvent(shownNavbarEvent);
      });
    }
  }

  function closeNavbar(element, leave) {
    const subMenu = findChild(element, subnavClass);
    const anchor = findChild(element, 'A');
    const toggleElement = findChild(element, subnavToggleClass);
    const navTransitionEndHandler = () => {
      removeClass(element, openPositionClass);
      if (anchor) anchor.dispatchEvent(hiddenNavbarEvent);
    };

    if (hasClass(element, openNavClass)) {
      if (anchor) {
        anchor.dispatchEvent(hideNavbarEvent);
        if (hideNavbarEvent.isDefaultPrevented) return;
      }
      removeClass(element, openNavClass);
      if (leave) emulateTransitionEnd(subMenu, navTransitionEndHandler);
      else navTransitionEndHandler();
      if (anchor) anchor.setAttribute(ariaExpanded, false);
    }
    if (hasClass(element, openMobileClass)) {
      if (anchor) anchor.dispatchEvent(hideNavbarEvent);
      if (hideNavbarEvent.isDefaultPrevented) return;
      removeClass(element, openMobileClass);

      [toggleElement, anchor].forEach((x) => {
        if (x) x.setAttribute(ariaExpanded, false);
      });
      if (anchor) anchor.dispatchEvent(hiddenNavbarEvent);
    }
  }

  function closeNavbars(collection) {
    Array.from(collection).forEach((x) => closeNavbar(x));
  }

  // NAVBAR EVENT LISTENERS
  // ======================
  function navbarKeyHandler(e) {
    const { which } = e;
    const { activeElement } = document;
    const self = this[navbarComponent];
    const element = activeElement.closest('LI');
    const openMenu = activeElement.closest(`.${openNavClass}`);
    const subnavMenu = queryElement(`.${subnavClass}`, element);
    const isMobile = checkNavbarView(self);

    if (!isMobile && this.contains(activeElement) && which === 32) {
      e.preventDefault();
    }
    if (which === 27 && openMenu) {
      navbarLeaveHandler.call(openMenu);
    }
    if (element && subnavMenu && !isMobile) {
      if (which === 32) {
        if (hasClass(element, openNavClass)) navbarLeaveHandler.call(element);
        else navbarEnterHandler.call(element);
      }
    }
  }

  function navbarClickHandler(e) {
    e.preventDefault();

    const { target } = e;
    const that = this;
    const menu = that.closest(`${navbarSelector},.${navbarString}`);
    const self = menu[navbarComponent];
    const { options, navbarToggle } = self;

    if (self && (target === that || that.contains(target))) {
      const element = that.closest('LI') || menu;
      const toggleElement = that.closest(`.${navbarToggleClass}`) === navbarToggle
        ? navbarToggle
        : findChild(element, subnavToggleClass);
      const anchor = toggleElement === navbarToggle
        ? null : findChild(element, 'A');
      const openSubs = element.getElementsByClassName(openMobileClass);

      if (!hasClass(element, openMobileClass)) {
        if (anchor) anchor.dispatchEvent(showNavbarEvent);
        if (showNavbarEvent.isDefaultPrevented) return;

        if (toggleElement !== navbarToggle) {
          toggleNavbarResizeEvent(1);
        }

        if (toggleElement !== navbarToggle) {
          const selection = options.toggleSiblings
            ? element.parentNode.getElementsByClassName(openMobileClass)
            : openSubs;
          closeNavbars(selection);
        }
        addClass(element, openMobileClass);

        if (toggleElement) toggleElement.setAttribute(ariaExpanded, true);
        if (anchor) {
          anchor.setAttribute(ariaExpanded, true);
          anchor.dispatchEvent(shownNavbarEvent);
        }
      } else {
        if (anchor) anchor.dispatchEvent(hideNavbarEvent);
        if (hideNavbarEvent.isDefaultPrevented) return;

        closeNavbars(openSubs);
        removeClass(element, openMobileClass);

        if (toggleElement) {
          toggleElement.setAttribute(ariaExpanded, false);
          toggleNavbarResizeEvent();
        }
        if (anchor) {
          anchor.setAttribute(ariaExpanded, false);
          anchor.dispatchEvent(hiddenNavbarEvent);
        }
      }
    }
  }

  function navbarEnterHandler() {
    const element = this;
    const menu = element.closest(`${navbarSelector},.${navbarString}`);
    const self = menu && menu[navbarComponent];

    // must always clear the timer
    clearTimeout(self.timer);
    if (self && !checkNavbarView(self) && !hasClass(element, openNavClass)) {
      openNavbar(element);
    }
  }

  function navbarLeaveHandler() {
    const element = this;
    const menu = element.closest(`${navbarSelector},.${navbarString}`);
    const self = menu && menu[navbarComponent];

    if (self && !checkNavbarView(self) && hasClass(element, openNavClass)) {
      clearTimeout(self.timer);
      self.timer = setTimeout(() => closeNavbar(element, 1), self.options.delay);
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

      // reset on re-init
      if (menu[navbarComponent]) menu[navbarComponent].dispose();

      // set options
      self.options = normalizeOptions(menu, defaultNavbarOptions, config || {});

      // internal targets
      self.items = menu.getElementsByTagName('LI');
      [self.navbarToggle] = menu.getElementsByClassName(navbarToggleClass);

      // set additional properties
      self.timer = null;

      // attach events
      toggleNavbarEvents(self, 1);

      // attach instance to element
      menu[navbarComponent] = self;
    }

    // NAVBAR PUBLIC METHOD
    // ====================
    dispose() {
      const self = this;
      closeNavbars(self.items);
      toggleNavbarEvents(self);
      toggleNavbarResizeEvent();
      delete self.menu[navbarComponent];
    }
  }

  Navbar.init = {
    component: navbarComponent,
    selector: navbarSelector,
    constructor: Navbar,
    Version: version,
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
