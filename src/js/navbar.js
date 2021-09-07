import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js';
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
const parentToggleClass = 'parent-toggle';
const defaultNavbarOptions = {
  breakpoint: 768,
  toggleSiblings: true,
  delay: 500,
};

// NAVBAR PRIVATE METHODS
// ======================
function closeNavbar(self, element, leave) {
  if (hasClass(element, openNavClass)) {
    removeClass(element, openNavClass);
    if (leave) {
      setTimeout(() => {
        removeClass(element, openPositionClass);
        element.isOpen = 0;
      }, self.transitionDuration);
    } else {
      removeClass(element, openPositionClass);
      element.isOpen = 0;
    }
  }
  if (hasClass(element, openMobileClass)) removeClass(element, openMobileClass);
}

function checkNavbarView(self) {
  const { options, firstToggle } = self;
  return (firstToggle && getComputedStyle(firstToggle).display !== 'none')
    || window.innerWidth < options.breakpoint;
}

function toggleNavbarEvents(self, add) {
  const action = add ? addEventListener : removeEventListener;
  const { items, navbarToggle } = self;

  Array.from(items).forEach((listItem) => {
    if (hasClass(listItem.lastElementChild, 'subnav')) {
      listItem[action]('mouseenter', navbarEnterHandler);
      listItem[action]('mouseleave', navbarLeaveHandler);
      listItem[action]('focusin', navbarEnterHandler);
      listItem[action]('focusout', navbarLeaveHandler);
    }
    const [toggleElement] = listItem.getElementsByClassName(parentToggleClass);
    if (toggleElement) toggleElement[action]('click', navbarClickHandler);
  });

  if (navbarToggle) navbarToggle[action]('click', navbarClickHandler);
}

// NAVBAR EVENT LISTENERS
// ======================
function navbarClickHandler(e) {
  e.preventDefault();

  const { target } = e;
  const that = this;
  const menu = that.closest(`${navbarSelector},.${navbarString}`);
  const self = menu[navbarComponent];
  const { options } = self;

  if (target === that || that.contains(target)) {
    const element = that.closest('LI') || that.closest(`.${navbarString}`);

    if (!hasClass(element, openMobileClass)) {
      addClass(element, openMobileClass);

      const lookup = options.toggleSiblings
        ? element.parentNode.getElementsByTagName('LI')
        : element.getElementsByTagName('LI');

      Array.from(lookup).forEach((x) => { if (x !== element) closeNavbar(self, x); });
    } else {
      removeClass(element, openMobileClass);
    }
  }
}

function navbarEnterHandler() {
  const target = this; // this is now the event target, the LI
  const menu = target.closest(`${navbarSelector},.${navbarString}`);
  const self = menu && menu[navbarComponent];

  clearTimeout(self.timer);
  if (self && !target.isOpen && !checkNavbarView(self)) {
    self.timer = setTimeout(() => {
      addClass(target, openPositionClass);
      addClass(target, openNavClass);
      target.isOpen = 1;

      Array.from(target.parentNode.getElementsByTagName('LI'))
        .forEach((x) => {
          if (x !== target) closeNavbar(self, x);
        });
    }, 17);
  }
}

function navbarLeaveHandler() {
  const target = this;
  const menu = target.closest(`${navbarSelector},.${navbarString}`);
  const self = menu && menu[navbarComponent];

  if (self && target.isOpen && !checkNavbarView(self)) {
    clearTimeout(self.timer);
    self.timer = setTimeout(() => closeNavbar(self, target, 1), self.options.delay);
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
    const firstSubnav = queryElement('.subnav', menu);

    // reset on re-init
    if (menu[navbarComponent]) menu[navbarComponent].dispose();

    // set options
    self.options = normalizeOptions(menu, defaultNavbarOptions, config || {});

    // internal targets
    self.items = menu.getElementsByTagName('LI');
    self.navbarToggle = queryElement(`.${navbarString}-toggle`, menu);
    [self.firstToggle] = menu.getElementsByClassName(parentToggleClass);

    // set additional properties
    self.timer = null;
    self.transitionDuration = firstSubnav ? getElementTransitionDuration(firstSubnav) : 0;

    // attach events
    toggleNavbarEvents(self, 1);

    // attach instance to element
    menu[navbarComponent] = self;
  }

  // NAVBAR PUBLIC METHOD
  // ====================
  dispose() {
    const self = this;
    toggleNavbarEvents(self);
    delete self.menu[navbarComponent];
  }
}

Navbar.init = {
  component: navbarComponent,
  selector: navbarSelector,
  constructor: Navbar,
  version,
};
