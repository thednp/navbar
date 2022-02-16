import keySpace from 'shorter-js/src/strings/keySpace';
import keyEscape from 'shorter-js/src/strings/keyEscape';
import keyArrowUp from 'shorter-js/src/strings/keyArrowUp';
import keyArrowDown from 'shorter-js/src/strings/keyArrowDown';
import keyArrowLeft from 'shorter-js/src/strings/keyArrowLeft';
import keyArrowRight from 'shorter-js/src/strings/keyArrowRight';
import ariaExpanded from 'shorter-js/src/strings/ariaExpanded';
import mouseenterEvent from 'shorter-js/src/strings/mouseenterEvent';
import mouseleaveEvent from 'shorter-js/src/strings/mouseleaveEvent';
import mouseclickEvent from 'shorter-js/src/strings/mouseclickEvent';
import keydownEvent from 'shorter-js/src/strings/keydownEvent';
import resizeEvent from 'shorter-js/src/strings/resizeEvent';
import Timer from 'shorter-js/src/misc/timer';
import getDocument from 'shorter-js/src/get/getDocument';
import getWindow from 'shorter-js/src/get/getWindow';
import getElementStyle from 'shorter-js/src/get/getElementStyle';

import dispatchEvent from 'shorter-js/src/misc/dispatchEvent';
import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd';
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import normalizeOptions from 'shorter-js/src/misc/normalizeOptions';
import OriginalEvent from 'shorter-js/src/misc/OriginalEvent';
import Data, { getInstance } from 'shorter-js/src/misc/data';
import ObjectAssign from 'shorter-js/src/misc/ObjectAssign';
import addClass from 'shorter-js/src/class/addClass';
import hasClass from 'shorter-js/src/class/hasClass';
import removeClass from 'shorter-js/src/class/removeClass';
import isRTL from 'shorter-js/src/is/isRTL';
import setAttribute from 'shorter-js/src/attr/setAttribute';
import querySelector from 'shorter-js/src/selectors/querySelector';
import getElementsByClassName from 'shorter-js/src/selectors/getElementsByClassName';
import getElementsByTagName from 'shorter-js/src/selectors/getElementsByTagName';
import closest from 'shorter-js/src/selectors/closest';
import matches from 'shorter-js/src/selectors/matches';

import { addListener, removeListener } from 'event-listener.js';

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

const showNavbarEvent = OriginalEvent(`show.${navbarString}`);
const shownNavbarEvent = OriginalEvent(`shown.${navbarString}`);
const hideNavbarEvent = OriginalEvent(`hide.${navbarString}`);
const hiddenNavbarEvent = OriginalEvent(`hidden.${navbarString}`);

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
  const action = add ? addListener : removeListener;

  // @ts-ignore
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
 * @param {HTMLElement | Element} element
 * @param {string} selector
 * @returns {(HTMLElement | Element)=}
 */
function findChild(element, selector) {
  return [...element.children].find((x) => matches(x, selector));
}

/** @param {HTMLElement | Element} element */
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
 * @param {HTMLElement | Element} element
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

/** @param {HTMLCollection | Element[]} collection */
function closeNavbars(collection) {
  [...collection].forEach((x) => closeNavbar(x));
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

  if (elementToFocus) {
    const { firstElementChild } = elementToFocus;
    // @ts-ignore
    if (firstElementChild) firstElementChild.focus();
  }

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

      if (toggleElement === navbarToggle) {
        toggleNavbarResizeEvent(self, true);
      } else {
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
export default class Navbar {
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
