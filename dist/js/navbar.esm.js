/*!
* Navbar.js v3.0.7 (http://thednp.github.io/navbar.js)
* Copyright 2016-2022 © thednp
* Licensed under MIT (https://github.com/thednp/navbar.js/blob/master/LICENSE)
*/
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
 * Add eventListener to an `Element` | `HTMLElement` | `Document` target.
 *
 * @param {HTMLElement | Element | Document | Window} element event.target
 * @param {string} eventName event.type
 * @param {EventListenerObject['handleEvent']} handler callback
 * @param {(EventListenerOptions | boolean)=} options other event options
 */
function on(element, eventName, handler, options) {
  const ops = options || false;
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
  const ops = options || false;
  element.removeEventListener(eventName, handler, ops);
}

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
 * Returns the `document` or the `#document` element.
 * @see https://github.com/floating-ui/floating-ui
 * @param {(Node | HTMLElement | Element | globalThis)=} node
 * @returns {Document}
 */
function getDocument(node) {
  if (node instanceof HTMLElement) return node.ownerDocument;
  if (node instanceof Window) return node.document;
  return window.document;
}

/**
 * A global array of possible `ParentNode`.
 */
const parentNodes = [Document, Node, Element, HTMLElement];

/**
 * A global array with `Element` | `HTMLElement`.
 */
const elementNodes = [Element, HTMLElement];

/**
 * Utility to check if target is typeof `HTMLElement`, `Element`, `Node`
 * or find one that matches a selector.
 *
 * @param {HTMLElement | Element | string} selector the input selector or target element
 * @param {(HTMLElement | Element | Node | Document)=} parent optional node to look into
 * @return {(HTMLElement | Element)?} the `HTMLElement` or `querySelector` result
 */
function querySelector(selector, parent) {
  const selectorIsString = typeof selector === 'string';
  const lookUp = parent && parentNodes.some((x) => parent instanceof x)
    ? parent : getDocument();

  if (!selectorIsString && [...elementNodes].some((x) => selector instanceof x)) {
    return selector;
  }
  // @ts-ignore -- `ShadowRoot` is also a node
  return selectorIsString ? lookUp.querySelector(selector) : null;
}

/** @type {Map<HTMLElement | Element, any>} */
const TimeCache = new Map();
/**
 * An interface for one or more `TimerHandler`s per `Element`.
 * @see https://github.com/thednp/navbar.js/
 */
const Timer = {
  /**
   * Sets a new timeout timer for an element, or element -> key association.
   * @param {HTMLElement | Element | string} target target element
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
   * @param {HTMLElement | Element | string} target target element
   * @param {string=} key a unique
   * @returns {number?} the timer
   */
  get: (target, key) => {
    const element = querySelector(target);

    if (!element) return null;
    const keyTimers = TimeCache.get(element);

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
  clear: (target, key) => {
    const element = querySelector(target);

    if (!element) return;

    if (key && key.length) {
      const keyTimers = TimeCache.get(element);

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
    const { ownerDocument } = node;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  // @ts-ignore
  return node;
}

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
 * @param {HTMLElement | Element} element target
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
 * @param {HTMLElement | Element} element target
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
 * @param {HTMLElement | Element} element target
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
 * @param {HTMLElement | Element} element target
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
     * @param {TransitionEvent} e Event object
     */
    const transitionEndWrapper = (e) => {
      if (e.target === element) {
        handler.apply(element, [e]);
        off(element, transitionEndEvent, transitionEndWrapper);
        called = 1;
      }
    };
    on(element, transitionEndEvent, transitionEndWrapper);
    setTimeout(() => {
      if (!called) element.dispatchEvent(endEvent);
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
 * @param {HTMLElement | Element} element target
 * @param {Record<string, any>} defaultOps component default options
 * @param {Record<string, any>} inputOps component instance options
 * @param {string=} ns component namespace
 * @return {Record<string, any>} normalized component options object
 */
function normalizeOptions(element, defaultOps, inputOps, ns) {
  // @ts-ignore -- our targets are always `HTMLElement`
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
const componentData = new Map();
/**
 * An interface for web components background data.
 * @see https://github.com/thednp/bootstrap.native/blob/master/src/components/base-component.js
 */
const Data = {
  /**
   * Sets web components data.
   * @param {HTMLElement | Element | string} target target element
   * @param {string} component the component's name or a unique key
   * @param {Record<string, any>} instance the component instance
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
   * @returns {Map<HTMLElement | Element, Record<string, any>>?} all the component instances
   */
  getAllFor: (component) => {
    const instanceMap = componentData.get(component);

    return instanceMap || null;
  },

  /**
   * Returns the instance associated with the target.
   * @param {HTMLElement | Element | string} target target element
   * @param {string} component the component's name or a unique key
   * @returns {Record<string, any>?} the instance
   */
  get: (target, component) => {
    const element = querySelector(target);
    const allForC = Data.getAllFor(component);
    const instance = element && allForC && allForC.get(element);

    return instance || null;
  },

  /**
   * Removes web components data.
   * @param {HTMLElement | Element | string} target target element
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
 * @param  {HTMLElement | Element} element target element
 * @param  {string} attribute attribute name
 * @param  {string} value attribute value
 */
const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);

/**
 * Shortcut for `HTMLElement.getElementsByClassName` method. Some `Node` elements
 * like `ShadowRoot` do not support `getElementsByClassName`.
 *
 * @param {string} selector the class name
 * @param {(HTMLElement | Element | Document)=} parent optional Element to look into
 * @return {HTMLCollectionOf<HTMLElement | Element>} the 'HTMLCollection'
 */
function getElementsByClassName(selector, parent) {
  const lookUp = parent && parentNodes.some((x) => parent instanceof x)
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
  const lookUp = parent && parentNodes
    .some((x) => parent instanceof x) ? parent : getDocument();
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

var version = "3.0.7";

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
 * @param {HTMLElement | Element} element target element
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
  const action = add ? on : off;
  const { menu } = self;
  if (!querySelector(`li.${openMobileClass}`, getDocument(menu))) {
    // @ts-ignore
    action(getWindow(menu), resizeEvent, () => resizeNavbarHandler(self), passiveHandler);
  }
}

/** @param {Navbar} self */
function resizeNavbarHandler(self) {
  closeNavbars(getElementsByClassName(openMobileClass));
  toggleNavbarResizeEvent(self);
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
  const action = add ? on : off;
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
 * @param {HTMLElement | Element} element
 * @param {string} selector
 * @returns {HTMLElement=}
 */
function findChild(element, selector) {
  return ArrayFrom(element.children).find((x) => selector === x.tagName || hasClass(x, selector));
}

/** @param {HTMLElement | Element} element */
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
 * @param {HTMLElement | Element} element
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
 * @this {HTMLElement | Element}
 * @param {KeyboardEvent} e Event object
 */
function navbarKeyHandler(e) {
  const { code } = e;
  const menu = this;
  const { activeElement } = document;
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
  /** @type {(HTMLElement | Element)?} */
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

  // @ts-ignore
  const { firstElementChild } = elementToFocus;
  if (firstElementChild) firstElementChild.focus();

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

  const { target } = e;
  const that = this;
  const menu = closest(that, `${navbarSelector},.${navbarString}`);
  const self = menu && getNavbarInstance(menu);
  if (!self) return;

  const { options, navbarToggle } = self;

  // @ts-ignore
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

      if (toggleElement !== navbarToggle) {
        toggleNavbarResizeEvent(self, true);
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

/** @this {HTMLElement | Element} */
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
   * @param {string | HTMLElement | Element} target Element or selector
   * @param {Record<string, any>=} config instance options
   */
  constructor(target, config) {
    // bind
    const self = this;

    // instance targets
    /** @type {(HTMLElement | Element)} */
    // @ts-ignore -- we invalidate right after
    self.menu = querySelector(target);
    const { menu } = self;

    // invalidate
    if (!menu) return;

    // reset on re-init
    const existing = getNavbarInstance(menu);
    if (existing) existing.dispose();

    /** @type {Record<string, any>} */
    self.options = normalizeOptions(menu, defaultNavbarOptions, config || {}, '');

    /** @type {HTMLCollectionOf<Element | HTMLElement>} */
    self.items = getElementsByTagName('LI', menu);
    /** @type {(HTMLElement | Element)?} */
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
    toggleNavbarResizeEvent(self);
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

export default Navbar;
