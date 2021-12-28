/*!
* Navbar.js v3.0.5 (http://thednp.github.io/navbar.js)
* Copyright 2016-2021 © thednp
* Licensed under MIT (https://github.com/thednp/navbar.js/blob/master/LICENSE)
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Navbar = factory());
}(this, (function () { 'use strict';

  /**
   * A global namespace for `Space` key.
   * @type {string} e.which = 32 equivalent
   */
  var keySpace = 'Space';

  /**
   * A global namespace for `Escape` key.
   * @type {string} e.which = 27 equivalent
   */
  var keyEscape = 'Escape';

  /**
   * A global namespace for `ArrowUp` key.
   * @type {string} e.which = 38 equivalent
   */
  var keyArrowUp = 'ArrowUp';

  /**
   * A global namespace for `ArrowDown` key.
   * @type {string} e.which = 40 equivalent
   */
  var keyArrowDown = 'ArrowDown';

  /**
   * A global namespace for `ArrowLeft` key.
   * @type {string} e.which = 37 equivalent
   */
  var keyArrowLeft = 'ArrowLeft';

  /**
   * A global namespace for `ArrowRight` key.
   * @type {string} e.which = 39 equivalent
   */
  var keyArrowRight = 'ArrowRight';

  /**
   * A global namespace for aria-expanded.
   * @type {string}
   */
  var ariaExpanded = 'aria-expanded';

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
   * A global namespace for `mouseenter` event.
   * @type {string}
   */
  var mouseenterEvent = 'mouseenter';

  /**
   * A global namespace for `mouseleave` event.
   * @type {string}
   */
  var mouseleaveEvent = 'mouseleave';

  /**
   * A global namespace for `click` event.
   * @type {string}
   */
  var mouseclickEvent = 'click';

  /**
   * A global namespace for `keydown` event.
   * @type {string}
   */
  var keydownEvent = 'keydown';

  /**
   * A global namespace for `resize` event.
   * @type {string}
   */
  var resizeEvent = 'resize';

  /**
   * Checks if an object is an `Element`.
   *
   * @param {any} element the target object
   * @returns {boolean} the query result
   */
  function isElement(element) {
    return element instanceof Element;
  }

  /**
   * Utility to check if target is typeof `Element`
   * or find one that matches a selector.
   *
   * @param {Element | string} selector the input selector or target element
   * @param {Element=} parent optional Element to look into
   * @return {Element?} the Element or `querySelector` result
   */
  function querySelector(selector, parent) {
    var lookUp = parent && isElement(parent) ? parent : document;
    // @ts-ignore -- `isElement` is just as good
    return isElement(selector) ? selector : lookUp.querySelector(selector);
  }

  var TimeCache = new Map();

  var Timer = {
    /**
     * Sets a new timeout timer for an element, or element -> key association.
     * @param {Element | string} target target element
     * @param {ReturnType<TimerHandler>} callback the callback
     * @param {number} delay the execution delay
     * @param {string=} key a unique
     */
    set: function (target, callback, delay, key) {
      var element = querySelector(target);
      if (!isElement(element)) { return; }

      if (typeof key === 'string' && key.length) {
        if (!TimeCache.has(element)) {
          TimeCache.set(element, new Map());
        }
        var keyTimers = TimeCache.get(element);
        keyTimers.set(key, setTimeout(callback, delay));
      } else {
        TimeCache.set(element, setTimeout(callback, delay));
      }
    },

    /**
     * Returns the timer associated with the target.
     * @param {Element | string} target target element
     * @param {string=} key a unique
     * @returns {Map<Element, TimerHandler>?} the timer
     */
    get: function (target, key) {
      var element = querySelector(target);
      if (!isElement(element)) { return null; }

      if (typeof key === 'string' && key.length) {
        if (!TimeCache.has(element)) {
          TimeCache.set(element, new Map());
        }
        var keyTimers = TimeCache.get(element);
        if (keyTimers.has(key)) {
          return keyTimers.get(key);
        }
      } else if (TimeCache.has(element)) {
        return TimeCache.get(element);
      }
      return null;
    },

    /**
     * Clears the element's timer.
     * @param {Element} target target element
     * @param {string=} key a unique
     */
    clear: function (target, key) {
      var element = querySelector(target);

      if (!isElement(element) || !TimeCache.has(element)) { return; }

      if (typeof key === 'string' && key.length) {
        var keyTimers = TimeCache.get(element);

        if (keyTimers && keyTimers.has(key)) {
          clearTimeout(keyTimers.get(key));
          keyTimers.delete(key);
        }
      } else if (TimeCache.has(element)) {
        clearTimeout(TimeCache.get(element));
        TimeCache.delete(element);
      }
    },
  };

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
   * A global namespace for 'transitionProperty' string.
   * @type {string}
   */
  var transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

  /**
   * Utility to get the computed `transitionDelay`
   * from Element in miliseconds.
   *
   * @param {Element} element target
   * @return {number} the value in miliseconds
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
   * Utility to get the computed `transitionDuration`
   * from Element in miliseconds.
   *
   * @param {Element} element target
   * @return {number} the value in miliseconds
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
   * @param {EventListener} handler `transitionend` callback
   */
  function emulateTransitionEnd(element, handler) {
    var called = 0;
    var endEvent = new Event(transitionEndEvent);
    var duration = getElementTransitionDuration(element);
    var delay = getElementTransitionDelay(element);

    if (duration) {
      /**
       * Wrap the handler in on -> off callback
       * @param {Event} e Event object
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

  /**
   * A global namespace for most scroll event listeners.
   */
  var passiveHandler = supportPassive ? { passive: true } : false;

  /**
   * The raw value or a given component option.
   *
   * @typedef {string | Element | Function | number | boolean | null} niceValue
   */

  /**
   * Utility to normalize component options
   *
   * @param {any} value the input value
   * @return {niceValue} the normalized value
   */
  function normalizeValue(value) {
    if (value === 'true') { // boolean
      return true;
    }

    if (value === 'false') { // boolean
      return false;
    }

    if (!Number.isNaN(+value)) { // number
      return +value;
    }

    if (value === '' || value === 'null') { // null
      return null;
    }

    // string / function / Element / object
    return value;
  }

  /**
   * Shortcut for `Object.keys()` static method.
   * @param  {Record<string, any>} obj a target object
   * @returns {string[]}
   */
  var ObjectKeys = function (obj) { return Object.keys(obj); };

  /**
   * Utility to normalize component options
   *
   * @param {Element} element target
   * @param {Record<string, any>} defaultOps component default options
   * @param {Record<string, any>} inputOps component instance options
   * @param {string=} ns component namespace
   * @return {Record<string, any>} normalized component options object
   */
  function normalizeOptions(element, defaultOps, inputOps, ns) {
    // @ts-ignore -- usually our `Element` is `HTMLElement` as well
    var data = Object.assign({}, element.dataset);
    var normalOps = {};
    var dataOps = {};

    ObjectKeys(data).forEach(function (k) {
      var key = ns && k.includes(ns)
        ? k.replace(ns, '').replace(/[A-Z]/, function (match) { return match.toLowerCase(); })
        : k;

      dataOps[key] = normalizeValue(data[k]);
    });

    ObjectKeys(inputOps).forEach(function (k) {
      inputOps[k] = normalizeValue(inputOps[k]);
    });

    ObjectKeys(defaultOps).forEach(function (k) {
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

  var componentData = new Map();
  /**
   * An interface for web components background data.
   * @see https://github.com/thednp/bootstrap.native/blob/master/src/components/base-component.js
   */
  var Data = {
    /**
     * Sets web components data.
     * @param {Element | string} element target element
     * @param {string} component the component's name or a unique key
     * @param {any} instance the component instance
     */
    set: function (element, component, instance) {
      var ELEMENT = querySelector(element);
      if (!isElement(ELEMENT)) { return; }

      if (!componentData.has(component)) {
        componentData.set(component, new Map());
      }

      var instanceMap = componentData.get(component);
      instanceMap.set(ELEMENT, instance);
    },

    /**
     * Returns all instances for specified component.
     * @param {string} component the component's name or a unique key
     * @returns {any?} all the component instances
     */
    getAllFor: function (component) {
      if (componentData.has(component)) {
        return componentData.get(component);
      }
      return null;
    },

    /**
     * Returns the instance associated with the target.
     * @param {Element | string} element target element
     * @param {string} component the component's name or a unique key
     * @returns {any?} the instance
     */
    get: function (element, component) {
      var ELEMENT = querySelector(element);

      var allForC = Data.getAllFor(component);
      if (allForC && isElement(ELEMENT) && allForC.has(ELEMENT)) {
        return allForC.get(ELEMENT);
      }
      return null;
    },

    /**
     * Removes web components data.
     * @param {Element} element target element
     * @param {string} component the component's name or a unique key
     */
    remove: function (element, component) {
      if (!componentData.has(component)) { return; }

      var instanceMap = componentData.get(component);
      instanceMap.delete(element);

      if (instanceMap.size === 0) {
        componentData.delete(component);
      }
    },
  };

  /**
   * Shortcut for `window.getComputedStyle(element).propertyName`
   * static method.
   * * If `element` parameter is not an `Element`, `getComputedStyle`
   * throws a `ReferenceError`.
   * * If no property is defined, the entire `CSSStyleDeclaration`
   * instance is returned.
   *
   * @param {Element} element target
   * @param {string=} property the css property
   * @return {string} the css property value
   */
  function getElementStyle(element, property) {
    var computedStyle = getComputedStyle(element);

    return property && property in computedStyle
      ? computedStyle[property]
      : computedStyle;
  }

  /**
   * Checks if a page is Right To Left.
   * @returns {boolean} the query result
   */
  var isRTL = function () { return document.documentElement.dir === 'rtl'; };

  /**
   * Shortcut for `Object.assign()` static method.
   * @param  {Record<string, any>} obj a target object
   * @param  {Record<string, any>} source a source object
   */
  var ObjectAssign = function (obj, source) { return Object.assign(obj, source); };

  /**
   * Shortcut for `Array.from()` static method.
   *
   * @param  {any[] | HTMLCollection | NodeList} arr array-like iterable object
   * @returns {Array}
   */
  var ArrayFrom = function (arr) { return Array.from(arr); };

  /**
   * Shortcut for `Element.setAttribute()` method.
   * @param  {Element} element target element
   * @param  {string} attribute attribute name
   * @param  {string} value attribute value
   */
  var setAttribute = function (element, attribute, value) { return element.setAttribute(attribute, value); };

  /**
   * Shortcut for `Element.getElementsByClassName` method.
   *
   * @param {string} selector the class name
   * @param {Element=} parent optional Element to look into
   * @return {HTMLCollection} the 'HTMLCollection'
   */
  function getElementsByClassName(selector, parent) {
    var lookUp = parent && isElement(parent) ? parent : document;
    return lookUp.getElementsByClassName(selector);
  }

  /**
   * Shortcut for `Element.getElementsByTagName` method.
   *
   * @param {string} selector the tag name
   * @param {Element=} parent optional Element to look into
   * @return {HTMLCollection} the 'HTMLCollection'
   */
  function getElementsByTagName(selector, parent) {
    var lookUp = parent && isElement(parent) ? parent : document;
    return lookUp.getElementsByTagName(selector);
  }

  var version = "3.0.5";

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

  var defaultNavbarOptions = {
    breakpoint: 768,
    toggleSiblings: true,
    delay: 500,
  };

  var navbarEventOptions = { cancelable: true, bubbles: true };
  var showNavbarEvent = new CustomEvent('show.navbar', navbarEventOptions);
  var shownNavbarEvent = new CustomEvent('shown.navbar', navbarEventOptions);
  var hideNavbarEvent = new CustomEvent('hide.navbar', navbarEventOptions);
  var hiddenNavbarEvent = new CustomEvent('hidden.navbar', navbarEventOptions);

  /**
   * Returns a `Navbar` instance.
   * @param {Element} element target element
   * @returns {Navbar?} the `Navbar` instance
   */
  var getNavbarInstance = function (element) { return Data.get(element, navbarComponent); };

  /**
   * Returns a `Navbar` instance.
   * @param {Element} element target element
   * @returns {Navbar}
   */
  var initNavbarCallback = function (element) { return new Navbar(element); };

  // NAVBAR PRIVATE METHODS
  // ======================
  /** @param {boolean=} add */
  function toggleNavbarResizeEvent(add) {
    var action = add ? addEventListener : removeEventListener;
    if (!document.querySelector(("li." + openMobileClass))) {
      // @ts-ignore
      window[action](resizeEvent, resizeNavbarHandler, passiveHandler);
    }
  }

  function resizeNavbarHandler() {
    closeNavbars(getElementsByClassName(openMobileClass));
    toggleNavbarResizeEvent();
  }

  /**
   * Returns `TRUE` if is mobile.
   * @param {Navbar} self
   */
  function checkNavbarView(self) {
    // @ts-ignore
    var options = self.options;
    var menu = self.menu;
    var ref = getElementsByClassName(subnavToggleClass, menu);
    var firstToggle = ref[0];
    return (firstToggle && getElementStyle(firstToggle, 'display') !== 'none')
      || window.innerWidth < options.breakpoint;
  }

  /**
   * @param {Navbar} self
   * @param {boolean=} add
   */
  function toggleNavbarEvents(self, add) {
    var action = add ? addEventListener : removeEventListener;
    // @ts-ignore
    var items = self.items;
    var navbarToggle = self.navbarToggle;
    var menu = self.menu;

    ArrayFrom(items).forEach(function (x) {
      if (hasClass(x.lastElementChild, subnavClass)) {
        x[action](mouseenterEvent, navbarEnterHandler);
        x[action](mouseleaveEvent, navbarLeaveHandler);
      }

      var ref = getElementsByClassName(subnavToggleClass, x);
      var toggleElement = ref[0];
      // @ts-ignore
      if (toggleElement) { toggleElement[action](mouseclickEvent, navbarClickHandler); }
    });

    // @ts-ignore
    menu[action](keydownEvent, navbarKeyHandler);
    // @ts-ignore
    if (navbarToggle) { navbarToggle[action](mouseclickEvent, navbarClickHandler); }
  }

  /**
   * @param {Element} element
   * @param {string} selector
   * @returns {Element=}
   */
  function findChild(element, selector) {
    return ArrayFrom(element.children).find(function (x) { return selector === x.tagName || hasClass(x, selector); });
  }

  /** @param {Element} element */
  function openNavbar(element) {
    var subMenu = findChild(element, subnavClass);
    var anchor = findChild(element, 'A');

    var navOpenTransitionEnd = function () {
      Timer.clear(element, 'in');

      if (anchor) {
        anchor.dispatchEvent(shownNavbarEvent);
        setAttribute(anchor, ariaExpanded, 'true');
      }
    };

    if (anchor) {
      anchor.dispatchEvent(showNavbarEvent);
      if (showNavbarEvent.defaultPrevented) { return; }
    }

    addClass(element, openPositionClass);
    addClass(element, openNavClass);

    // @ts-ignore
    var siblings = getElementsByTagName('LI', element.parentElement);
    closeNavbars(ArrayFrom(siblings).filter(function (x) { return x !== element; }));

    if (subMenu) { emulateTransitionEnd(subMenu, navOpenTransitionEnd); }
    else { navOpenTransitionEnd(); }
  }

  /**
   * @param {Element} element
   * @param {boolean=} leave
   */
  function closeNavbar(element, leave) {
    var subMenu = findChild(element, subnavClass);
    var anchor = findChild(element, 'A');
    var toggleElement = findChild(element, subnavToggleClass);
    var navCloseTransitionEnd = function () {
      removeClass(element, openPositionClass);
      Timer.clear(element, 'out');
      if (anchor) {
        anchor.dispatchEvent(hiddenNavbarEvent);
        setAttribute(anchor, ariaExpanded, 'false');
      }
    };

    if (hasClass(element, openNavClass)) {
      if (anchor) {
        anchor.dispatchEvent(hideNavbarEvent);
        if (hideNavbarEvent.defaultPrevented) { return; }
      }
      removeClass(element, openNavClass);
      if (leave && subMenu) { emulateTransitionEnd(subMenu, navCloseTransitionEnd); }
      else { navCloseTransitionEnd(); }
    }
    if (hasClass(element, openMobileClass)) {
      if (anchor) { anchor.dispatchEvent(hideNavbarEvent); }
      if (hideNavbarEvent.defaultPrevented) { return; }
      removeClass(element, openMobileClass);

      [toggleElement, anchor].forEach(function (x) {
        if (x) { setAttribute(x, ariaExpanded, 'false'); }
      });
      if (anchor) { anchor.dispatchEvent(hiddenNavbarEvent); }
    }
  }

  /** @param {HTMLCollection | Element[]} collection */
  function closeNavbars(collection) {
    ArrayFrom(collection).forEach(function (x) { return closeNavbar(x); });
  }

  // NAVBAR EVENT LISTENERS
  // ======================
  /**
   * @this {Element}
   * @param {KeyboardEvent} e Event object
   */
  function navbarKeyHandler(e) {
    var code = e.code;
    var menu = this;
    var activeElement = document.activeElement;
    var self = getNavbarInstance(menu);
    if (!activeElement || !menu.contains(activeElement)) { return; }
    var element = activeElement.closest('LI');
    if (!element) { return; }
    // @ts-ignore
    var isMobile = checkNavbarView(self);
    var previousElementSibling = element.previousElementSibling;
    var nextElementSibling = element.nextElementSibling;
    var openParentElement = element.closest(("." + openNavClass));
    var parentMenu = element.closest('UL');
    var ref = getElementsByClassName(subnavClass, element);
    var subnavMenu = ref[0];
    var preventableEvents = [keySpace, keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp];
    var isColumn = parentMenu && getElementStyle(parentMenu, 'flex-direction') === 'column';
    var RTL = isRTL();
    var sidePrevKey = RTL ? keyArrowRight : keyArrowLeft;
    var sideNextKey = RTL ? keyArrowLeft : keyArrowRight;
    var prevSelection = parentMenu && previousElementSibling
      && ((code === keyArrowUp && isColumn) || (code === sidePrevKey && !isColumn));
    var nextSelection = parentMenu && nextElementSibling
      && ((code === keyArrowDown && isColumn) || (code === sideNextKey && !isColumn));
    /** @type {Element?} */
    var elementToFocus = null;

    if (code === keyEscape && openParentElement) {
      navbarLeaveHandler.call(openParentElement);
      elementToFocus = openParentElement;
    } else if (!isMobile && subnavMenu && code === keySpace) {
      if (hasClass(element, openNavClass)) { navbarLeaveHandler.call(element); }
      else { navbarEnterHandler.call(element); }
    }

    if (prevSelection && element !== parentMenu.firstElementChild) {
      elementToFocus = previousElementSibling;
    } else if (nextSelection && element !== parentMenu.lastElementChild) {
      elementToFocus = nextElementSibling;
    }

    // @ts-ignore
    if (elementToFocus) { elementToFocus.firstElementChild.focus(); }

    if (!isMobile && preventableEvents.includes(code)) {
      e.preventDefault();
    }
  }

  /**
   * @this {Element}
   * @param {PointerEvent} e Event object
   */
  function navbarClickHandler(e) {
    e.preventDefault();

    var target = e.target;
    var that = this;
    var menu = that.closest((navbarSelector + ",." + navbarString));
    var self = menu && getNavbarInstance(menu);
    // @ts-ignore
    var options = self.options;
    var navbarToggle = self.navbarToggle;

    // @ts-ignore
    if (self && (target === that || that.contains(target))) {
      var element = that.closest('LI') || menu;
      var toggleElement = that.closest(("." + navbarToggleClass)) === navbarToggle
        ? navbarToggle
        : findChild(element, subnavToggleClass);
      var anchor = toggleElement === navbarToggle
        ? null : findChild(element, 'A');
      var openSubs = getElementsByClassName(openMobileClass, element);

      if (!hasClass(element, openMobileClass)) {
        if (anchor) { anchor.dispatchEvent(showNavbarEvent); }
        if (showNavbarEvent.defaultPrevented) { return; }

        if (toggleElement !== navbarToggle) {
          toggleNavbarResizeEvent(true);
        }

        if (toggleElement !== navbarToggle) {
          var selection = options.toggleSiblings
            // @ts-ignore element.parentElement is an `Element`
            ? getElementsByClassName(openMobileClass, element.parentElement)
            : openSubs;
          closeNavbars(selection);
        }
        addClass(element, openMobileClass);

        if (toggleElement) { setAttribute(toggleElement, ariaExpanded, 'true'); }
        if (anchor) {
          setAttribute(anchor, ariaExpanded, 'true');
          anchor.dispatchEvent(shownNavbarEvent);
        }
      } else {
        if (anchor) { anchor.dispatchEvent(hideNavbarEvent); }
        if (hideNavbarEvent.defaultPrevented) { return; }

        closeNavbars(openSubs);
        removeClass(element, openMobileClass);

        if (toggleElement) {
          setAttribute(toggleElement, ariaExpanded, 'false');
          toggleNavbarResizeEvent();
        }
        if (anchor) {
          setAttribute(anchor, ariaExpanded, 'false');
          anchor.dispatchEvent(hiddenNavbarEvent);
        }
      }
    }
  }

  /** @this {Element} */
  function navbarEnterHandler() {
    var element = this;
    var menu = element.closest((navbarSelector + ",." + navbarString));
    var self = menu && getNavbarInstance(menu);
    var timerOut = Timer.get(element, 'out');

    // @ts-ignore
    if (!self || checkNavbarView(self)) { return; }

    Timer.clear(element, 'out');

    if (!hasClass(element, openNavClass) && !timerOut) {
      var enterCallback = function () { return openNavbar(element); };

      Timer.set(element, enterCallback, 17, 'in');
    }
  }

  /** @this {Element} */
  function navbarLeaveHandler() {
    var element = this;
    var menu = element.closest((navbarSelector + ",." + navbarString));
    var self = menu && getNavbarInstance(menu);

    // @ts-ignore
    if (!self || checkNavbarView(self)) { return; }

    if (hasClass(element, openNavClass)) {
      Timer.clear(element, 'in');
      var leaveCallback = function () { return closeNavbar(element, true); };

      // @ts-ignore
      Timer.set(element, leaveCallback, self.options.delay, 'out');
    }
  }

  // NAVBAR DEFINITION
  // =================
  /** Creates a new Navbar for desktop and mobile navigation. */
  var Navbar = function Navbar(target, config) {
    var assign;

    // bind
    var self = this;

    // instance targets
    /** @private @type {Element} */
    // @ts-ignore
    self.menu = querySelector(target);
    var menu = self.menu;

    // reset on re-init
    var existing = getNavbarInstance(menu);
    if (existing) { existing.dispose(); }

    /** @private @type {Record<string, any>} */
    self.options = normalizeOptions(menu, defaultNavbarOptions, config || {}, '');

    /** @private */
    self.items = getElementsByTagName('LI', menu);
    /** @private @type {Element?} */
    self.navbarToggle = null;
    (assign = getElementsByClassName(navbarToggleClass, menu), self.navbarToggle = assign[0]);

    // attach events
    toggleNavbarEvents(self, true);

    // attach instance to element
    Data.set(menu, navbarComponent, self);
  };

  var prototypeAccessors = { defaults: { configurable: true },version: { configurable: true },name: { configurable: true } };

  /* eslint-disable */
  /** @static */
  prototypeAccessors.defaults.get = function () { return defaultNavbarOptions; };
  /** @static */
  prototypeAccessors.version.get = function () { return Version; };
  /** @static */
  prototypeAccessors.name.get = function () { return navbarComponent; };
  /* eslint-enable */

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
    Data.remove(self.menu, navbarComponent);
  };

  Object.defineProperties( Navbar.prototype, prototypeAccessors );

  ObjectAssign(Navbar, {
    selector: navbarSelector,
    init: initNavbarCallback,
    getInstance: getNavbarInstance,
  });

  // DATA API
  /**
   * Navbar initialization callback
   * @param {Element | undefined} context Element
   */
  function initNavbar(context) {
    var lookup = context instanceof Element ? context : document;

    var selector = Navbar.selector;
    var init = Navbar.init;
    var navs = lookup.querySelectorAll(selector);

    Array.from(navs).map(function (x) { return init(x); });
  }
  // initialize when loaded
  if (document.body) { initNavbar(); }
  else { document.addEventListener('DOMContentLoaded', initNavbar, { once: true }); }

  return Navbar;

})));
