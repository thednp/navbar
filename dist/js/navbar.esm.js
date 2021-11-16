/*!
* Navbar.js v3.0.2 (http://thednp.github.io/navbar.js)
* Copyright 2016-2021 © thednp
* Licensed under MIT (https://github.com/thednp/navbar.js/blob/master/LICENSE)
*/
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
 * A global namespace for 'transition' string.
 * @type {string}
 */
const transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransition' : 'transition';

/**
 * Utility to get the computed transitionDelay
 * from Element in miliseconds.
 *
 * @param {Element} element target
 * @return {Number} the value in miliseconds
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
 * Utility to get the computed transitionDuration
 * from Element in miliseconds.
 *
 * @param {Element} element target
 * @return {Number} the value in miliseconds
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
 * @param {Function} handler callback
 */
function emulateTransitionEnd(element, handler) {
  let called = 0;
  const endEvent = new Event(transitionEndEvent);
  const duration = getElementTransitionDuration(element);
  const delay = getElementTransitionDelay(element);

  if (duration) {
    /**
     * Wrap the handler in on -> off callback
     * @param {object | Event} e Event object
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

const passiveHandler = supportPassive ? { passive: true } : false;

/**
 * Utility to check if target is typeof Element
 * or find one that matches a selector.
 *
 * @param {string | Element} selector the input selector or target element
 * @param {undefined | Element} parent optional Element to look into
 * @return {null | Element} the Element
 */
function queryElement(selector, parent) {
  const lookUp = parent && parent instanceof Element ? parent : document;
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
  const normalOps = {};
  const dataOps = {};
  // @ts-ignore
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

/**
 * Creates a new Navbar for desktop and mobile navigation.
 * @class
 */
class Navbar {
  /**
   * Navbar constructor
   * @constructor
   * @param {string | Element} target Element or selector
   * @param {object | undefined} config instance options
   */
  constructor(target, config) {
    // bind
    const self = this;

    // instance targets
    /** @private */
    self.menu = queryElement(target);
    const { menu } = self;

    // reset on re-init
    if (menu[navbarComponent]) menu[navbarComponent].dispose();

    /** @private */
    self.options = normalizeOptions(menu, defaultNavbarOptions, config || {});

    /** @private */
    self.items = menu.getElementsByTagName('LI');
    /** @private */
    [self.navbarToggle] = menu.getElementsByClassName(navbarToggleClass);

    /** @private */
    self.timer = null;

    // attach events
    toggleNavbarEvents(self, 1);

    // attach instance to element
    menu[navbarComponent] = self;
  }

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
    delete self.menu[navbarComponent];
  }
}

/**
 * An object with all necesary information
 * for Navbar component initialization.
 */
Navbar.init = {
  component: navbarComponent,
  selector: navbarSelector,
  constructor: Navbar,
  Version,
};

// DATA API
/**
 * Navbar initialization callback
 * @param {Element | undefined} context Element
 */
function initNavbar(context) {
  const lookup = context instanceof Element ? context : document;

  const { selector, constructor } = Navbar.init;
  const navs = lookup.querySelectorAll(selector);

  Array.from(navs).map((x) => new constructor(x));
}
// initialize when loaded
if (document.body) initNavbar();
else document.addEventListener('DOMContentLoaded', initNavbar, { once: true });

export default Navbar;
