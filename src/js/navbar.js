import keySpace from '@thednp/shorty/src/strings/keySpace';
import keyEscape from '@thednp/shorty/src/strings/keyEscape';
import keyArrowUp from '@thednp/shorty/src/strings/keyArrowUp';
import keyArrowDown from '@thednp/shorty/src/strings/keyArrowDown';
import keyArrowLeft from '@thednp/shorty/src/strings/keyArrowLeft';
import keyArrowRight from '@thednp/shorty/src/strings/keyArrowRight';
import ariaExpanded from '@thednp/shorty/src/strings/ariaExpanded';
import mouseenterEvent from '@thednp/shorty/src/strings/mouseenterEvent';
import mouseleaveEvent from '@thednp/shorty/src/strings/mouseleaveEvent';
import mouseclickEvent from '@thednp/shorty/src/strings/mouseclickEvent';
import keydownEvent from '@thednp/shorty/src/strings/keydownEvent';
import resizeEvent from '@thednp/shorty/src/strings/resizeEvent';
import Timer from '@thednp/shorty/src/misc/timer';
import getDocument from '@thednp/shorty/src/get/getDocument';
import getWindow from '@thednp/shorty/src/get/getWindow';
import getElementStyle from '@thednp/shorty/src/get/getElementStyle';

import dispatchEvent from '@thednp/shorty/src/misc/dispatchEvent';
import emulateTransitionEnd from '@thednp/shorty/src/misc/emulateTransitionEnd';
import passiveHandler from '@thednp/shorty/src/misc/passiveHandler';
import normalizeOptions from '@thednp/shorty/src/misc/normalizeOptions';
import OriginalEvent from '@thednp/shorty/src/misc/OriginalEvent';
import ObjectKeys from '@thednp/shorty/src/misc/ObjectKeys';
import Data, { getInstance } from '@thednp/shorty/src/misc/data';
import ObjectAssign from '@thednp/shorty/src/misc/ObjectAssign';
import addClass from '@thednp/shorty/src/class/addClass';
import hasClass from '@thednp/shorty/src/class/hasClass';
import removeClass from '@thednp/shorty/src/class/removeClass';
import isRTL from '@thednp/shorty/src/is/isRTL';
import setAttribute from '@thednp/shorty/src/attr/setAttribute';
import querySelector from '@thednp/shorty/src/selectors/querySelector';
import getElementsByClassName from '@thednp/shorty/src/selectors/getElementsByClassName';
import getElementsByTagName from '@thednp/shorty/src/selectors/getElementsByTagName';
import closest from '@thednp/shorty/src/selectors/closest';
import matches from '@thednp/shorty/src/selectors/matches';

import { addListener, removeListener } from '@thednp/event-listener/src/event-listener';

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
  /* istanbul ignore else */
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

  /* istanbul ignore else */
  if (anchor) {
    dispatchEvent(anchor, showNavbarEvent);
    if (showNavbarEvent.defaultPrevented) return;
  }

  addClass(element, openPositionClass);
  addClass(element, openNavClass);

  const { parentElement } = element;
  /* istanbul ignore else */
  if (parentElement) {
    const siblings = getElementsByClassName(openNavClass, parentElement);
    closeNavbars([...siblings].filter((x) => x !== element));
  }

  const navOpenTransitionEnd = () => {
    Timer.clear(element, 'in');

    /* istanbul ignore else */
    if (anchor) {
      dispatchEvent(anchor, shownNavbarEvent);
      setAttribute(anchor, ariaExpanded, 'true');
    }
  };

  /* istanbul ignore else */
  if (subMenu) emulateTransitionEnd(subMenu, navOpenTransitionEnd);
}

/**
 * @param {HTMLElement} element
 * @param {boolean=} leave
 */
function closeNavbar(element, leave) {
  const subMenu = findChild(element, `.${subnavClass}`);
  const anchor = findChild(element, 'A');
  const toggleElement = findChild(element, subnavToggleClass);

  if ([openNavClass, openMobileClass].some((c) => hasClass(element, c))) {
    /* istanbul ignore else */
    if (anchor) {
      dispatchEvent(anchor, hideNavbarEvent);
      /* istanbul ignore next: some strange bug with istanbul */
      if (hideNavbarEvent.defaultPrevented) return;
    }
  }

  if (hasClass(element, openNavClass)) {
    const navCloseTransitionEnd = () => {
      removeClass(element, openPositionClass);
      Timer.clear(element, 'out');
      /* istanbul ignore else */
      if (anchor) {
        dispatchEvent(anchor, hiddenNavbarEvent);
        setAttribute(anchor, ariaExpanded, 'false');
      }
    };

    removeClass(element, openNavClass);
    if (leave && subMenu) emulateTransitionEnd(subMenu, navCloseTransitionEnd);
    else navCloseTransitionEnd();
  }

  if (hasClass(element, openMobileClass)) {
    removeClass(element, openMobileClass);

    [toggleElement, anchor].forEach((x) => {
      if (x) setAttribute(x, ariaExpanded, 'false');
    });
    /* istanbul ignore else */
    if (anchor) dispatchEvent(anchor, hiddenNavbarEvent);
  }
}

/** @param {HTMLCollectionOf<HTMLElement> | HTMLElement[]} collection */
function closeNavbars(collection) {
  [...collection].forEach(closeNavbar);
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

  /* istanbul ignore next: filter is required */
  if (!self || !activeElement || !menu.contains(activeElement)) return;

  const element = closest(activeElement, 'LI');
  /* istanbul ignore next: filter is required */
  if (!element) return;

  const isMobile = checkNavbarView(self);
  const { previousElementSibling, nextElementSibling } = element;
  const openParentElement = closest(element, `.${openNavClass}`);
  const parentMenu = closest(element, 'UL');
  const [subnavMenu] = getElementsByClassName(subnavClass, element);
  const preventableEvents = [keySpace, keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp];
  const isColumn = parentMenu && getElementStyle(parentMenu, 'flex-direction') === 'column';
  const RTL = isRTL(element);
  const sidePrevKey = RTL ? /* istanbul ignore next */keyArrowRight : keyArrowLeft;
  const sideNextKey = RTL ? /* istanbul ignore next */keyArrowLeft : keyArrowRight;
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
    /* istanbul ignore else */
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

  /* istanbul ignore next: filter is required */
  if (!self) return;

  const { options, navbarToggle } = self;

  /* istanbul ignore else */
  if (target === that || that.contains(target)) {
    const element = closest(that, 'LI') || menu;
    const toggleElement = closest(that, `.${navbarToggleClass}`) === navbarToggle
      ? navbarToggle
      : findChild(element, `.${subnavToggleClass}`);
    const anchor = toggleElement === navbarToggle
      ? null : findChild(element, 'A');
    const openSubs = getElementsByClassName(openMobileClass, element);

    if (!hasClass(element, openMobileClass)) {
      if (anchor) {
        dispatchEvent(anchor, showNavbarEvent);
        /* istanbul ignore next */
        if (showNavbarEvent.defaultPrevented) return;
      }

      if (toggleElement === navbarToggle) {
        toggleNavbarResizeEvent(self, true);
      } else {
        const selection = options.toggleSiblings
          ? getElementsByClassName(openMobileClass, element.parentElement)
          : /* istanbul ignore next */openSubs;
        closeNavbars(selection);
      }
      addClass(element, openMobileClass);

      /* istanbul ignore else */
      if (toggleElement) setAttribute(toggleElement, ariaExpanded, 'true');
      if (anchor) {
        setAttribute(anchor, ariaExpanded, 'true');
        dispatchEvent(anchor, shownNavbarEvent);
      }
    } else {
      if (anchor) {
        dispatchEvent(anchor, hideNavbarEvent);
        /* istanbul ignore next */
        if (hideNavbarEvent.defaultPrevented) return;
      }

      closeNavbars(openSubs);
      removeClass(element, openMobileClass);

      /* istanbul ignore else */
      if (toggleElement) {
        setAttribute(toggleElement, ariaExpanded, 'false');
        if (toggleElement === navbarToggle) {
          toggleNavbarResizeEvent(self);
        }
      }
      if (anchor) {
        setAttribute(anchor, ariaExpanded, 'false');
        dispatchEvent(anchor, hiddenNavbarEvent);
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

  /* istanbul ignore else */
  if (hasClass(element, openNavClass)) {
    Timer.clear(element, 'in');
    const leaveCallback = () => {
      closeNavbars(getElementsByClassName(openPositionClass, element));
      closeNavbar(element, true);
    };

    Timer.set(element, leaveCallback, self.options.delay, 'out');
  }
}

// NAVBAR DEFINITION
// =================
/** Creates a new Navbar for desktop and mobile navigation. */
export default class Navbar {
  /**
   * @param {string | HTMLElement} target HTMLElement or selector
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
    /* istanbul ignore else */
    if (!checkNavbarView(self)) {
      closeNavbars(getElementsByClassName(openMobileClass, getDocument(self.menu)));
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
    ObjectKeys(self).forEach((key) => { self[key] = null; });
  }
}

ObjectAssign(Navbar, {
  selector: navbarSelector,
  init: initNavbarCallback,
  getInstance: getNavbarInstance,
});
