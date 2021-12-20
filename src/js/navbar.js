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

import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import querySelector from 'shorter-js/src/misc/querySelector';
import normalizeOptions from 'shorter-js/src/misc/normalizeOptions';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import Data from 'shorter-js/src/misc/data';
import getElementStyle from 'shorter-js/src/misc/getElementStyle';
import isRTL from 'shorter-js/src/misc/isRTL';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import ArrayFrom from 'shorter-js/src/misc/ArrayFrom';
import setAttribute from 'shorter-js/src/misc/setAttribute';
import getElementsByClassName from 'shorter-js/src/misc/getElementsByClassName';
import getElementsByTagName from 'shorter-js/src/misc/getElementsByTagName';

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
export default class Navbar {
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
