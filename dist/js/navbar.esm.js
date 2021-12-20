/*!
* Navbar.js v3.0.3 (http://thednp.github.io/navbar.js)
* Copyright 2016-2021 © thednp
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
 * A global namespace for 'transitionend' string.
 * @type {string}
 */
const transitionEndEvent = 'webkitTransition' in document.head.style ? 'webkitTransitionEnd' : 'transitionend';

/**
 * A global namespace for CSS3 transition support.
 * @type {boolean}
 */
const supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

/**
 * A global namespace for 'transitionDelay' string.
 * @type {string}
 */
const transitionDelay = 'webkitTransition' in document.head.style ? 'webkitTransitionDelay' : 'transitionDelay';

/**
 * A global namespace for 'transitionProperty' string.
 * @type {string}
 */
const transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

/**
 * Utility to get the computed `transitionDelay`
 * from Element in miliseconds.
 *
 * @param {Element} element target
 * @return {number} the value in miliseconds
 */
function getElementTransitionDelay(element) {
  const computedStyle = getComputedStyle(element);
  const propertyValue = computedStyle[transitionProperty];
  const delayValue = computedStyle[transitionDelay];
  const delayScale = delayValue.includes('ms') ? 1 : 1000;
  const duration = supportTransition && propertyValue && propertyValue !== 'none'
    ? parseFloat(delayValue) * delayScale : 0;

  return !Number.isNaN(duration) ? duration : 0;
}

/**
 * A global namespace for 'transitionDuration' string.
 * @type {string}
 */
const transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

/**
 * Utility to get the computed `transitionDuration`
 * from Element in miliseconds.
 *
 * @param {Element} element target
 * @return {number} the value in miliseconds
 */
function getElementTransitionDuration(element) {
  const computedStyle = getComputedStyle(element);
  const propertyValue = computedStyle[transitionProperty];
  const durationValue = computedStyle[transitionDuration];
  const durationScale = durationValue.includes('ms') ? 1 : 1000;
  const duration = supportTransition && propertyValue && propertyValue !== 'none'
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
 * A global namespace for passive events support.
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
const passiveHandler = supportPassive ? { passive: true } : false;

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
  const lookUp = parent && isElement(parent) ? parent : document;
  // @ts-ignore -- `isElement` is just as good
  return isElement(selector) ? selector : lookUp.querySelector(selector);
}

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
  const data = { ...element.dataset };
  const normalOps = {};
  const dataOps = {};

  Object.keys(data)
    .forEach((k) => {
      const key = ns && k.includes(ns)
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

const componentData = new Map();
/**
 * An interface for web components background data.
 * @see https://github.com/thednp/bootstrap.native/blob/master/src/components/base-component.js
 */
const Data = {
  /**
   * Sets web components data.
   * @param {Element | string} element target element
   * @param {string} component the component's name or a unique key
   * @param {any} instance the component instance
   */
  set: (element, component, instance) => {
    const ELEMENT = querySelector(element);
    if (!isElement(ELEMENT)) return;

    if (!componentData.has(component)) {
      componentData.set(component, new Map());
    }

    const instanceMap = componentData.get(component);
    instanceMap.set(ELEMENT, instance);
  },

  /**
   * Returns all instances for specified component.
   * @param {string} component the component's name or a unique key
   * @returns {any?} all the component instances
   */
  getAllFor: (component) => {
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
  get: (element, component) => {
    const ELEMENT = querySelector(element);

    const allForC = Data.getAllFor(component);
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
  remove: (element, component) => {
    if (!componentData.has(component)) return;

    const instanceMap = componentData.get(component);
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
  const computedStyle = getComputedStyle(element);

  return property && property in computedStyle
    ? computedStyle[property]
    : computedStyle;
}

/**
 * Checks if a page is Right To Left.
 * @returns {boolean} the query result
 */
const isRTL = () => document.documentElement.dir === 'rtl';

/**
 * Shortcut for `Object.assign()` static method.
 * @param  {Record<string, any>} obj a target object
 * @param  {Record<string, any>} source a source object
 */
const ObjectAssign = (obj, source) => Object.assign(obj, source);

/**
 * Shortcut for `Array.from()` static method.
 *
 * @param  {any[] | HTMLCollection | NodeList} arr array-like iterable object
 * @returns {Array}
 */
const ArrayFrom = (arr) => Array.from(arr);

/**
 * Shortcut for `Element.setAttribute()` method.
 * @param  {Element} element target element
 * @param  {string} attribute attribute name
 * @param  {string} value attribute value
 */
const setAttribute = (element, attribute, value) => element.setAttribute(attribute, value);

/**
 * Shortcut for `Element.getElementsByClassName` method.
 *
 * @param {string} selector the class name
 * @param {Element=} parent optional Element to look into
 * @return {HTMLCollection} the 'HTMLCollection'
 */
function getElementsByClassName(selector, parent) {
  const lookUp = parent && isElement(parent) ? parent : document;
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
  const lookUp = parent && isElement(parent) ? parent : document;
  return lookUp.getElementsByTagName(selector);
}

var version = "3.0.3";

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
 * @param {Element} element target element
 * @returns {Navbar?} the `Navbar` instance
 */
const getNavbarInstance = (element) => Data.get(element, navbarComponent);

/**
 * Returns a `Navbar` instance.
 * @param {Element} element target element
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

/** @param {Navbar} self */
function checkNavbarView(self) { // returns TRUE if "is mobile"
  // @ts-ignore
  const { options, menu } = self;
  const [firstToggle] = menu.getElementsByClassName(subnavToggleClass);
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
    // @ts-ignore
    if (hasClass(x.lastElementChild, subnavClass)) {
      // @ts-ignore
      x[action](mouseenterEvent, navbarEnterHandler);
      // @ts-ignore
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
 * @param {Element} element
 * @param {string} selector
 * @returns {Element=}
 */
function findChild(element, selector) {
  return ArrayFrom(element.children).find((x) => selector === x.tagName || hasClass(x, selector));
}

/** @param {Element} element */
function openNavbar(element) {
  const subMenu = findChild(element, subnavClass);
  const anchor = findChild(element, 'A');

  if (anchor) {
    anchor.dispatchEvent(showNavbarEvent);
    if (showNavbarEvent.defaultPrevented) return;
  }

  addClass(element, openPositionClass);
  addClass(element, openNavClass);

  if (anchor) setAttribute(anchor, ariaExpanded, 'true');

  // @ts-ignore
  const siblings = getElementsByTagName('LI', element.parentElement);
  closeNavbars(ArrayFrom(siblings).filter((x) => x !== element));

  if (anchor && subMenu) {
    emulateTransitionEnd(subMenu, () => {
      anchor.dispatchEvent(shownNavbarEvent);
    });
  }
}

/**
 * @param {Element} element
 * @param {boolean=} leave
 */
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
      if (hideNavbarEvent.defaultPrevented) return;
    }
    removeClass(element, openNavClass);
    if (leave && subMenu) emulateTransitionEnd(subMenu, navTransitionEndHandler);
    else navTransitionEndHandler();
    if (anchor) setAttribute(anchor, ariaExpanded, 'false');
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
 * @this {Element}
 * @param {KeyboardEvent} e Event object
 */
function navbarKeyHandler(e) {
  const { code } = e;
  const menu = this;
  const { activeElement } = document;
  const self = getNavbarInstance(menu);
  if (!activeElement || !menu.contains(activeElement)) return;
  const element = activeElement.closest('LI');
  if (!element) return;
  // @ts-ignore
  const isMobile = checkNavbarView(self);
  const { previousElementSibling } = element;
  const { nextElementSibling } = element;
  const openParentElement = element.closest(`.${openNavClass}`);
  const parentMenu = element.closest('UL');
  const [subnavMenu] = getElementsByClassName(subnavClass, element);
  const preventableEvents = [keySpace, keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp];
  const isColumn = parentMenu && getElementStyle(parentMenu, 'flex-direction') === 'column';
  const sidePrevKey = isRTL() ? keyArrowRight : keyArrowLeft;
  const sideNextKey = isRTL() ? keyArrowLeft : keyArrowRight;
  const prevSelection = parentMenu && previousElementSibling
    && ((code === keyArrowUp && isColumn) || (code === sidePrevKey && !isColumn));
  const nextSelection = parentMenu && nextElementSibling
    && ((code === keyArrowDown && isColumn) || (code === sideNextKey && !isColumn));
  /** @type {Element?} */
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
  if (elementToFocus) elementToFocus.firstElementChild.focus();

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

  const { target } = e;
  const that = this;
  const menu = that.closest(`${navbarSelector},.${navbarString}`);
  const self = menu && getNavbarInstance(menu);
  // @ts-ignore
  const { options, navbarToggle } = self;

  // @ts-ignore
  if (self && (target === that || that.contains(target))) {
    const element = that.closest('LI') || menu;
    const toggleElement = that.closest(`.${navbarToggleClass}`) === navbarToggle
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

/** @this {Element} */
function navbarEnterHandler() {
  const element = this;
  const menu = element.closest(`${navbarSelector},.${navbarString}`);
  const self = menu && getNavbarInstance(menu);

  // must always clear the timer
  // @ts-ignore
  clearTimeout(self.timer);
  if (self && !checkNavbarView(self) && !hasClass(element, openNavClass)) {
    openNavbar(element);
  }
}

/** @this {Element} */
function navbarLeaveHandler() {
  const element = this;
  const menu = element.closest(`${navbarSelector},.${navbarString}`);
  const self = menu && getNavbarInstance(menu);

  if (self && !checkNavbarView(self) && hasClass(element, openNavClass)) {
    // @ts-ignore
    clearTimeout(self.timer);
    // @ts-ignore
    self.timer = setTimeout(() => closeNavbar(element, true), self.options.delay);
  }
}

// NAVBAR DEFINITION
// =================
/** Creates a new Navbar for desktop and mobile navigation. */
class Navbar {
  /**
   * @param {string | Element} target Element or selector
   * @param {Record<string, any>=} config instance options
   */
  constructor(target, config) {
    // bind
    const self = this;

    // instance targets
    /** @private @type {Element} */
    // @ts-ignore
    self.menu = querySelector(target);
    const { menu } = self;

    // reset on re-init
    const existing = getNavbarInstance(menu);
    if (existing) existing.dispose();

    /** @private @type {Record<string, any>} */
    self.options = normalizeOptions(menu, defaultNavbarOptions, config || {}, '');

    /** @private */
    self.items = getElementsByTagName('LI', menu);
    /** @private @type {Element?} */
    self.navbarToggle = null;
    [self.navbarToggle] = getElementsByClassName(navbarToggleClass, menu);

    /** @private @type {number?} */
    self.timer = null;

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
 * @param {Element | undefined} context Element
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
