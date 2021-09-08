/*!
* Navbar.js v2.1.9 (http://thednp.github.io/navbar.js)
* Copyright 2016-2021 © thednp
* Licensed under MIT (https://github.com/thednp/navbar.js/blob/master/LICENSE)
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Navbar = factory());
}(this, (function () { 'use strict';

  var supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

  var transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

  var transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

  function getElementTransitionDuration(element) {
    var computedStyle = getComputedStyle(element);
    var propertyValue = computedStyle[transitionProperty];
    var durationValue = computedStyle[transitionDuration];
    var durationScale = durationValue.includes('ms') ? 1 : 1000;
    var duration = supportTransition && propertyValue && propertyValue !== 'none'
      ? parseFloat(durationValue) * durationScale : 0;

    return !Number.isNaN(duration) ? duration : 0;
  }

  function queryElement(selector, parent) {
    var lookUp = parent && parent instanceof Element ? parent : document;
    return selector instanceof Element ? selector : lookUp.querySelector(selector);
  }

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

  function normalizeOptions(element, defaultOps, inputOps, ns) {
    var normalOps = {};
    var dataOps = {};
    var data = Object.assign({}, element.dataset);

    Object.keys(data)
      .forEach(function (k) {
        var key = k.includes(ns)
          ? k.replace(ns, '').replace(/[A-Z]/, function (match) { return match.toLowerCase(); })
          : k;

        dataOps[key] = normalizeValue(data[k]);
      });

    Object.keys(inputOps)
      .forEach(function (k) {
        inputOps[k] = normalizeValue(inputOps[k]);
      });

    Object.keys(defaultOps)
      .forEach(function (k) {
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

  function addClass(element, classNAME) {
    element.classList.add(classNAME);
  }

  function hasClass(element, classNAME) {
    return element.classList.contains(classNAME);
  }

  function removeClass(element, classNAME) {
    element.classList.remove(classNAME);
  }

  var addEventListener = 'addEventListener';

  var removeEventListener = 'removeEventListener';

  var version = "2.1.9";

  // NAVBAR GC
  // =========
  var navbarString = 'navbar';
  var navbarComponent = 'Navbar';
  var navbarSelector = "[data-function=\"" + navbarString + "\"]";
  var openNavClass = 'open';
  var openPositionClass = 'open-position';
  var openMobileClass = 'open-mobile';
  var parentToggleClass = 'parent-toggle';
  var defaultNavbarOptions = {
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
        setTimeout(function () {
          removeClass(element, openPositionClass);
          element.isOpen = 0;
        }, self.transitionDuration);
      } else {
        removeClass(element, openPositionClass);
        element.isOpen = 0;
      }
    }
    if (hasClass(element, openMobileClass)) { removeClass(element, openMobileClass); }
  }

  function checkNavbarView(self) {
    var options = self.options;
    var firstToggle = self.firstToggle;
    return (firstToggle && getComputedStyle(firstToggle).display !== 'none')
      || window.innerWidth < options.breakpoint;
  }

  function toggleNavbarEvents(self, add) {
    var action = add ? addEventListener : removeEventListener;
    var items = self.items;
    var navbarToggle = self.navbarToggle;

    Array.from(items).forEach(function (listItem) {
      if (hasClass(listItem.lastElementChild, 'subnav')) {
        listItem[action]('mouseenter', navbarEnterHandler);
        listItem[action]('mouseleave', navbarLeaveHandler);
        listItem[action]('focusin', navbarEnterHandler);
        listItem[action]('focusout', navbarLeaveHandler);
      }
      var ref = listItem.getElementsByClassName(parentToggleClass);
      var toggleElement = ref[0];
      if (toggleElement) { toggleElement[action]('click', navbarClickHandler); }
    });

    if (navbarToggle) { navbarToggle[action]('click', navbarClickHandler); }
  }

  // NAVBAR EVENT LISTENERS
  // ======================
  function navbarClickHandler(e) {
    e.preventDefault();

    var target = e.target;
    var that = this;
    var menu = that.closest((navbarSelector + ",." + navbarString));
    var self = menu[navbarComponent];
    var options = self.options;

    if (target === that || that.contains(target)) {
      var element = that.closest('LI') || that.closest(("." + navbarString));

      if (!hasClass(element, openMobileClass)) {
        addClass(element, openMobileClass);

        var lookup = options.toggleSiblings
          ? element.parentNode.getElementsByTagName('LI')
          : element.getElementsByTagName('LI');

        Array.from(lookup).forEach(function (x) { if (x !== element) { closeNavbar(self, x); } });
      } else {
        removeClass(element, openMobileClass);
      }
    }
  }

  function navbarEnterHandler() {
    var target = this; // this is now the event target, the LI
    var menu = target.closest((navbarSelector + ",." + navbarString));
    var self = menu && menu[navbarComponent];

    clearTimeout(self.timer);
    if (self && !target.isOpen && !checkNavbarView(self)) {
      self.timer = setTimeout(function () {
        addClass(target, openPositionClass);
        addClass(target, openNavClass);
        target.isOpen = 1;

        Array.from(target.parentNode.getElementsByTagName('LI'))
          .forEach(function (x) {
            if (x !== target) { closeNavbar(self, x); }
          });
      }, 17);
    }
  }

  function navbarLeaveHandler() {
    var target = this;
    var menu = target.closest((navbarSelector + ",." + navbarString));
    var self = menu && menu[navbarComponent];

    if (self && target.isOpen && !checkNavbarView(self)) {
      clearTimeout(self.timer);
      self.timer = setTimeout(function () { return closeNavbar(self, target, 1); }, self.options.delay);
    }
  }

  // NAVBAR DEFINITION
  // =================
  var Navbar = function Navbar(target, config) {
    var assign;

    // bind
    var self = this;

    // instance targets
    self.menu = queryElement(target);
    var menu = self.menu;
    var firstSubnav = queryElement('.subnav', menu);

    // reset on re-init
    if (menu[navbarComponent]) { menu[navbarComponent].dispose(); }

    // set options
    self.options = normalizeOptions(menu, defaultNavbarOptions, config || {});

    // internal targets
    self.items = menu.getElementsByTagName('LI');
    self.navbarToggle = queryElement(("." + navbarString + "-toggle"), menu);
    (assign = menu.getElementsByClassName(parentToggleClass), self.firstToggle = assign[0]);

    // set additional properties
    self.timer = null;
    self.transitionDuration = firstSubnav ? getElementTransitionDuration(firstSubnav) : 0;

    // attach events
    toggleNavbarEvents(self, 1);

    // attach instance to element
    menu[navbarComponent] = self;
  };

  // NAVBAR PUBLIC METHOD
  // ====================
  Navbar.prototype.dispose = function dispose () {
    var self = this;
    toggleNavbarEvents(self);
    delete self.menu[navbarComponent];
  };

  Navbar.init = {
    component: navbarComponent,
    selector: navbarSelector,
    constructor: Navbar,
    version: version,
  };

  // DATA API
  function initNavbar(context) {
    var lookup = context instanceof Element ? context : document;

    var ref = Navbar.init;
    var selector = ref.selector;
    var constructor = ref.constructor;
    var navs = lookup.querySelectorAll(selector);

    Array.from(navs).map(function (x) { return new constructor(x); });
  }
  // initialize when loaded
  if (document.body) { initNavbar(); }
  else { document.addEventListener('DOMContentLoaded', initNavbar, { once: true }); }

  return Navbar;

})));
