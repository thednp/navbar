/*!
* Navbar.js v3.0.6 (http://thednp.github.io/navbar.js)
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
  const keySpace = 'Space';

  /**
   * A global namespace for `Escape` key.
   * @type {string} e.which = 27 equivalent
   */
  const keyEscape = 'Escape';

  /**
   * A global namespace for `ArrowUp` key.
   * @type {string} e.which = 38 equivalent
   */
  const keyArrowUp = 'ArrowUp';

  /**
   * A global namespace for `ArrowDown` key.
   * @type {string} e.which = 40 equivalent
   */
  const keyArrowDown = 'ArrowDown';

  /**
   * A global namespace for `ArrowLeft` key.
   * @type {string} e.which = 37 equivalent
   */
  const keyArrowLeft = 'ArrowLeft';

  /**
   * A global namespace for `ArrowRight` key.
   * @type {string} e.which = 39 equivalent
   */
  const keyArrowRight = 'ArrowRight';

  /**
   * A global namespace for aria-expanded.
   * @type {string}
   */
  const ariaExpanded = 'aria-expanded';

  /**
   * A global namespace for 'addEventListener' string.
   * @type {string}
   */
  const addEventListener = 'addEventListener';

  /**
   * A global namespace for 'removeEventListener' string.
   * @type {string}
   */
  const removeEventListener = 'removeEventListener';

  /**
   * A global namespace for `mouseenter` event.
   * @type {string}
   */
  const mouseenterEvent = 'mouseenter';

  /**
   * A global namespace for `mouseleave` event.
   * @type {string}
   */
  const mouseleaveEvent = 'mouseleave';

  /**
   * A global namespace for `click` event.
   * @type {string}
   */
  const mouseclickEvent = 'click';

  /**
   * A global namespace for `keydown` event.
   * @type {string}
   */
  const keydownEvent = 'keydown';

  /**
   * A global namespace for `resize` event.
   * @type {string}
   */
  const resizeEvent = 'resize';

  /**
   * Utility to check if target is typeof `HTMLElement`, `Element`, `Node`
   * or find one that matches a selector.
   *
   * @param {HTMLElement | string} selector the input selector or target element
   * @param {(Node | Element | HTMLElement)=} parent optional node to look into
   * @return {HTMLElement?} the `HTMLElement` or `querySelector` result
   */
  function querySelector(selector, parent) {
    const nodeTypes = [HTMLElement, Element, Node];
    const lookUp = parent && nodeTypes.some((x) => parent instanceof x) ? parent : document;

    return nodeTypes.some((x) => selector instanceof x)
      // @ts-ignore -- we must include ShadowRoot Node
      ? selector : lookUp.querySelector(selector);
  }

  /** @type {Map<HTMLElement, any>} */
  const TimeCache = new Map();
  /**
   * An interface for one or more `TimerHandler`s per `Element`.
   * @see https://github.com/thednp/navbar.js/
   */
  const Timer = {
    /**
     * Sets a new timeout timer for an element, or element -> key association.
     * @param {HTMLElement | string} target target element
     * @param {ReturnType<TimerHandler>} callback the callback
     * @param {number} delay the execution delay
     * @param {string=} key a unique
     */
    set: (target, callback, delay, key) => {
      const element = querySelector(target);

      if (!element) return;

      if (key && key.length) {
        if (!TimeCache.has(element)) {
          TimeCache.set(element, new Map());
        }
        const keyTimers = TimeCache.get(element);
        keyTimers.set(key, setTimeout(callback, delay));
      } else {
        TimeCache.set(element, setTimeout(callback, delay));
      }
    },

    /**
     * Returns the timer associated with the target.
     * @param {HTMLElement | string} target target element
     * @param {string=} key a unique
     * @returns {ReturnType<TimerHandler>?} the timer
     */
    get: (target, key) => {
      const element = querySelector(target);

      if (!element) return null;

      if (key && key.length) {
        if (!TimeCache.has(element)) {
          TimeCache.set(element, new Map());
        }
        const keyTimers = TimeCache.get(element);
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
     * @param {HTMLElement} target target element
     * @param {string=} key a unique
     */
    clear: (target, key) => {
      const element = querySelector(target);
      const timers = element && TimeCache.get(element);

      if (!timers) return;

      if (key && key.length) {
        if (timers.has(key)) {
          clearTimeout(timers.get(key));
          timers.delete(key);
        }
      } else {
        clearTimeout(timers);
        TimeCache.delete(element);
      }
    },
  };

  /**
   * A global namespace for 'transitionend' string.
   * @type {string}
   */
  const transitionEndEvent = 'transitionend';

  /**
   * A global namespace for 'transitionDelay' string.
   * @type {string}
   */
  const transitionDelay = 'transitionDelay';

  /**
   * A global namespace for:
   * * `transitionProperty` string for Firefox,
   * * `transition` property for all other browsers.
   *
   * @type {string}
   */
  const transitionProperty = 'transitionProperty';

  /**
   * Shortcut for `window.getComputedStyle(element).propertyName`
   * static method.
   *
   * * If `element` parameter is not an `HTMLElement`, `getComputedStyle`
   * throws a `ReferenceError`.
   *
   * @param {HTMLElement} element target
   * @param {string} property the css property
   * @return {string} the css property value
   */
  function getElementStyle(element, property) {
    const computedStyle = getComputedStyle(element);

    // @ts-ignore -- must use camelcase strings,
    // or non-camelcase strings with `getPropertyValue`
    return property in computedStyle ? computedStyle[property] : '';
  }

  /**
   * Utility to get the computed `transitionDelay`
   * from Element in miliseconds.
   *
   * @param {HTMLElement} element target
   * @return {number} the value in miliseconds
   */
  function getElementTransitionDelay(element) {
    const propertyValue = getElementStyle(element, transitionProperty);
    const delayValue = getElementStyle(element, transitionDelay);

    const delayScale = delayValue.includes('ms') ? 1 : 1000;
    const duration = propertyValue && propertyValue !== 'none'
      ? parseFloat(delayValue) * delayScale : 0;

    return !Number.isNaN(duration) ? duration : 0;
  }

  /**
   * A global namespace for 'transitionDuration' string.
   * @type {string}
   */
  const transitionDuration = 'transitionDuration';

  /**
   * Utility to get the computed `transitionDuration`
   * from Element in miliseconds.
   *
   * @param {HTMLElement} element target
   * @return {number} the value in miliseconds
   */
  function getElementTransitionDuration(element) {
    const propertyValue = getElementStyle(element, transitionProperty);
    const durationValue = getElementStyle(element, transitionDuration);
    const durationScale = durationValue.includes('ms') ? 1 : 1000;
    const duration = propertyValue && propertyValue !== 'none'
      ? parseFloat(durationValue) * durationScale : 0;

    return !Number.isNaN(duration) ? duration : 0;
  }

  /**
   * Utility to make sure callbacks are consistently
   * called when transition ends.
   *
   * @param {HTMLElement} element target
   * @param {EventListener} handler `transitionend` callback
   */
  function emulateTransitionEnd(element, handler) {
    let called = 0;
    const endEvent = new Event(transitionEndEvent);
    const duration = getElementTransitionDuration(element);
    const delay = getElementTransitionDelay(element);

    if (duration) {
      /**
       * Wrap the handler in on -> off callback
       * @param {Event} e Event object
       */
      const transitionEndWrapper = (e) => {
        if (e.target === element) {
          handler.apply(element, [e]);
          element.removeEventListener(transitionEndEvent, transitionEndWrapper);
          called = 1;
        }
      };
      element.addEventListener(transitionEndEvent, transitionEndWrapper);
      setTimeout(() => {
        if (!called) element.dispatchEvent(endEvent);
      }, duration + delay + 17);
    } else {
      handler.apply(element, [endEvent]);
    }
  }

  /**
   * A global namespace for `DOMContentLoaded` event.
   * @type {string}
   */
  const DOMContentLoadedEvent = 'DOMContentLoaded';

  /**
   * Add eventListener to an `HTMLElement` | `Document` target.
   *
   * @param {HTMLElement | Document} element event.target
   * @param {string} eventName event.type
   * @param {EventListener} handler callback
   * @param {EventListenerOptions | boolean | undefined} options other event options
   */
  function on(element, eventName, handler, options) {
    const ops = options || false;
    element.addEventListener(eventName, handler, ops);
  }

  /**
   * Remove eventListener from an `HTMLElement` | `Document` target.
   *
   * @param {HTMLElement | Document} element event.target
   * @param {string} eventName event.type
   * @param {EventListener} handler callback
   * @param {EventListenerOptions | boolean | undefined} options other event options
   */
  function off(element, eventName, handler, options) {
    const ops = options || false;
    element.removeEventListener(eventName, handler, ops);
  }

  /**
   * Add an `eventListener` to an `HTMLElement` | `Document` target
   * and remove it once callback is called.
   *
   * @param {HTMLElement | Document} element event.target
   * @param {string} eventName event.type
   * @param {EventListener} handler callback
   * @param {EventListenerOptions | boolean | undefined} options other event options
   */
  function one(element, eventName, handler, options) {
  /**
   * Wrap the handler for easy on -> off
   * @param {Event} e the Event object
   */
    function handlerWrapper(e) {
      if (e.target === element) {
        handler.apply(element, [e]);
        off(element, eventName, handlerWrapper, options);
      }
    }
    on(element, eventName, handlerWrapper, options);
  }

  /**
   * A global `boolean` for passive events support,
   * in general event options are not suited for scroll prevention.
   *
   * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
   * @type {boolean}
   */
  const supportPassive = (() => {
    let result = false;
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get() {
          result = true;
          return result;
        },
      });
      one(document, DOMContentLoadedEvent, () => {}, opts);
    } catch (e) {
      throw Error('Passive events are not supported');
    }

    return result;
  })();

  /**
   * A global namespace for most scroll event listeners.
   */
  const passiveHandler = supportPassive ? { passive: true } : false;

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
  const ObjectKeys = (obj) => Object.keys(obj);

  /**
   * Utility to normalize component options.
   *
   * @param {HTMLElement} element target
   * @param {Record<string, any>} defaultOps component default options
   * @param {Record<string, any>} inputOps component instance options
   * @param {string=} ns component namespace
   * @return {Record<string, any>} normalized component options object
   */
  function normalizeOptions(element, defaultOps, inputOps, ns) {
    const data = { ...element.dataset };
    /** @type {Record<string, any>} */
    const normalOps = {};
    /** @type {Record<string, any>} */
    const dataOps = {};

    ObjectKeys(data).forEach((k) => {
      const key = ns && k.includes(ns)
        ? k.replace(ns, '').replace(/[A-Z]/, (match) => match.toLowerCase())
        : k;

      dataOps[key] = normalizeValue(data[k]);
    });

    ObjectKeys(inputOps).forEach((k) => {
      inputOps[k] = normalizeValue(inputOps[k]);
    });

    ObjectKeys(defaultOps).forEach((k) => {
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
   * Add class to `HTMLElement.classList`.
   *
   * @param {HTMLElement} element target
   * @param {string} classNAME to add
   */
  function addClass(element, classNAME) {
    element.classList.add(classNAME);
  }

  /**
   * Check class in `HTMLElement.classList`.
   *
   * @param {HTMLElement} element target
   * @param {string} classNAME to check
   * @return {boolean}
   */
  function hasClass(element, classNAME) {
    return element.classList.contains(classNAME);
  }

  /**
   * Remove class from `HTMLElement.classList`.
   *
   * @param {HTMLElement} element target
   * @param {string} classNAME to remove
   */
  function removeClass(element, classNAME) {
    element.classList.remove(classNAME);
  }

  /** @type {Map<string, Map<HTMLElement, SHORTER.Component>>} */
  const componentData = new Map();
  /**
   * An interface for web components background data.
   * @see https://github.com/thednp/bootstrap.native/blob/master/src/components/base-component.js
   */
  const Data = {
    /**
     * Sets web components data.
     * @param {HTMLElement | string} target target element
     * @param {string} component the component's name or a unique key
     * @param {SHORTER.Component} instance the component instance
     */
    set: (target, component, instance) => {
      const element = querySelector(target);
      if (!element) return;

      if (!componentData.has(component)) {
        componentData.set(component, new Map());
      }

      const instanceMap = componentData.get(component);
      // @ts-ignore - not undefined, but defined right above
      instanceMap.set(element, instance);
    },

    /**
     * Returns all instances for specified component.
     * @param {string} component the component's name or a unique key
     * @returns {Map<HTMLElement, SHORTER.Component>?} all the component instances
     */
    getAllFor: (component) => {
      const instanceMap = componentData.get(component);

      if (instanceMap) return instanceMap;
      return null;
    },

    /**
     * Returns the instance associated with the target.
     * @param {HTMLElement | string} target target element
     * @param {string} component the component's name or a unique key
     * @returns {SHORTER.Component?} the instance
     */
    get: (target, component) => {
      const element = querySelector(target);
      const allForC = Data.getAllFor(component);
      const instance = element && allForC && allForC.get(element);

      if (instance) return instance;
      return null;
    },

    /**
     * Removes web components data.
     * @param {HTMLElement | string} target target element
     * @param {string} component the component's name or a unique key
     */
    remove: (target, component) => {
      const element = querySelector(target);
      const instanceMap = componentData.get(component);
      if (!instanceMap || !element) return;

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
  const getInstance = (target, component) => Data.get(target, component);

  /**
   * Check if a target node is `window`.
   *
   * @param {any} node the target node
   * @returns {boolean} the query result
   */
  function isWindow(node) {
    return node instanceof Window;
  }

  /**
   * Checks if an object is a `Node`.
   *
   * @param {any} node the target object
   * @returns {boolean} the query result
   */
  const isNode = (node) => node instanceof Node;

  /**
   * Returns the `document` or the `#document` element.
   * @see https://github.com/floating-ui/floating-ui
   * @param {(Node | HTMLElement | Element | Window)=} node
   * @returns {Document}
   */
  function getDocument(node) {
    // @ts-ignore -- `isNode` checks that
    if (isNode(node)) return node.ownerDocument;
    // @ts-ignore -- `isWindow` checks that too
    if (isWindow(node)) return node.document;
    return window.document;
  }

  /**
   * Returns the `document.documentElement` or the `<html>` element.
   *
   * @param {(Node | HTMLElement | Element)=} node
   * @returns {HTMLElement}
   */
  function getDocumentElement(node) {
    return getDocument(node).documentElement;
  }

  /**
   * Checks if a page is Right To Left.
   * @param {HTMLElement=} node the target
   * @returns {boolean} the query result
   */
  const isRTL = (node) => getDocumentElement(node).dir === 'rtl';

  /**
   * Shortcut for `Object.assign()` static method.
   * @param  {Record<string, any>} obj a target object
   * @param  {Record<string, any>} source a source object
   */
  const ObjectAssign = (obj, source) => Object.assign(obj, source);

  /**
   * Shortcut for `Array.from()` static method.
   *
   * @param  {any[] | HTMLCollection | NodeList | Map<any, any>} arr array-like iterable object
   * @returns {Array<any>}
   */
  const ArrayFrom = (arr) => Array.from(arr);

  /**
   * Shortcut for `HTMLElement.setAttribute()` method.
   * @param  {HTMLElement} element target element
   * @param  {string} attribute attribute name
   * @param  {string} value attribute value
   */
  const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);

  /**
   * Checks if an element is an `HTMLElement`.
   *
   * @param {any} element the target object
   * @returns {boolean} the query result
   */
  const isHTMLElement = (element) => element instanceof HTMLElement;

  /**
   * Shortcut for `HTMLElement.getElementsByClassName` method.
   *
   * @param {string} selector the class name
   * @param {HTMLElement=} parent optional Element to look into
   * @return {HTMLCollectionOf<HTMLElement>} the 'HTMLCollection'
   */
  function getElementsByClassName(selector, parent) {
    const lookUp = parent && isHTMLElement(parent) ? parent : document;
    // @ts-ignore
    return lookUp.getElementsByClassName(selector);
  }

  /**
   * Shortcut for `HTMLElement.getElementsByTagName` method.
   *
   * @param {string} selector the tag name
   * @param {HTMLElement=} parent optional Element to look into
   * @return {HTMLCollectionOf<HTMLElement>} the 'HTMLCollection'
   */
  function getElementsByTagName(selector, parent) {
    const lookUp = parent && isHTMLElement(parent) ? parent : document;
    // @ts-ignore
    return lookUp.getElementsByTagName(selector);
  }

  /**
   * Shortcut for `HTMLElement.closest` method.
   *
   * @param {HTMLElement} element optional Element to look into
   * @param {string} selector the selector name
   * @return {HTMLElement?} the query result
   */
  function closest(element, selector) {
    if (element && selector) return element.closest(selector);
    return null;
  }

  var version = "3.0.6";

  // @ts-ignore

  const Version = version;

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

  const defaultNavbarOptions = {
    breakpoint: 768,
    toggleSiblings: true,
    delay: 500,
  };

  const navbarEventOptions = { cancelable: true, bubbles: true };
  const showNavbarEvent = new CustomEvent('show.navbar', navbarEventOptions);
  const shownNavbarEvent = new CustomEvent('shown.navbar', navbarEventOptions);
  const hideNavbarEvent = new CustomEvent('hide.navbar', navbarEventOptions);
  const hiddenNavbarEvent = new CustomEvent('hidden.navbar', navbarEventOptions);

  /**
   * Returns a `Navbar` instance.
   * @param {HTMLElement} element target element
   * @returns {Navbar?}
   */
  const getNavbarInstance = (element) => getInstance(element, navbarComponent);

  /**
   * Returns a `Navbar` instance.
   * @param {HTMLElement} element target element
   * @returns {Navbar}
   */
  const initNavbarCallback = (element) => new Navbar(element);

  // NAVBAR PRIVATE METHODS
  // ======================
  /** @param {boolean=} add */
  function toggleNavbarResizeEvent(add) {
    const action = add ? addEventListener : removeEventListener;
    if (!document.querySelector(`li.${openMobileClass}`)) {
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
    const { options, menu } = self;
    // @ts-ignore
    const [firstToggle] = getElementsByClassName(subnavToggleClass, menu);
    return (firstToggle && getElementStyle(firstToggle, 'display') !== 'none')
      || window.innerWidth < options.breakpoint;
  }

  /**
   * @param {Navbar} self
   * @param {boolean=} add
   */
  function toggleNavbarEvents(self, add) {
    const action = add ? addEventListener : removeEventListener;
    // @ts-ignore
    const { items, navbarToggle, menu } = self;

    ArrayFrom(items).forEach((x) => {
      if (hasClass(x.lastElementChild, subnavClass)) {
        x[action](mouseenterEvent, navbarEnterHandler);
        x[action](mouseleaveEvent, navbarLeaveHandler);
      }

      const [toggleElement] = getElementsByClassName(subnavToggleClass, x);
      // @ts-ignore
      if (toggleElement) toggleElement[action](mouseclickEvent, navbarClickHandler);
    });

    // @ts-ignore
    menu[action](keydownEvent, navbarKeyHandler);
    // @ts-ignore
    if (navbarToggle) navbarToggle[action](mouseclickEvent, navbarClickHandler);
  }

  /**
   * @param {HTMLElement} element
   * @param {string} selector
   * @returns {HTMLElement=}
   */
  function findChild(element, selector) {
    return ArrayFrom(element.children).find((x) => selector === x.tagName || hasClass(x, selector));
  }

  /** @param {HTMLElement} element */
  function openNavbar(element) {
    const subMenu = findChild(element, subnavClass);
    const anchor = findChild(element, 'A');

    const navOpenTransitionEnd = () => {
      Timer.clear(element, 'in');

      if (anchor) {
        anchor.dispatchEvent(shownNavbarEvent);
        setAttribute(anchor, ariaExpanded, 'true');
      }
    };

    if (anchor) {
      anchor.dispatchEvent(showNavbarEvent);
      if (showNavbarEvent.defaultPrevented) return;
    }

    addClass(element, openPositionClass);
    addClass(element, openNavClass);

    // @ts-ignore
    const siblings = getElementsByTagName('LI', element.parentElement);
    closeNavbars(ArrayFrom(siblings).filter((x) => x !== element));

    if (subMenu) emulateTransitionEnd(subMenu, navOpenTransitionEnd);
    else navOpenTransitionEnd();
  }

  /**
   * @param {HTMLElement} element
   * @param {boolean=} leave
   */
  function closeNavbar(element, leave) {
    const subMenu = findChild(element, subnavClass);
    const anchor = findChild(element, 'A');
    const toggleElement = findChild(element, subnavToggleClass);
    const navCloseTransitionEnd = () => {
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
        if (hideNavbarEvent.defaultPrevented) return;
      }
      removeClass(element, openNavClass);
      if (leave && subMenu) emulateTransitionEnd(subMenu, navCloseTransitionEnd);
      else navCloseTransitionEnd();
    }
    if (hasClass(element, openMobileClass)) {
      if (anchor) anchor.dispatchEvent(hideNavbarEvent);
      if (hideNavbarEvent.defaultPrevented) return;
      removeClass(element, openMobileClass);

      [toggleElement, anchor].forEach((x) => {
        if (x) setAttribute(x, ariaExpanded, 'false');
      });
      if (anchor) anchor.dispatchEvent(hiddenNavbarEvent);
    }
  }

  /** @param {HTMLCollection | Element[]} collection */
  function closeNavbars(collection) {
    ArrayFrom(collection).forEach((x) => closeNavbar(x));
  }

  // NAVBAR EVENT LISTENERS
  // ======================
  /**
   * @this {HTMLElement}
   * @param {KeyboardEvent} e Event object
   */
  function navbarKeyHandler(e) {
    const { code } = e;
    const menu = this;
    // @ts-ignore
    const { activeElement } = document;
    const self = getNavbarInstance(menu);
    if (!self || !activeElement || !menu.contains(activeElement)) return;
    // @ts-ignore
    const element = closest(activeElement, 'LI');
    if (!element) return;

    const isMobile = checkNavbarView(self);
    const { previousElementSibling, nextElementSibling } = element;
    const openParentElement = closest(element, `.${openNavClass}`);
    const parentMenu = closest(element, 'UL');
    const [subnavMenu] = getElementsByClassName(subnavClass, element);
    const preventableEvents = [keySpace, keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp];
    const isColumn = parentMenu && getElementStyle(parentMenu, 'flex-direction') === 'column';
    const RTL = isRTL();
    const sidePrevKey = RTL ? keyArrowRight : keyArrowLeft;
    const sideNextKey = RTL ? keyArrowLeft : keyArrowRight;
    const prevSelection = parentMenu && previousElementSibling
      && ((code === keyArrowUp && isColumn) || (code === sidePrevKey && !isColumn));
    const nextSelection = parentMenu && nextElementSibling
      && ((code === keyArrowDown && isColumn) || (code === sideNextKey && !isColumn));
    /** @type {HTMLElement?} */
    let elementToFocus = null;

    if (code === keyEscape && openParentElement) {
      navbarLeaveHandler.call(openParentElement);
      elementToFocus = openParentElement;
    } else if (!isMobile && subnavMenu && code === keySpace) {
      if (hasClass(element, openNavClass)) navbarLeaveHandler.call(element);
      else navbarEnterHandler.call(element);
    }

    if (prevSelection && element !== parentMenu.firstElementChild) {
      // @ts-ignore
      elementToFocus = previousElementSibling;
    } else if (nextSelection && element !== parentMenu.lastElementChild) {
      // @ts-ignore
      elementToFocus = nextElementSibling;
    }

    // @ts-ignore
    if (elementToFocus) elementToFocus.firstElementChild.focus();

    if (!isMobile && preventableEvents.includes(code)) {
      e.preventDefault();
    }
  }

  /**
   * @this {HTMLElement}
   * @param {PointerEvent} e Event object
   */
  function navbarClickHandler(e) {
    e.preventDefault();

    const { target } = e;
    const that = this;
    const menu = closest(that, `${navbarSelector},.${navbarString}`);
    const self = menu && getNavbarInstance(menu);
    // @ts-ignore
    const { options, navbarToggle } = self;

    // @ts-ignore
    if (self && (target === that || that.contains(target))) {
      const element = closest(that, 'LI') || menu;
      const toggleElement = closest(that, `.${navbarToggleClass}`) === navbarToggle
        ? navbarToggle
        : findChild(element, subnavToggleClass);
      const anchor = toggleElement === navbarToggle
        ? null : findChild(element, 'A');
      const openSubs = getElementsByClassName(openMobileClass, element);

      if (!hasClass(element, openMobileClass)) {
        if (anchor) anchor.dispatchEvent(showNavbarEvent);
        if (showNavbarEvent.defaultPrevented) return;

        if (toggleElement !== navbarToggle) {
          toggleNavbarResizeEvent(true);
        }

        if (toggleElement !== navbarToggle) {
          const selection = options.toggleSiblings
            // @ts-ignore element.parentElement is an `Element`
            ? getElementsByClassName(openMobileClass, element.parentElement)
            : openSubs;
          closeNavbars(selection);
        }
        addClass(element, openMobileClass);

        if (toggleElement) setAttribute(toggleElement, ariaExpanded, 'true');
        if (anchor) {
          setAttribute(anchor, ariaExpanded, 'true');
          anchor.dispatchEvent(shownNavbarEvent);
        }
      } else {
        if (anchor) anchor.dispatchEvent(hideNavbarEvent);
        if (hideNavbarEvent.defaultPrevented) return;

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

  /** @this {HTMLElement} */
  function navbarEnterHandler() {
    const element = this;
    const menu = closest(element, `${navbarSelector},.${navbarString}`);
    const self = menu && getNavbarInstance(menu);
    const timerOut = Timer.get(element, 'out');

    // @ts-ignore
    if (!self || checkNavbarView(self)) return;

    Timer.clear(element, 'out');

    if (!hasClass(element, openNavClass) && !timerOut) {
      const enterCallback = () => openNavbar(element);

      Timer.set(element, enterCallback, 17, 'in');
    }
  }

  /** @this {HTMLElement} */
  function navbarLeaveHandler() {
    const element = this;
    const menu = closest(element, `${navbarSelector},.${navbarString}`);
    const self = menu && getNavbarInstance(menu);

    // @ts-ignore
    if (!self || checkNavbarView(self)) return;

    if (hasClass(element, openNavClass)) {
      Timer.clear(element, 'in');
      const leaveCallback = () => closeNavbar(element, true);

      // @ts-ignore
      Timer.set(element, leaveCallback, self.options.delay, 'out');
    }
  }

  // NAVBAR DEFINITION
  // =================
  /** Creates a new Navbar for desktop and mobile navigation. */
  class Navbar {
    /**
     * @param {string | HTMLElement} target Element or selector
     * @param {Record<string, any>=} config instance options
     */
    constructor(target, config) {
      // bind
      const self = this;

      // instance targets
      /** @private @type {HTMLElement?} */
      self.menu = querySelector(target);
      const { menu } = self;
      if (!menu) return;

      // reset on re-init
      const existing = getNavbarInstance(menu);
      if (existing) existing.dispose();

      /** @private @type {Record<string, any>} */
      self.options = normalizeOptions(menu, defaultNavbarOptions, config || {}, '');

      /** @private */
      self.items = getElementsByTagName('LI', menu);
      /** @private @type {HTMLElement?} */
      self.navbarToggle = null;
      [self.navbarToggle] = getElementsByClassName(navbarToggleClass, menu);

      // attach events
      toggleNavbarEvents(self, true);

      // attach instance to element
      Data.set(menu, navbarComponent, self);
    }

    /* eslint-disable */
    /** @static */
    get defaults() { return defaultNavbarOptions; }
    /** @static */
    get version() { return Version; }
    /** @static */
    get name() { return navbarComponent; }
    /* eslint-enable */

    // NAVBAR PUBLIC METHOD
    // ====================
    /**
     * Destroy Navbar instance.
     * @public */
    dispose() {
      const self = this;
      closeNavbars(self.items);
      toggleNavbarEvents(self);
      toggleNavbarResizeEvent();
      // @ts-ignore
      Data.remove(self.menu, navbarComponent);
    }
  }

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
    const lookup = context instanceof Element ? context : document;

    const { selector, init } = Navbar;
    const navs = lookup.querySelectorAll(selector);

    Array.from(navs).map((x) => init(x));
  }
  // initialize when loaded
  if (document.body) initNavbar();
  else document.addEventListener('DOMContentLoaded', initNavbar, { once: true });

  return Navbar;

})));
