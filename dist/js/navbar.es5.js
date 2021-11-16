/*!
* Navbar.js v3.0.2 (http://thednp.github.io/navbar.js)
* Copyright 2016-2021 © thednp
* Licensed under MIT (https://github.com/thednp/navbar.js/blob/master/LICENSE)
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Navbar = factory());
}(this, (function () { 'use strict';

  /**
   * A global namespace for 'transitionend' string.
   * @type {string}
   */
  var transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

  /**
   * A global namespace for CSS3 transition support.
   * @type {boolean}
   */
  var supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

  /**
   * A global namespace for 'transitionDelay' string.
   * @type {string}
   */
  var transitionDelay = 'webkitTransition' in document.head.style ? 'webkitTransitionDelay' : 'transitionDelay';

  /**
   * A global namespace for 'transition' string.
   * @type {string}
   */
  var transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransition' : 'transition';

  /**
   * Utility to get the computed transitionDelay
   * from Element in miliseconds.
   *
   * @param {Element} element target
   * @return {Number} the value in miliseconds
   */
  function getElementTransitionDelay(element) {
    var computedStyle = getComputedStyle(element);
    var propertyValue = computedStyle[transitionProperty];
    var delayValue = computedStyle[transitionDelay];
    var delayScale = delayValue.includes('ms') ? 1 : 1000;
    var duration = supportTransition && propertyValue && propertyValue !== 'none'
      ? parseFloat(delayValue) * delayScale : 0;

    return !Number.isNaN(duration) ? duration : 0;
  }

  /**
   * A global namespace for 'transitionDuration' string.
   * @type {string}
   */
  var transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

  /**
   * Utility to get the computed transitionDuration
   * from Element in miliseconds.
   *
   * @param {Element} element target
   * @return {Number} the value in miliseconds
   */
  function getElementTransitionDuration(element) {
    var computedStyle = getComputedStyle(element);
    var propertyValue = computedStyle[transitionProperty];
    var durationValue = computedStyle[transitionDuration];
    var durationScale = durationValue.includes('ms') ? 1 : 1000;
    var duration = supportTransition && propertyValue && propertyValue !== 'none'
      ? parseFloat(durationValue) * durationScale : 0;

    return !Number.isNaN(duration) ? duration : 0;
  }

  /**
   * Utility to make sure callbacks are consistently
   * called when transition ends.
   *
   * @param {Element} element target
   * @param {Function} handler callback
   */
  function emulateTransitionEnd(element, handler) {
    var called = 0;
    var endEvent = new Event(transitionEndEvent);
    var duration = getElementTransitionDuration(element);
    var delay = getElementTransitionDelay(element);

    if (duration) {
      /**
       * Wrap the handler in on -> off callback
       * @param {object | Event} e Event object
       */
      var transitionEndWrapper = function (e) {
        if (e.target === element) {
          handler.apply(element, [e]);
          element.removeEventListener(transitionEndEvent, transitionEndWrapper);
          called = 1;
        }
      };
      element.addEventListener(transitionEndEvent, transitionEndWrapper);
      setTimeout(function () {
        if (!called) { element.dispatchEvent(endEvent); }
      }, duration + delay + 17);
    } else {
      handler.apply(element, [endEvent]);
    }
  }

  /**
   * A global namespace for 'addEventListener' string.
   * @type {string}
   */
  var addEventListener = 'addEventListener';

  /**
   * A global namespace for 'removeEventListener' string.
   * @type {string}
   */
  var removeEventListener = 'removeEventListener';

  /**
   * A global namespace for passive events support.
   * @type {boolean}
   */
  var supportPassive = (function () {
    var result = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function get() {
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

  /**
   * Utility to check if target is typeof Element
   * or find one that matches a selector.
   *
   * @param {string | Element} selector the input selector or target element
   * @param {undefined | Element} parent optional Element to look into
   * @return {null | Element} the Element
   */
  function queryElement(selector, parent) {
    var lookUp = parent && parent instanceof Element ? parent : document;
    return selector instanceof Element ? selector : lookUp.querySelector(selector);
  }

  /**
   * Utility to normalize component options
   *
   * @param {string | Function | Element | object} value the input value
   * @return {string | Function | Element | object} the normalized value
   */
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

  /**
   * Utility to normalize component options
   *
   * @param {Element} element target
   * @param {object} defaultOps component default options
   * @param {object} inputOps component instance options
   * @param {string} ns component namespace
   * @return {object} normalized component options object
   */
  function normalizeOptions(element, defaultOps, inputOps, ns) {
    var normalOps = {};
    var dataOps = {};
    // @ts-ignore
    var data = Object.assign({}, element.dataset);

    Object.keys(data)
      .forEach(function (k) {
        var key = k.includes(ns)
          ? k.replace(ns, '').replace(/[A-Z]/, function (match) { return match.toLowerCase(); })
          : k;

        dataOps[key] = normalizeValue(data[k]);
      });

    Object.keys(inputOps)
      .forEach(function (k) {
        inputOps[k] = normalizeValue(inputOps[k]);
      });

    Object.keys(defaultOps)
      .forEach(function (k) {
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

  /**
   * Add class to Element.classList
   *
   * @param {Element} element target
   * @param {string} classNAME to add
   */
  function addClass(element, classNAME) {
    element.classList.add(classNAME);
  }

  /**
   * Check class in Element.classList
   *
   * @param {Element} element target
   * @param {string} classNAME to check
   * @return {boolean}
   */
  function hasClass(element, classNAME) {
    return element.classList.contains(classNAME);
  }

  /**
   * Remove class from Element.classList
   *
   * @param {Element} element target
   * @param {string} classNAME to remove
   */
  function removeClass(element, classNAME) {
    element.classList.remove(classNAME);
  }

  var version = "3.0.2";

  // @ts-ignore

  var Version = version;

  // NAVBAR GC
  // =========
  var navbarString = 'navbar';
  var navbarComponent = 'Navbar';
  var navbarSelector = "[data-function=\"" + navbarString + "\"]";
  var openNavClass = 'open';
  var openPositionClass = 'open-position';
  var openMobileClass = 'open-mobile';
  var subnavClass = 'subnav';
  var subnavToggleClass = subnavClass + "-toggle";
  var navbarToggleClass = navbarString + "-toggle";
  var ariaExpanded = 'aria-expanded';
  var defaultNavbarOptions = {
    breakpoint: 768,
    toggleSiblings: true,
    delay: 500,
  };
  var navbarEventOptions = { cancelable: true };
  var showNavbarEvent = new CustomEvent('show.navbar', navbarEventOptions);
  var shownNavbarEvent = new CustomEvent('shown.navbar', navbarEventOptions);
  var hideNavbarEvent = new CustomEvent('hide.navbar', navbarEventOptions);
  var hiddenNavbarEvent = new CustomEvent('hidden.navbar', navbarEventOptions);

  // NAVBAR PRIVATE METHODS
  // ======================
  function toggleNavbarResizeEvent(add) {
    var action = add ? addEventListener : removeEventListener;
    if (!document.querySelector(("li." + openMobileClass))) {
      window[action]('resize', resizeNavbarHandler, passiveHandler);
    }
  }

  function resizeNavbarHandler() {
    closeNavbars(document.getElementsByClassName(openMobileClass));
    toggleNavbarResizeEvent();
  }

  function checkNavbarView(self) { // returns TRUE if "is mobile"
    var options = self.options;
    var menu = self.menu;
    var ref = menu.getElementsByClassName(subnavToggleClass);
    var firstToggle = ref[0];
    return (firstToggle && getComputedStyle(firstToggle).display !== 'none')
      || window.innerWidth < options.breakpoint;
  }

  function toggleNavbarEvents(self, add) {
    var action = add ? addEventListener : removeEventListener;
    var items = self.items;
    var navbarToggle = self.navbarToggle;
    var menu = self.menu;

    Array.from(items).forEach(function (x) {
      if (hasClass(x.lastElementChild, subnavClass)) {
        x[action]('mouseenter', navbarEnterHandler);
        x[action]('mouseleave', navbarLeaveHandler);
      }

      var ref = x.getElementsByClassName(subnavToggleClass);
      var toggleElement = ref[0];
      if (toggleElement) { toggleElement[action]('click', navbarClickHandler); }
    });

    menu[action]('keydown', navbarKeyHandler);
    if (navbarToggle) { navbarToggle[action]('click', navbarClickHandler); }
  }

  function findChild(element, selector) {
    return Array.from(element.children).find(function (x) { return selector === x.tagName || hasClass(x, selector); });
  }

  function openNavbar(element) {
    var subMenu = findChild(element, subnavClass);
    var anchor = findChild(element, 'A');

    if (anchor) {
      anchor.dispatchEvent(showNavbarEvent);
      if (showNavbarEvent.isDefaultPrevented) { return; }
    }

    addClass(element, openPositionClass);
    addClass(element, openNavClass);

    if (anchor) { anchor.setAttribute(ariaExpanded, true); }

    var siblings = element.parentNode.getElementsByTagName('LI');
    closeNavbars(Array.from(siblings).filter(function (x) { return x !== element; }));

    if (anchor) {
      emulateTransitionEnd(subMenu, function () {
        anchor.dispatchEvent(shownNavbarEvent);
      });
    }
  }

  function closeNavbar(element, leave) {
    var subMenu = findChild(element, subnavClass);
    var anchor = findChild(element, 'A');
    var toggleElement = findChild(element, subnavToggleClass);
    var navTransitionEndHandler = function () {
      removeClass(element, openPositionClass);
      if (anchor) { anchor.dispatchEvent(hiddenNavbarEvent); }
    };

    if (hasClass(element, openNavClass)) {
      if (anchor) {
        anchor.dispatchEvent(hideNavbarEvent);
        if (hideNavbarEvent.isDefaultPrevented) { return; }
      }
      removeClass(element, openNavClass);
      if (leave) { emulateTransitionEnd(subMenu, navTransitionEndHandler); }
      else { navTransitionEndHandler(); }
      if (anchor) { anchor.setAttribute(ariaExpanded, false); }
    }
    if (hasClass(element, openMobileClass)) {
      if (anchor) { anchor.dispatchEvent(hideNavbarEvent); }
      if (hideNavbarEvent.isDefaultPrevented) { return; }
      removeClass(element, openMobileClass);

      [toggleElement, anchor].forEach(function (x) {
        if (x) { x.setAttribute(ariaExpanded, false); }
      });
      if (anchor) { anchor.dispatchEvent(hiddenNavbarEvent); }
    }
  }

  function closeNavbars(collection) {
    Array.from(collection).forEach(function (x) { return closeNavbar(x); });
  }

  // NAVBAR EVENT LISTENERS
  // ======================
  function navbarKeyHandler(e) {
    var which = e.which;
    var activeElement = document.activeElement;
    var self = this[navbarComponent];
    var element = activeElement.closest('LI');
    var openMenu = activeElement.closest(("." + openNavClass));
    var subnavMenu = queryElement(("." + subnavClass), element);
    var isMobile = checkNavbarView(self);

    if (!isMobile && this.contains(activeElement) && which === 32) {
      e.preventDefault();
    }
    if (which === 27 && openMenu) {
      navbarLeaveHandler.call(openMenu);
    }
    if (element && subnavMenu && !isMobile) {
      if (which === 32) {
        if (hasClass(element, openNavClass)) { navbarLeaveHandler.call(element); }
        else { navbarEnterHandler.call(element); }
      }
    }
  }

  function navbarClickHandler(e) {
    e.preventDefault();

    var target = e.target;
    var that = this;
    var menu = that.closest((navbarSelector + ",." + navbarString));
    var self = menu[navbarComponent];
    var options = self.options;
    var navbarToggle = self.navbarToggle;

    if (self && (target === that || that.contains(target))) {
      var element = that.closest('LI') || menu;
      var toggleElement = that.closest(("." + navbarToggleClass)) === navbarToggle
        ? navbarToggle
        : findChild(element, subnavToggleClass);
      var anchor = toggleElement === navbarToggle
        ? null : findChild(element, 'A');
      var openSubs = element.getElementsByClassName(openMobileClass);

      if (!hasClass(element, openMobileClass)) {
        if (anchor) { anchor.dispatchEvent(showNavbarEvent); }
        if (showNavbarEvent.isDefaultPrevented) { return; }

        if (toggleElement !== navbarToggle) {
          toggleNavbarResizeEvent(1);
        }

        if (toggleElement !== navbarToggle) {
          var selection = options.toggleSiblings
            ? element.parentNode.getElementsByClassName(openMobileClass)
            : openSubs;
          closeNavbars(selection);
        }
        addClass(element, openMobileClass);

        if (toggleElement) { toggleElement.setAttribute(ariaExpanded, true); }
        if (anchor) {
          anchor.setAttribute(ariaExpanded, true);
          anchor.dispatchEvent(shownNavbarEvent);
        }
      } else {
        if (anchor) { anchor.dispatchEvent(hideNavbarEvent); }
        if (hideNavbarEvent.isDefaultPrevented) { return; }

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
    var element = this;
    var menu = element.closest((navbarSelector + ",." + navbarString));
    var self = menu && menu[navbarComponent];

    // must always clear the timer
    clearTimeout(self.timer);
    if (self && !checkNavbarView(self) && !hasClass(element, openNavClass)) {
      openNavbar(element);
    }
  }

  function navbarLeaveHandler() {
    var element = this;
    var menu = element.closest((navbarSelector + ",." + navbarString));
    var self = menu && menu[navbarComponent];

    if (self && !checkNavbarView(self) && hasClass(element, openNavClass)) {
      clearTimeout(self.timer);
      self.timer = setTimeout(function () { return closeNavbar(element, 1); }, self.options.delay);
    }
  }

  // NAVBAR DEFINITION
  // =================

  /**
   * Creates a new Navbar for desktop and mobile navigation.
   * @class
   */
  var Navbar = function Navbar(target, config) {
    var assign;

    // bind
    var self = this;

    // instance targets
    /** @private */
    self.menu = queryElement(target);
    var menu = self.menu;

    // reset on re-init
    if (menu[navbarComponent]) { menu[navbarComponent].dispose(); }

    /** @private */
    self.options = normalizeOptions(menu, defaultNavbarOptions, config || {});

    /** @private */
    self.items = menu.getElementsByTagName('LI');
    /** @private */
    (assign = menu.getElementsByClassName(navbarToggleClass), self.navbarToggle = assign[0]);

    /** @private */
    self.timer = null;

    // attach events
    toggleNavbarEvents(self, 1);

    // attach instance to element
    menu[navbarComponent] = self;
  };

  // NAVBAR PUBLIC METHOD
  // ====================
  /**
   * Destroy Navbar instance.
   * @public */
  Navbar.prototype.dispose = function dispose () {
    var self = this;
    closeNavbars(self.items);
    toggleNavbarEvents(self);
    toggleNavbarResizeEvent();
    delete self.menu[navbarComponent];
  };

  /**
   * An object with all necesary information
   * for Navbar component initialization.
   */
  Navbar.init = {
    component: navbarComponent,
    selector: navbarSelector,
    constructor: Navbar,
    Version: Version,
  };

  // DATA API
  /**
   * Navbar initialization callback
   * @param {Element | undefined} context Element
   */
  function initNavbar(context) {
    var lookup = context instanceof Element ? context : document;

    var ref = Navbar.init;
    var selector = ref.selector;
    var constructor = ref.constructor;
    var navs = lookup.querySelectorAll(selector);

    Array.from(navs).map(function (x) { return new constructor(x); });
  }
  // initialize when loaded
  if (document.body) { initNavbar(); }
  else { document.addEventListener('DOMContentLoaded', initNavbar, { once: true }); }

  return Navbar;

})));
