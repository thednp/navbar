import keySpace from 'shorter-js/src/strings/keySpace';
import keyEscape from 'shorter-js/src/strings/keyEscape';
import keyArrowUp from 'shorter-js/src/strings/keyArrowUp';
import keyArrowDown from 'shorter-js/src/strings/keyArrowDown';
import keyArrowLeft from 'shorter-js/src/strings/keyArrowLeft';
import keyArrowRight from 'shorter-js/src/strings/keyArrowRight';
import ariaExpanded from 'shorter-js/src/strings/ariaExpanded';
import addEventListener from 'shorter-js/src/strings/addEventListener';
import removeEventListener from 'shorter-js/src/strings/removeEventListener';
import mouseenterEvent from 'shorter-js/src/strings/mouseenterEvent';
import mouseleaveEvent from 'shorter-js/src/strings/mouseleaveEvent';
import mouseclickEvent from 'shorter-js/src/strings/mouseclickEvent';
import keydownEvent from 'shorter-js/src/strings/keydownEvent';
import resizeEvent from 'shorter-js/src/strings/resizeEvent';
import Timer from 'shorter-js/src/misc/timer';

import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import querySelector from 'shorter-js/src/selectors/querySelector';
import normalizeOptions from 'shorter-js/src/misc/normalizeOptions';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import Data, { getInstance } from 'shorter-js/src/misc/data';
import getElementStyle from 'shorter-js/src/get/getElementStyle';
import isRTL from 'shorter-js/src/is/isRTL';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import ArrayFrom from 'shorter-js/src/misc/ArrayFrom';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import getElementsByClassName from 'shorter-js/src/selectors/getElementsByClassName';
import getElementsByTagName from 'shorter-js/src/selectors/getElementsByTagName';
import closest from 'shorter-js/src/selectors/closest';

import Version from './version';

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
export default class Navbar {
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
