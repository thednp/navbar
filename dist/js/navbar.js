/*!
* Navbar.js v3.1.0alpha1 (http://thednp.github.io/navbar.js)
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
   * Checks if an element is an `HTMLElement`.
   * @see https://dom.spec.whatwg.org/#node
   *
   * @param {any} element the target object
   * @returns {boolean} the query result
   */
  const isHTMLElement = (element) => (element && element.nodeType === 1) || false;

  /** @type {Map<HTMLElement, any>} */
  const TimeCache = new Map();
  /**
   * An interface for one or more `TimerHandler`s per `Element`.
   * @see https://github.com/thednp/navbar.js/
   */
  const Timer = {
    /**
     * Sets a new timeout timer for an element, or element -> key association.
     * @param {HTMLElement} element target element
     * @param {ReturnType<TimerHandler>} callback the callback
     * @param {number} delay the execution delay
     * @param {string=} key a unique key
     */
    set: (element, callback, delay, key) => {
      if (!isHTMLElement(element)) return;

      /* istanbul ignore else */
      if (key && key.length) {
        /* istanbul ignore else */
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
     * @param {HTMLElement} element target element
     * @param {string=} key a unique
     * @returns {number?} the timer
     */
    get: (element, key) => {
      if (!isHTMLElement(element)) return null;
      const keyTimers = TimeCache.get(element);

      if (key && key.length && keyTimers && keyTimers.get) {
        return keyTimers.get(key) || /* istanbul ignore next */null;
      }
      return keyTimers || null;
    },

    /**
     * Clears the element's timer.
     * @param {HTMLElement} element target element
     * @param {string=} key a unique key
     */
    clear: (element, key) => {
      if (!isHTMLElement(element)) return;

      if (key && key.length) {
        const keyTimers = TimeCache.get(element);
        /* istanbul ignore else */
        if (keyTimers && keyTimers.get) {
          clearTimeout(keyTimers.get(key));
          keyTimers.delete(key);
          /* istanbul ignore else */
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
   * Checks if an object is a `Node`.
   *
   * @param {any} node the target object
   * @returns {boolean} the query result
   */
  const isNode = (element) => (element && [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    .some((x) => +element.nodeType === x)) || false;

  /**
   * Check if a target object is `Window`.
   * => equivalent to `object instanceof Window`
   *
   * @param {any} object the target object
   * @returns {boolean} the query result
   */
  const isWindow = (object) => (object && object.constructor.name === 'Window') || false;

  /**
   * Checks if an object is a `Document`.
   * @see https://dom.spec.whatwg.org/#node
   *
   * @param {any} object the target object
   * @returns {boolean} the query result
   */
  const isDocument = (object) => (object && object.nodeType === 9) || false;

  /**
   * Returns the `document` or the `#document` element.
   * @see https://github.com/floating-ui/floating-ui
   * @param {(Node | Window)=} node
   * @returns {Document}
   */
  function getDocument(node) {
    // node instanceof Document
    if (isDocument(node)) return node;
    // node instanceof Node
    if (isNode(node)) return node.ownerDocument;
    // node instanceof Window
    if (isWindow(node)) return node.document;
    // node is undefined | NULL
    return window.document;
  }

  /**
   * Returns the `Window` object of a target node.
   * @see https://github.com/floating-ui/floating-ui
   *
   * @param {(Node | Window)=} node target node
   * @returns {Window} the `Window` object
   */
  function getWindow(node) {
    // node is undefined | NULL
    if (!node) return window;
    // node instanceof Document
    if (isDocument(node)) return node.defaultView;
    // node instanceof Node
    if (isNode(node)) return node.ownerDocument.defaultView;
    // node is instanceof Window
    return node;
  }

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

    // must use camelcase strings,
    // or non-camelcase strings with `getPropertyValue`
    return property.includes('--')
      ? computedStyle.getPropertyValue(property)
      : computedStyle[property];
  }

  /**
   * Shortcut for the `Element.dispatchEvent(Event)` method.
   *
   * @param {HTMLElement} element is the target
   * @param {Event} event is the `Event` object
   */
  const dispatchEvent = (element, event) => element.dispatchEvent(event);

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
   * A global namespace for `transitionProperty` string for modern browsers.
   *
   * @type {string}
   */
  const transitionProperty = 'transitionProperty';

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
    const delayScale = delayValue.includes('ms') ? /* istanbul ignore next */1 : 1000;
    const duration = propertyValue && propertyValue !== 'none'
      ? parseFloat(delayValue) * delayScale : 0;

    return !Number.isNaN(duration) ? duration : /* istanbul ignore next */0;
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
    const durationScale = durationValue.includes('ms') ? /* istanbul ignore next */1 : 1000;
    const duration = propertyValue && propertyValue !== 'none'
      ? parseFloat(durationValue) * durationScale : 0;

    return !Number.isNaN(duration) ? duration : /* istanbul ignore next */0;
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
       * @type {EventListener} e Event object
       */
      const transitionEndWrapper = (e) => {
        /* istanbul ignore else */
        if (e.target === element) {
          handler.apply(element, [e]);
          element.removeEventListener(transitionEndEvent, transitionEndWrapper);
          called = 1;
        }
      };
      element.addEventListener(transitionEndEvent, transitionEndWrapper);
      setTimeout(() => {
        /* istanbul ignore next */
        if (!called) dispatchEvent(element, endEvent);
      }, duration + delay + 17);
    } else {
      handler.apply(element, [endEvent]);
    }
  }

  /**
   * A global namespace for most scroll event listeners.
   * @type {Partial<AddEventListenerOptions>}
   */
  const passiveHandler = { passive: true };

  /**
   * Shortcut for `HTMLElement.getAttribute()` method.
   * @param {HTMLElement} element target element
   * @param {string} attribute attribute name
   * @returns {string?} attribute value
   */
  const getAttribute = (element, attribute) => element.getAttribute(attribute);

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
    if (['true', true].includes(value)) { // boolean
    // if ('true' === value) { // boolean
      return true;
    }

    if (['false', false].includes(value)) { // boolean
    // if ('false' === value) { // boolean
      return false;
    }

    if (value === '' || value === 'null') { // null
      return null;
    }

    if (value !== '' && !Number.isNaN(+value)) { // number
      return +value;
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
   * Shortcut for `String.toLowerCase()`.
   *
   * @param {string} source input string
   * @returns {string} lowercase output string
   */
  const toLowerCase = (source) => source.toLowerCase();

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
    const title = 'title';

    ObjectKeys(data).forEach((k) => {
      const key = ns && k.includes(ns)
        ? k.replace(ns, '').replace(/[A-Z]/, (match) => toLowerCase(match))
        : k;

      dataOps[key] = normalizeValue(data[k]);
    });

    ObjectKeys(inputOps).forEach((k) => {
      inputOps[k] = normalizeValue(inputOps[k]);
    });

    ObjectKeys(defaultOps).forEach((k) => {
      /* istanbul ignore else */
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
   * Checks if an object is an `Object`.
   *
   * @param {any} obj the target object
   * @returns {boolean} the query result
   */
  const isObject = (obj) => (typeof obj === 'object') || false;

  /**
   * Shortcut for `Object.assign()` static method.
   * @param  {Record<string, any>} obj a target object
   * @param  {Record<string, any>} source a source object
   */
  const ObjectAssign = (obj, source) => Object.assign(obj, source);

  /**
   * Returns a namespaced `CustomEvent` specific to each component.
   * @param {string} EventType Event.type
   * @param {Record<string, any>=} config Event.options | Event.properties
   * @returns {SHORTY.OriginalEvent} a new namespaced event
   */
  function OriginalEvent(EventType, config) {
    const OriginalCustomEvent = new CustomEvent(EventType, {
      cancelable: true, bubbles: true,
    });

    /* istanbul ignore else */
    if (isObject(config)) {
      ObjectAssign(OriginalCustomEvent, config);
    }
    return OriginalCustomEvent;
  }

  /** @type {Map<string, Map<HTMLElement, Record<string, any>>>} */
  const componentData = new Map();
  /**
   * An interface for web components background data.
   * @see https://github.com/thednp/bootstrap.native/blob/master/src/components/base-component.js
   */
  const Data = {
    /**
     * Sets web components data.
     * @param {HTMLElement} element target element
     * @param {string} component the component's name or a unique key
     * @param {Record<string, any>} instance the component instance
     */
    set: (element, component, instance) => {
      if (!isHTMLElement(element)) return;

      /* istanbul ignore else */
      if (!componentData.has(component)) {
        componentData.set(component, new Map());
      }

      const instanceMap = componentData.get(component);
      // not undefined, but defined right above
      instanceMap.set(element, instance);
    },

    /**
     * Returns all instances for specified component.
     * @param {string} component the component's name or a unique key
     * @returns {Map<HTMLElement, Record<string, any>>?} all the component instances
     */
    getAllFor: (component) => {
      const instanceMap = componentData.get(component);

      return instanceMap || null;
    },

    /**
     * Returns the instance associated with the target.
     * @param {HTMLElement} element target element
     * @param {string} component the component's name or a unique key
     * @returns {Record<string, any>?} the instance
     */
    get: (element, component) => {
      if (!isHTMLElement(element) || !component) return null;
      const allForC = Data.getAllFor(component);
      const instance = element && allForC && allForC.get(element);

      return instance || null;
    },

    /**
     * Removes web components data.
     * @param {HTMLElement} element target element
     * @param {string} component the component's name or a unique key
     */
    remove: (element, component) => {
      const instanceMap = componentData.get(component);
      if (!instanceMap || !isHTMLElement(element)) return;

      instanceMap.delete(element);

      /* istanbul ignore else */
      if (instanceMap.size === 0) {
        componentData.delete(component);
      }
    },
  };

  /**
   * An alias for `Data.get()`.
   * @type {SHORTY.getInstance<any>}
   */
  const getInstance = (target, component) => Data.get(target, component);

  /**
   * Add class to `HTMLElement.classList`.
   *
   * @param {HTMLElement} element target
   * @param {string} classNAME to add
   * @returns {void}
   */
  function addClass(element, classNAME) {
    element.classList.add(classNAME);
  }

  /**
   * Check class in `HTMLElement.classList`.
   *
   * @param {HTMLElement} element target
   * @param {string} classNAME to check
   * @returns {boolean}
   */
  function hasClass(element, classNAME) {
    return element.classList.contains(classNAME);
  }

  /**
   * Remove class from `HTMLElement.classList`.
   *
   * @param {HTMLElement} element target
   * @param {string} classNAME to remove
   * @returns {void}
   */
  function removeClass(element, classNAME) {
    element.classList.remove(classNAME);
  }

  /**
   * Returns the `document.documentElement` or the `<html>` element.
   *
   * @param {(Node | Window)=} node
   * @returns {HTMLHtmlElement}
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
   * Shortcut for `HTMLElement.setAttribute()` method.
   * @param  {HTMLElement} element target element
   * @param  {string} attribute attribute name
   * @param  {string} value attribute value
   * @returns {void}
   */
  const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);

  /**
   * Utility to check if target is typeof `HTMLElement`, `Element`, `Node`
   * or find one that matches a selector.
   *
   * @param {Node | string} selector the input selector or target element
   * @param {ParentNode=} parent optional node to look into
   * @return {HTMLElement?} the `HTMLElement` or `querySelector` result
   */
  function querySelector(selector, parent) {
    if (isNode(selector)) {
      return selector;
    }
    const lookUp = isNode(parent) ? parent : getDocument();

    return lookUp.querySelector(selector);
  }

  /**
   * Shortcut for `HTMLElement.getElementsByClassName` method. Some `Node` elements
   * like `ShadowRoot` do not support `getElementsByClassName`.
   *
   * @param {string} selector the class name
   * @param {ParentNode=} parent optional Element to look into
   * @return {HTMLCollectionOf<HTMLElement>} the 'HTMLCollection'
   */
  function getElementsByClassName(selector, parent) {
    const lookUp = isNode(parent) ? parent : getDocument();
    return lookUp.getElementsByClassName(selector);
  }

  /**
   * Shortcut for `HTMLElement.getElementsByTagName` method. Some `Node` elements
   * like `ShadowRoot` do not support `getElementsByTagName`.
   *
   * @param {string} selector the tag name
   * @param {ParentNode=} parent optional Element to look into
   * @return {HTMLCollectionOf<HTMLElement>} the 'HTMLCollection'
   */
  function getElementsByTagName(selector, parent) {
    const lookUp = isNode(parent) ? parent : getDocument();
    return lookUp.getElementsByTagName(selector);
  }

  /**
   * Shortcut for `HTMLElement.closest` method which also works
   * with children of `ShadowRoot`. The order of the parameters
   * is intentional since they're both required.
   *
   * @see https://stackoverflow.com/q/54520554/803358
   *
   * @param {HTMLElement} element Element to look into
   * @param {string} selector the selector name
   * @return {HTMLElement?} the query result
   */
  function closest(element, selector) {
    return element ? (element.closest(selector)
      // break out of `ShadowRoot`
      || closest(element.getRootNode().host, selector)) : null;
  }

  /**
   * Check if element matches a CSS selector.
   *
   * @param {HTMLElement} target
   * @param {string} selector
   * @returns {boolean}
   */
  function matches(target, selector) {
    return target.matches(selector);
  }

  /** @type {Record<string, any>} */
  const EventRegistry = {};

  /**
   * The global event listener.
   *
   * @type {EventListener}
   * @this {EventTarget}
   */
  function globalListener(e) {
    const that = this;
    const { type } = e;

    [...EventRegistry[type]].forEach((elementsMap) => {
      const [element, listenersMap] = elementsMap;
      /* istanbul ignore else */
      if (element === that) {
        [...listenersMap].forEach((listenerMap) => {
          const [listener, options] = listenerMap;
          listener.apply(element, [e]);

          if (options && options.once) {
            removeListener(element, type, listener, options);
          }
        });
      }
    });
  }

  /**
   * Register a new listener with its options and attach the `globalListener`
   * to the target if this is the first listener.
   *
   * @type {Listener.ListenerAction<EventTarget>}
   */
  const addListener = (element, eventType, listener, options) => {
    // get element listeners first
    if (!EventRegistry[eventType]) {
      EventRegistry[eventType] = new Map();
    }
    const oneEventMap = EventRegistry[eventType];

    if (!oneEventMap.has(element)) {
      oneEventMap.set(element, new Map());
    }
    const oneElementMap = oneEventMap.get(element);

    // get listeners size
    const { size } = oneElementMap;

    // register listener with its options
    oneElementMap.set(listener, options);

    // add listener last
    if (!size) {
      element.addEventListener(eventType, globalListener, options);
    }
  };

  /**
   * Remove a listener from registry and detach the `globalListener`
   * if no listeners are found in the registry.
   *
   * @type {Listener.ListenerAction<EventTarget>}
   */
  const removeListener = (element, eventType, listener, options) => {
    // get listener first
    const oneEventMap = EventRegistry[eventType];
    const oneElementMap = oneEventMap && oneEventMap.get(element);
    const savedOptions = oneElementMap && oneElementMap.get(listener);

    // also recover initial options
    const { options: eventOptions } = savedOptions !== undefined
      ? savedOptions
      : { options };

    // unsubscribe second, remove from registry
    if (oneElementMap && oneElementMap.has(listener)) oneElementMap.delete(listener);
    if (oneEventMap && (!oneElementMap || !oneElementMap.size)) oneEventMap.delete(element);
    if (!oneEventMap || !oneEventMap.size) delete EventRegistry[eventType];

    // remove listener last
    /* istanbul ignore else */
    if (!oneElementMap || !oneElementMap.size) {
      element.removeEventListener(eventType, globalListener, eventOptions);
    }
  };

  var version = "3.1.0alpha1";

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

  const showNavbarEvent = OriginalEvent(`show.${navbarString}`);
  const shownNavbarEvent = OriginalEvent(`shown.${navbarString}`);
  const hideNavbarEvent = OriginalEvent(`hide.${navbarString}`);
  const hiddenNavbarEvent = OriginalEvent(`hidden.${navbarString}`);

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
  /**
   * @param {Navbar} self
   * @param {boolean=} add
   */
  function toggleNavbarResizeEvent(self, add) {
    const action = add ? addListener : removeListener;

    action(getWindow(self.menu), resizeEvent, self.listenResize, passiveHandler);
  }

  /**
   * Returns `TRUE` if is mobile.
   * @param {Navbar} self
   */
  function checkNavbarView(self) {
    const { options, menu } = self;
    const [firstToggle] = getElementsByClassName(subnavToggleClass, menu);
    return (firstToggle && getElementStyle(firstToggle, 'display') !== 'none')
      || getWindow(menu).innerWidth < options.breakpoint;
  }

  /**
   * @param {Navbar} self
   * @param {boolean=} add
   */
  function toggleNavbarEvents(self, add) {
    const action = add ? addListener : removeListener;
    const { items, navbarToggle, menu } = self;

    [...items].forEach((x) => {
      const { lastElementChild } = x;
      if (lastElementChild && hasClass(lastElementChild, subnavClass)) {
        action(x, mouseenterEvent, navbarEnterHandler);
        action(x, mouseleaveEvent, navbarLeaveHandler);
      }

      const [toggleElement] = getElementsByClassName(subnavToggleClass, x);
      if (toggleElement) action(toggleElement, mouseclickEvent, navbarClickHandler);
    });

    action(menu, keydownEvent, navbarKeyHandler);
    if (navbarToggle) action(navbarToggle, mouseclickEvent, navbarClickHandler);
  }

  /**
   * @param {HTMLElement} element
   * @param {string} selector
   * @returns {HTMLElement=}
   */
  function findChild(element, selector) {
    return [...element.children].find((x) => matches(x, selector));
  }

  /** @param {HTMLElement} element */
  function openNavbar(element) {
    const subMenu = findChild(element, `.${subnavClass}`);
    const anchor = findChild(element, 'A');

    const navOpenTransitionEnd = () => {
      Timer.clear(element, 'in');

      if (anchor) {
        dispatchEvent(anchor, shownNavbarEvent);
        setAttribute(anchor, ariaExpanded, 'true');
      }
    };

    if (anchor) {
      dispatchEvent(anchor, showNavbarEvent);
      if (showNavbarEvent.defaultPrevented) return;
    }

    addClass(element, openPositionClass);
    addClass(element, openNavClass);

    const { parentElement } = element;
    if (parentElement) {
      const siblings = getElementsByClassName(openNavClass, parentElement);
      closeNavbars([...siblings].filter((x) => x !== element));
    }

    if (subMenu) emulateTransitionEnd(subMenu, navOpenTransitionEnd);
    else navOpenTransitionEnd();
  }

  /**
   * @param {HTMLElement} element
   * @param {boolean=} leave
   */
  function closeNavbar(element, leave) {
    const subMenu = findChild(element, `.${subnavClass}`);
    const anchor = findChild(element, 'A');
    const toggleElement = findChild(element, subnavToggleClass);
    const navCloseTransitionEnd = () => {
      removeClass(element, openPositionClass);
      Timer.clear(element, 'out');
      if (anchor) {
        dispatchEvent(anchor, hiddenNavbarEvent);
        setAttribute(anchor, ariaExpanded, 'false');
      }
    };

    if (hasClass(element, openNavClass)) {
      if (anchor) {
        dispatchEvent(anchor, hideNavbarEvent);
        if (hideNavbarEvent.defaultPrevented) return;
      }
      removeClass(element, openNavClass);
      if (leave && subMenu) emulateTransitionEnd(subMenu, navCloseTransitionEnd);
      else navCloseTransitionEnd();
    }
    if (hasClass(element, openMobileClass)) {
      if (anchor) dispatchEvent(anchor, hideNavbarEvent);
      if (hideNavbarEvent.defaultPrevented) return;
      removeClass(element, openMobileClass);

      [toggleElement, anchor].forEach((x) => {
        if (x) setAttribute(x, ariaExpanded, 'false');
      });
      if (anchor) dispatchEvent(anchor, hiddenNavbarEvent);
    }
  }

  /** @param {HTMLCollection | HTMLElement[]} collection */
  function closeNavbars(collection) {
    [...collection].forEach((x) => closeNavbar(x));
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
    const { activeElement } = getDocument(menu);
    const self = getNavbarInstance(menu);

    if (!self || !activeElement || !menu.contains(activeElement)) return;

    const element = closest(activeElement, 'LI');
    if (!element) return;

    const isMobile = checkNavbarView(self);
    const { previousElementSibling, nextElementSibling } = element;
    const openParentElement = closest(element, `.${openNavClass}`);
    const parentMenu = closest(element, 'UL');
    const [subnavMenu] = getElementsByClassName(subnavClass, element);
    const preventableEvents = [keySpace, keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp];
    const isColumn = parentMenu && getElementStyle(parentMenu, 'flex-direction') === 'column';
    const RTL = isRTL(element);
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
      elementToFocus = previousElementSibling;
    } else if (nextSelection && element !== parentMenu.lastElementChild) {
      elementToFocus = nextElementSibling;
    }

    if (elementToFocus) {
      const { firstElementChild } = elementToFocus;
      if (firstElementChild) firstElementChild.focus();
    }

    if (!isMobile && preventableEvents.includes(code)) {
      e.preventDefault();
    }
  }

  /**
   * @this {HTMLElement}
   * @param {MouseEvent} e Event object
   */
  function navbarClickHandler(e) {
    e.preventDefault();

    const { target } = e;
    const that = this;
    const menu = closest(that, `${navbarSelector},.${navbarString}`);
    const self = menu && getNavbarInstance(menu);
    if (!self) return;

    const { options, navbarToggle } = self;

    if (target === that || that.contains(target)) {
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

        if (toggleElement === navbarToggle) {
          toggleNavbarResizeEvent(self, true);
        } else {
          const selection = options.toggleSiblings
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
          if (toggleElement === navbarToggle) {
            toggleNavbarResizeEvent(self);
          }
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

    if (!self || checkNavbarView(self)) return;

    if (hasClass(element, openNavClass)) {
      Timer.clear(element, 'in');
      const leaveCallback = () => closeNavbar(element, true);

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
      /** @type {(HTMLElement)} */
      self.menu = querySelector(target);
      const { menu } = self;

      // invalidate
      if (!menu) return;

      // reset on re-init
      const existing = getNavbarInstance(menu);
      if (existing) existing.dispose();

      /** @type {Record<string, any>} */
      self.options = normalizeOptions(menu, defaultNavbarOptions, config || {}, '');

      /** @type {HTMLCollectionOf<HTMLElement>} */
      self.items = getElementsByTagName('LI', menu);
      /** @type {HTMLElement?} */
      self.navbarToggle = null;
      [self.navbarToggle] = getElementsByClassName(navbarToggleClass, menu);

      // bind self to resize listener
      self.listenResize = self.listenResize.bind(self);

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

    // NAVBAR PUBLIC METHODS
    // =====================
    /**
     * Window `resize` event listener.
     */
    listenResize() {
      const self = this;
      if (!checkNavbarView(self)) {
        closeNavbars(getElementsByClassName(openMobileClass));
        toggleNavbarResizeEvent(self);
      }
    }

    /**
     * Destroy Navbar instance.
     * @public */
    dispose() {
      const self = this;
      closeNavbars(self.items);
      toggleNavbarEvents(self);
      toggleNavbarResizeEvent(self);
      Data.remove(self.menu, navbarComponent);
    }
  }

  ObjectAssign(Navbar, {
    selector: navbarSelector,
    init: initNavbarCallback,
    getInstance: getNavbarInstance,
  });

  /**
   * A global namespace for `DOMContentLoaded` event.
   * @type {string}
   */
  const DOMContentLoadedEvent = 'DOMContentLoaded';

  /** @typedef {import('../../types/index')} */

  // DATA API
  /**
   * Navbar initialization callback
   * @param {HTMLElement=} context Element
   */
  function initNavbar(context) {
    const { selector, init } = Navbar;
    const collection = getElementsByTagName('*', getDocument(context));

    [...collection].filter((x) => matches(x, selector)).forEach(init);
  }

  // initialize when loaded
  if (document.body) initNavbar();
  else document.addEventListener(DOMContentLoadedEvent, initNavbar, { once: true });

  return Navbar;

})));
