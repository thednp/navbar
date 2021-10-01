import emulateTransitionEnd from 'shorter-js/src/misc/emulateTransitionEnd.js';
import passiveHandler from 'shorter-js/src/misc/passiveHandler';
import queryElement from 'shorter-js/src/misc/queryElement.js';
import normalizeOptions from 'shorter-js/src/misc/normalizeOptions.js';
import addClass from 'shorter-js/src/class/addClass.js';
import hasClass from 'shorter-js/src/class/hasClass.js';
import removeClass from 'shorter-js/src/class/removeClass.js';
import addEventListener from 'shorter-js/src/strings/addEventListener.js';
import removeEventListener from 'shorter-js/src/strings/removeEventListener.js';
import { version } from '../../package.json';

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
const showNavbarEvent = new CustomEvent('show.navbar', { cancelable: true });
const shownNavbarEvent = new CustomEvent('shown.navbar', { cancelable: true });
const hideNavbarEvent = new CustomEvent('hide.navbar', { cancelable: true });
const hiddenNavbarEvent = new CustomEvent('hidden.navbar', { cancelable: true });

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

function openNavbar(element) {
  const subMenu = queryElement(`.${subnavClass}`, element);

  element.dispatchEvent(showNavbarEvent);
  if (showNavbarEvent.isDefaultPrevented) return;

  addClass(element, openPositionClass);
  addClass(element, openNavClass);

  const [anchor] = element.getElementsByTagName('A');
  if (anchor) anchor.setAttribute(ariaExpanded, true);

  const siblings = element.parentNode.getElementsByTagName('LI');
  closeNavbars(Array.from(siblings).filter((x) => x !== element));

  emulateTransitionEnd(subMenu, () => {
    element.dispatchEvent(shownNavbarEvent);
  });
}

function closeNavbar(element, leave) {
  const subMenu = queryElement(`.${subnavClass}`, element);
  const [toggleElement] = element.getElementsByClassName(subnavToggleClass);
  const [anchor] = element.getElementsByTagName('A');
  const navTransitionEndHandler = () => {
    removeClass(element, openPositionClass);
    element.dispatchEvent(hiddenNavbarEvent);
  };

  if (hasClass(element, openNavClass)) {
    element.dispatchEvent(hideNavbarEvent);
    if (hideNavbarEvent.isDefaultPrevented) return;
    removeClass(element, openNavClass);
    if (leave) emulateTransitionEnd(subMenu, navTransitionEndHandler);
    else navTransitionEndHandler();
    if (anchor) anchor.setAttribute(ariaExpanded, false);
  }
  if (hasClass(element, openMobileClass)) {
    element.dispatchEvent(hideNavbarEvent);
    if (hideNavbarEvent.isDefaultPrevented) return;
    removeClass(element, openMobileClass);

    [toggleElement, anchor].forEach((x) => {
      if (x) x.setAttribute(ariaExpanded, false);
    });
    element.dispatchEvent(hiddenNavbarEvent);
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
      : element.getElementsByClassName(subnavToggleClass)[0];
    const anchor = toggleElement === navbarToggle
      ? null : element.getElementsByTagName('A')[0];
    const openSubs = element.getElementsByClassName(openMobileClass);

    if (!hasClass(element, openMobileClass)) {
      element.dispatchEvent(showNavbarEvent);

      if (toggleElement !== navbarToggle) {
        toggleNavbarResizeEvent(1);
      }

      if (showNavbarEvent.isDefaultPrevented) return;

      if (toggleElement !== navbarToggle) {
        const selection = options.toggleSiblings
          ? element.parentNode.getElementsByClassName(openMobileClass)
          : openSubs;
        closeNavbars(selection);
      }
      addClass(element, openMobileClass);

      if (toggleElement) toggleElement.setAttribute(ariaExpanded, true);
      if (anchor) anchor.setAttribute(ariaExpanded, true);

      element.dispatchEvent(shownNavbarEvent);
    } else {
      element.dispatchEvent(hideNavbarEvent);
      if (hideNavbarEvent.isDefaultPrevented) return;

      closeNavbars(openSubs);
      removeClass(element, openMobileClass);

      if (toggleElement) {
        toggleElement.setAttribute(ariaExpanded, false);
        toggleNavbarResizeEvent();
      }
      if (anchor) anchor.setAttribute(ariaExpanded, false);

      element.dispatchEvent(hiddenNavbarEvent);
    }
  }
}

function navbarEnterHandler() {
  const element = this;
  const menu = element.closest(`${navbarSelector},.${navbarString}`);
  const self = menu && menu[navbarComponent];

  // must always clear the timer
  clearTimeout(self.timer);
  if (self && !checkNavbarView(self)) {
    self.timer = setTimeout(() => openNavbar(element), 17);
  }
}

function navbarLeaveHandler() {
  const element = this;
  const menu = element.closest(`${navbarSelector},.${navbarString}`);
  const self = menu && menu[navbarComponent];

  if (self && !checkNavbarView(self)) {
    clearTimeout(self.timer);
    self.timer = setTimeout(() => closeNavbar(element, 1), self.options.delay);
  }
}

// NAVBAR DEFINITION
// =================
export default class Navbar {
  constructor(target, config) {
    // bind
    const self = this;

    // instance targets
    self.menu = queryElement(target);
    const { menu } = self;

    // reset on re-init
    if (menu[navbarComponent]) menu[navbarComponent].dispose();

    // set options
    self.options = normalizeOptions(menu, defaultNavbarOptions, config || {});

    // internal targets
    self.items = menu.getElementsByTagName('LI');
    [self.navbarToggle] = menu.getElementsByClassName(navbarToggleClass);

    // set additional properties
    self.timer = null;

    // attach events
    toggleNavbarEvents(self, 1);

    // attach instance to element
    menu[navbarComponent] = self;
  }

  // NAVBAR PUBLIC METHOD
  // ====================
  dispose() {
    const self = this;
    closeNavbars(self.items);
    toggleNavbarEvents(self);
    toggleNavbarResizeEvent();
    delete self.menu[navbarComponent];
  }
}

Navbar.init = {
  component: navbarComponent,
  selector: navbarSelector,
  constructor: Navbar,
  version,
};
