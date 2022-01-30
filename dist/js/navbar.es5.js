/*!
* Navbar.js v3.0.9 (http://thednp.github.io/navbar.js)
* Copyright 2016-2022 © thednp
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
   * Add eventListener to an `Element` | `HTMLElement` | `Document` target.
   *
   * @param {HTMLElement | Element | Document | Window} element event.target
   * @param {string} eventName event.type
   * @param {EventListenerObject['handleEvent']} handler callback
   * @param {(EventListenerOptions | boolean)=} options other event options
   */
  function on(element, eventName, handler, options) {
    var ops = options || false;
    element.addEventListener(eventName, handler, ops);
  }

  /**
   * Remove eventListener from an `Element` | `HTMLElement` | `Document` | `Window` target.
   *
   * @param {HTMLElement | Element | Document | Window} element event.target
   * @param {string} eventName event.type
   * @param {EventListenerObject['handleEvent']} handler callback
   * @param {(EventListenerOptions | boolean)=} options other event options
   */
  function off(element, eventName, handler, options) {
    var ops = options || false;
    element.removeEventListener(eventName, handler, ops);
  }

  /**
   * Returns the `document` or the `#document` element.
   * @see https://github.com/floating-ui/floating-ui
   * @param {(Node | HTMLElement | Element | globalThis)=} node
   * @returns {Document}
   */
  function getDocument(node) {
    if (node instanceof HTMLElement) { return node.ownerDocument; }
    if (node instanceof Window) { return node.document; }
    return window.document;
  }

  /**
   * A global array of possible `ParentNode`.
   */
  var parentNodes = [Document, Node, Element, HTMLElement];

  /**
   * A global array with `Element` | `HTMLElement`.
   */
  var elementNodes = [Element, HTMLElement];

  /**
   * Utility to check if target is typeof `HTMLElement`, `Element`, `Node`
   * or find one that matches a selector.
   *
   * @param {HTMLElement | Element | string} selector the input selector or target element
   * @param {(HTMLElement | Element | Node | Document)=} parent optional node to look into
   * @return {(HTMLElement | Element)?} the `HTMLElement` or `querySelector` result
   */
  function querySelector(selector, parent) {
    var selectorIsString = typeof selector === 'string';
    var lookUp = parent && parentNodes.some(function (x) { return parent instanceof x; })
      ? parent : getDocument();

    if (!selectorIsString && elementNodes.some(function (x) { return selector instanceof x; })) {
      return selector;
    }
    // @ts-ignore -- `ShadowRoot` is also a node
    return selectorIsString ? lookUp.querySelector(selector) : null;
  }

  /** @type {Map<HTMLElement | Element, any>} */
  var TimeCache = new Map();
  /**
   * An interface for one or more `TimerHandler`s per `Element`.
   * @see https://github.com/thednp/navbar.js/
   */
  var Timer = {
    /**
     * Sets a new timeout timer for an element, or element -> key association.
     * @param {HTMLElement | Element | string} target target element
     * @param {ReturnType<TimerHandler>} callback the callback
     * @param {number} delay the execution delay
     * @param {string=} key a unique
     */
    set: function (target, callback, delay, key) {
      var element = querySelector(target);

      if (!element) { return; }

      if (key && key.length) {
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
     * @param {HTMLElement | Element | string} target target element
     * @param {string=} key a unique
     * @returns {number?} the timer
     */
    get: function (target, key) {
      var element = querySelector(target);

      if (!element) { return null; }
      var keyTimers = TimeCache.get(element);

      if (key && key.length && keyTimers && keyTimers.get) {
        return keyTimers.get(key) || null;
      }
      return keyTimers || null;
    },

    /**
     * Clears the element's timer.
     * @param {HTMLElement | Element | string} target target element
     * @param {string=} key a unique key
     */
    clear: function (target, key) {
      var element = querySelector(target);

      if (!element) { return; }

      if (key && key.length) {
        var keyTimers = TimeCache.get(element);

        if (keyTimers && keyTimers.get) {
          clearTimeout(keyTimers.get(key));
          keyTimers.delete(key);
          if (keyTimers.size === 0) {
            TimeCache.delete(element);
          }
        }
      } else {
        clearTimeout(TimeCache.get(element));
        TimeCache.delete(element);
      }
    },
  };

  /**
   * Returns the `Window` object of a target node.
   * @see https://github.com/floating-ui/floating-ui
   *
   * @param {(Node | HTMLElement | Element | Window)=} node target node
   * @returns {globalThis}
   */
  function getWindow(node) {
    if (node == null) {
      return window;
    }

    if (!(node instanceof Window)) {
      var ownerDocument = node.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView || window : window;
    }

    // @ts-ignore
    return node;
  }

  /**
   * Shortcut for `window.getComputedStyle(element).propertyName`
   * static method.
   *
   * * If `element` parameter is not an `HTMLElement`, `getComputedStyle`
   * throws a `ReferenceError`.
   *
   * @param {HTMLElement | Element} element target
   * @param {string} property the css property
   * @return {string} the css property value
   */
  function getElementStyle(element, property) {
    var computedStyle = getComputedStyle(element);

    // @ts-ignore -- must use camelcase strings,
    // or non-camelcase strings with `getPropertyValue`
    return property in computedStyle ? computedStyle[property] : '';
  }

  /**
   * A global namespace for 'transitionend' string.
   * @type {string}
   */
  var transitionEndEvent = 'transitionend';

  /**
   * A global namespace for 'transitionDelay' string.
   * @type {string}
   */
  var transitionDelay = 'transitionDelay';

  /**
   * A global namespace for:
   * * `transitionProperty` string for Firefox,
   * * `transition` property for all other browsers.
   *
   * @type {string}
   */
  var transitionProperty = 'transitionProperty';

  /**
   * Utility to get the computed `transitionDelay`
   * from Element in miliseconds.
   *
   * @param {HTMLElement | Element} element target
   * @return {number} the value in miliseconds
   */
  function getElementTransitionDelay(element) {
    var propertyValue = getElementStyle(element, transitionProperty);
    var delayValue = getElementStyle(element, transitionDelay);

    var delayScale = delayValue.includes('ms') ? 1 : 1000;
    var duration = propertyValue && propertyValue !== 'none'
      ? parseFloat(delayValue) * delayScale : 0;

    return !Number.isNaN(duration) ? duration : 0;
  }

  /**
   * A global namespace for 'transitionDuration' string.
   * @type {string}
   */
  var transitionDuration = 'transitionDuration';

  /**
   * Utility to get the computed `transitionDuration`
   * from Element in miliseconds.
   *
   * @param {HTMLElement | Element} element target
   * @return {number} the value in miliseconds
   */
  function getElementTransitionDuration(element) {
    var propertyValue = getElementStyle(element, transitionProperty);
    var durationValue = getElementStyle(element, transitionDuration);
    var durationScale = durationValue.includes('ms') ? 1 : 1000;
    var duration = propertyValue && propertyValue !== 'none'
      ? parseFloat(durationValue) * durationScale : 0;

    return !Number.isNaN(duration) ? duration : 0;
  }

  /**
   * Utility to make sure callbacks are consistently
   * called when transition ends.
   *
   * @param {HTMLElement | Element} element target
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
       * @param {TransitionEvent} e Event object
       */
      var transitionEndWrapper = function (e) {
        if (e.target === element) {
          handler.apply(element, [e]);
          off(element, transitionEndEvent, transitionEndWrapper);
          called = 1;
        }
      };
      on(element, transitionEndEvent, transitionEndWrapper);
      setTimeout(function () {
        if (!called) { element.dispatchEvent(endEvent); }
      }, duration + delay + 17);
    } else {
      handler.apply(element, [endEvent]);
    }
  }

  /**
   * A global namespace for most scroll event listeners.
   * @type {Partial<AddEventListenerOptions>}
   */
  var passiveHandler = { passive: true };

  /**
   * Shortcut for `HTMLElement.getAttribute()` method.
   * @param  {HTMLElement | Element} element target element
   * @param  {string} attribute attribute name
   */
  var getAttribute = function (element, attribute) { return element.getAttribute(attribute); };

  /**
   * The raw value or a given component option.
   *
   * @typedef {string | HTMLElement | Function | number | boolean | null} niceValue
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

    // string / function / HTMLElement / object
    return value;
  }

  /**
   * Shortcut for `Object.keys()` static method.
   * @param  {Record<string, any>} obj a target object
   * @returns {string[]}
   */
  var ObjectKeys = function (obj) { return Object.keys(obj); };

  /**
   * Shortcut for `String.toLowerCase()`.
   *
   * @param {string} source input string
   * @returns {string} lowercase output string
   */
  var toLowerCase = function (source) { return source.toLowerCase(); };

  /**
   * Utility to normalize component options.
   *
   * @param {HTMLElement | Element} element target
   * @param {Record<string, any>} defaultOps component default options
   * @param {Record<string, any>} inputOps component instance options
   * @param {string=} ns component namespace
   * @return {Record<string, any>} normalized component options object
   */
  function normalizeOptions(element, defaultOps, inputOps, ns) {
    // @ts-ignore -- our targets are always `HTMLElement`
    var data = Object.assign({}, element.dataset);
    /** @type {Record<string, any>} */
    var normalOps = {};
    /** @type {Record<string, any>} */
    var dataOps = {};
    var title = 'title';

    ObjectKeys(data).forEach(function (k) {
      var key = ns && k.includes(ns)
        ? k.replace(ns, '').replace(/[A-Z]/, function (match) { return toLowerCase(match); })
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
        normalOps[k] = k === title
          ? getAttribute(element, title)
          : defaultOps[k];
      }
    });

    return normalOps;
  }

  /**
   * Shortcut for `Object.assign()` static method.
   * @param  {Record<string, any>} obj a target object
   * @param  {Record<string, any>} source a source object
   */
  var ObjectAssign = function (obj, source) { return Object.assign(obj, source); };

  /**
   * Returns a namespaced `CustomEvent` specific to each component.
   * @param {string} EventType Event.type
   * @param {Record<string, any>=} config Event.options | Event.properties
   * @returns {SHORTER.OriginalEvent} a new namespaced event
   */
  function OriginalEvent(EventType, config) {
    var OriginalCustomEvent = new CustomEvent(EventType, {
      cancelable: true, bubbles: true,
    });

    if (config instanceof Object) {
      ObjectAssign(OriginalCustomEvent, config);
    }
    return OriginalCustomEvent;
  }

  /**
   * Add class to `HTMLElement.classList`.
   *
   * @param {HTMLElement | Element} element target
   * @param {string} classNAME to add
   */
  function addClass(element, classNAME) {
    element.classList.add(classNAME);
  }

  /**
   * Check class in `HTMLElement.classList`.
   *
   * @param {HTMLElement | Element} element target
   * @param {string} classNAME to check
   * @return {boolean}
   */
  function hasClass(element, classNAME) {
    return element.classList.contains(classNAME);
  }

  /**
   * Remove class from `HTMLElement.classList`.
   *
   * @param {HTMLElement | Element} element target
   * @param {string} classNAME to remove
   */
  function removeClass(element, classNAME) {
    element.classList.remove(classNAME);
  }

  /** @type {Map<string, Map<HTMLElement | Element, Record<string, any>>>} */
  var componentData = new Map();
  /**
   * An interface for web components background data.
   * @see https://github.com/thednp/bootstrap.native/blob/master/src/components/base-component.js
   */
  var Data = {
    /**
     * Sets web components data.
     * @param {HTMLElement | Element | string} target target element
     * @param {string} component the component's name or a unique key
     * @param {Record<string, any>} instance the component instance
     */
    set: function (target, component, instance) {
      var element = querySelector(target);
      if (!element) { return; }

      if (!componentData.has(component)) {
        componentData.set(component, new Map());
      }

      var instanceMap = componentData.get(component);
      // @ts-ignore - not undefined, but defined right above
      instanceMap.set(element, instance);
    },

    /**
     * Returns all instances for specified component.
     * @param {string} component the component's name or a unique key
     * @returns {Map<HTMLElement | Element, Record<string, any>>?} all the component instances
     */
    getAllFor: function (component) {
      var instanceMap = componentData.get(component);

      return instanceMap || null;
    },

    /**
     * Returns the instance associated with the target.
     * @param {HTMLElement | Element | string} target target element
     * @param {string} component the component's name or a unique key
     * @returns {Record<string, any>?} the instance
     */
    get: function (target, component) {
      var element = querySelector(target);
      var allForC = Data.getAllFor(component);
      var instance = element && allForC && allForC.get(element);

      return instance || null;
    },

    /**
     * Removes web components data.
     * @param {HTMLElement | Element | string} target target element
     * @param {string} component the component's name or a unique key
     */
    remove: function (target, component) {
      var element = querySelector(target);
      var instanceMap = componentData.get(component);
      if (!instanceMap || !element) { return; }

      instanceMap.delete(element);

      if (instanceMap.size === 0) {
        componentData.delete(component);
      }
    },
  };

  /**
   * An alias for `Data.get()`.
   * @type {SHORTER.getInstance<any>}
   */
  var getInstance = function (target, component) { return Data.get(target, component); };

  /**
   * Returns the `document.documentElement` or the `<html>` element.
   *
   * @param {(Node | HTMLElement | Element | globalThis)=} node
   * @returns {HTMLElement | HTMLHtmlElement}
   */
  function getDocumentElement(node) {
    return getDocument(node).documentElement;
  }

  /**
   * Checks if a page is Right To Left.
   * @param {(HTMLElement | Element)=} node the target
   * @returns {boolean} the query result
   */
  var isRTL = function (node) { return getDocumentElement(node).dir === 'rtl'; };

  /**
   * Shortcut for `Array.from()` static method.
   *
   * @param  {any[] | HTMLCollection | NodeList | Map<any, any>} arr array-like iterable object
   * @returns {Array<any>}
   */
  var ArrayFrom = function (arr) { return Array.from(arr); };

  /**
   * Shortcut for `HTMLElement.setAttribute()` method.
   * @param  {HTMLElement | Element} element target element
   * @param  {string} attribute attribute name
   * @param  {string} value attribute value
   */
  var setAttribute = function (element, attribute, value) { return element.setAttribute(attribute, value); };

  /**
   * Shortcut for `HTMLElement.getElementsByClassName` method. Some `Node` elements
   * like `ShadowRoot` do not support `getElementsByClassName`.
   *
   * @param {string} selector the class name
   * @param {(HTMLElement | Element | Document)=} parent optional Element to look into
   * @return {HTMLCollectionOf<HTMLElement | Element>} the 'HTMLCollection'
   */
  function getElementsByClassName(selector, parent) {
    var lookUp = parent && parentNodes.some(function (x) { return parent instanceof x; })
      ? parent : getDocument();
    return lookUp.getElementsByClassName(selector);
  }

  /**
   * Shortcut for `HTMLElement.getElementsByTagName` method. Some `Node` elements
   * like `ShadowRoot` do not support `getElementsByTagName`.
   *
   * @param {string} selector the tag name
   * @param {(HTMLElement | Element | Document)=} parent optional Element to look into
   * @return {HTMLCollectionOf<HTMLElement | Element>} the 'HTMLCollection'
   */
  function getElementsByTagName(selector, parent) {
    var lookUp = parent && parentNodes
      .some(function (x) { return parent instanceof x; }) ? parent : getDocument();
    return lookUp.getElementsByTagName(selector);
  }

  /**
   * Shortcut for `HTMLElement.closest` method which also works
   * with children of `ShadowRoot`. The order of the parameters
   * is intentional since they're both required.
   *
   * @see https://stackoverflow.com/q/54520554/803358
   *
   * @param {HTMLElement | Element} element Element to look into
   * @param {string} selector the selector name
   * @return {(HTMLElement | Element)?} the query result
   */
  function closest(element, selector) {
    return element ? (element.closest(selector)
      // @ts-ignore -- break out of `ShadowRoot`
      || closest(element.getRootNode().host, selector)) : null;
  }

  var version = "3.0.9";

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

  var showNavbarEvent = OriginalEvent(("show." + navbarString));
  var shownNavbarEvent = OriginalEvent(("shown." + navbarString));
  var hideNavbarEvent = OriginalEvent(("hide." + navbarString));
  var hiddenNavbarEvent = OriginalEvent(("hidden." + navbarString));

  /**
   * Returns a `Navbar` instance.
   * @param {HTMLElement | Element} element target element
   * @returns {Navbar?}
   */
  var getNavbarInstance = function (element) { return getInstance(element, navbarComponent); };

  /**
   * Returns a `Navbar` instance.
   * @param {HTMLElement} element target element
   * @returns {Navbar}
   */
  var initNavbarCallback = function (element) { return new Navbar(element); };

  // NAVBAR PRIVATE METHODS
  // ======================
  /**
   * @param {Navbar} self
   * @param {boolean=} add
   */
  function toggleNavbarResizeEvent(self, add) {
    var action = add ? on : off;
    var menu = self.menu;
    if (!querySelector(("li." + openMobileClass), getDocument(menu))) {
      var resizeListener = function () { return resizeNavbarHandler(self); };
      // @ts-ignore
      action(getWindow(menu), resizeEvent, resizeListener, passiveHandler);
    }
  }

  /** @param {Navbar} self */
  function resizeNavbarHandler(self) {
    // don't close the navbar when scroll down triggers resize
    if (!checkNavbarView(self)) {
      closeNavbars(getElementsByClassName(openMobileClass));
      toggleNavbarResizeEvent(self);
    }
  }

  /**
   * Returns `TRUE` if is mobile.
   * @param {Navbar} self
   */
  function checkNavbarView(self) {
    // @ts-ignore
    var options = self.options;
    var menu = self.menu;
    // @ts-ignore
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
    var action = add ? on : off;
    var items = self.items;
    var navbarToggle = self.navbarToggle;
    var menu = self.menu;

    [].concat( items ).forEach(function (x) {
      var lastElementChild = x.lastElementChild;
      if (lastElementChild && hasClass(lastElementChild, subnavClass)) {
        action(x, mouseenterEvent, navbarEnterHandler);
        action(x, mouseleaveEvent, navbarLeaveHandler);
      }

      var ref = getElementsByClassName(subnavToggleClass, x);
      var toggleElement = ref[0];
      if (toggleElement) { action(toggleElement, mouseclickEvent, navbarClickHandler); }
    });

    action(menu, keydownEvent, navbarKeyHandler);
    if (navbarToggle) { action(navbarToggle, mouseclickEvent, navbarClickHandler); }
  }

  /**
   * @param {HTMLElement | Element} element
   * @param {string} selector
   * @returns {HTMLElement=}
   */
  function findChild(element, selector) {
    return ArrayFrom(element.children).find(function (x) { return selector === x.tagName || hasClass(x, selector); });
  }

  /** @param {HTMLElement | Element} element */
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
   * @param {HTMLElement | Element} element
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
   * @this {HTMLElement | Element}
   * @param {KeyboardEvent} e Event object
   */
  function navbarKeyHandler(e) {
    var code = e.code;
    var menu = this;
    var activeElement = document.activeElement;
    var self = getNavbarInstance(menu);

    if (!self || !activeElement || !menu.contains(activeElement)) { return; }

    var element = closest(activeElement, 'LI');
    if (!element) { return; }

    var isMobile = checkNavbarView(self);
    var previousElementSibling = element.previousElementSibling;
    var nextElementSibling = element.nextElementSibling;
    var openParentElement = closest(element, ("." + openNavClass));
    var parentMenu = closest(element, 'UL');
    var ref = getElementsByClassName(subnavClass, element);
    var subnavMenu = ref[0];
    var preventableEvents = [keySpace, keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp];
    var isColumn = parentMenu && getElementStyle(parentMenu, 'flex-direction') === 'column';
    var RTL = isRTL(element);
    var sidePrevKey = RTL ? keyArrowRight : keyArrowLeft;
    var sideNextKey = RTL ? keyArrowLeft : keyArrowRight;
    var prevSelection = parentMenu && previousElementSibling
      && ((code === keyArrowUp && isColumn) || (code === sidePrevKey && !isColumn));
    var nextSelection = parentMenu && nextElementSibling
      && ((code === keyArrowDown && isColumn) || (code === sideNextKey && !isColumn));
    /** @type {(HTMLElement | Element)?} */
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
    var firstElementChild = elementToFocus.firstElementChild;
    if (firstElementChild) { firstElementChild.focus(); }

    if (!isMobile && preventableEvents.includes(code)) {
      e.preventDefault();
    }
  }

  /**
   * @this {HTMLElement | Element}
   * @param {MouseEvent} e Event object
   */
  function navbarClickHandler(e) {
    e.preventDefault();

    var target = e.target;
    var that = this;
    var menu = closest(that, (navbarSelector + ",." + navbarString));
    var self = menu && getNavbarInstance(menu);
    if (!self) { return; }

    var options = self.options;
    var navbarToggle = self.navbarToggle;

    // @ts-ignore
    if (target === that || that.contains(target)) {
      var element = closest(that, 'LI') || menu;
      var toggleElement = closest(that, ("." + navbarToggleClass)) === navbarToggle
        ? navbarToggle
        : findChild(element, subnavToggleClass);
      var anchor = toggleElement === navbarToggle
        ? null : findChild(element, 'A');
      var openSubs = getElementsByClassName(openMobileClass, element);

      if (!hasClass(element, openMobileClass)) {
        if (anchor) { anchor.dispatchEvent(showNavbarEvent); }
        if (showNavbarEvent.defaultPrevented) { return; }

        if (toggleElement !== navbarToggle) {
          toggleNavbarResizeEvent(self, true);
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
          toggleNavbarResizeEvent(self);
        }
        if (anchor) {
          setAttribute(anchor, ariaExpanded, 'false');
          anchor.dispatchEvent(hiddenNavbarEvent);
        }
      }
    }
  }

  /** @this {HTMLElement | Element} */
  function navbarEnterHandler() {
    var element = this;
    var menu = closest(element, (navbarSelector + ",." + navbarString));
    var self = menu && getNavbarInstance(menu);
    var timerOut = Timer.get(element, 'out');

    if (!self || checkNavbarView(self)) { return; }

    Timer.clear(element, 'out');

    if (!hasClass(element, openNavClass) && !timerOut) {
      var enterCallback = function () { return openNavbar(element); };

      Timer.set(element, enterCallback, 17, 'in');
    }
  }

  /** @this {HTMLElement | Element} */
  function navbarLeaveHandler() {
    var element = this;
    var menu = closest(element, (navbarSelector + ",." + navbarString));
    var self = menu && getNavbarInstance(menu);

    if (!self || checkNavbarView(self)) { return; }

    if (hasClass(element, openNavClass)) {
      Timer.clear(element, 'in');
      var leaveCallback = function () { return closeNavbar(element, true); };

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
    /** @type {(HTMLElement | Element)} */
    // @ts-ignore -- we invalidate right after
    self.menu = querySelector(target);
    var menu = self.menu;

    // invalidate
    if (!menu) { return; }

    // reset on re-init
    var existing = getNavbarInstance(menu);
    if (existing) { existing.dispose(); }

    /** @type {Record<string, any>} */
    self.options = normalizeOptions(menu, defaultNavbarOptions, config || {}, '');

    /** @type {HTMLCollectionOf<Element | HTMLElement>} */
    self.items = getElementsByTagName('LI', menu);
    /** @type {(HTMLElement | Element)?} */
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
    toggleNavbarResizeEvent(self);
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
   * @param {HTMLElement=} context Element
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
