/*!
* Navbar.js v2.0.8 (http://thednp.github.io/navbar.js)
* Copyright 2016-2020 © thednp
* Licensed under MIT (https://github.com/thednp/navbar.js/blob/master/LICENSE)
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Navbar = factory());
}(this, (function () { 'use strict';

  var mouseHoverEvents = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ];

  var supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

  var transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

  function getElementTransitionDuration(element) {
    var duration = supportTransition ? parseFloat(getComputedStyle(element)[transitionDuration]) : 0;
    duration = typeof duration === 'number' && !isNaN(duration) ? duration * 1000 : 0;
    return duration;
  }

  function queryElement(selector, parent) {
    var lookUp = parent && parent instanceof Element ? parent : document;
    return selector instanceof Element ? selector : lookUp.querySelector(selector);
  }

  function Navbar(target, options) {
    options = options || {};
    var self = this,
      menu,
      items,
      navbarToggle,
      firstToggle,
      firstSubnav,
      transitionDuration,
      openClass = 'open',
      openPosition = 'open-position',
      openMobile = 'open-mobile',
      parentToggle = 'parent-toggle',
      breakpointOption,
      toggleSiblingsOption,
      delayOption,
      dataBreakpoint,
      dataToggleSiblings,
      dataDelay,
      breakpoint,
      toggleSiblings,
      delayDuration,
      close = function (element, leave) {
        if (element.classList.contains(openClass)) {
          element.classList.remove(openClass);
          if (leave) {
            setTimeout(function () {
              element.classList.remove(openPosition);
              element.isOpen = 0;
            }, transitionDuration);
          } else {
            element.classList.remove(openPosition);
            element.isOpen = 0;
          }
        }
        if (element.classList.contains(openMobile)) {
          element.classList.remove(openMobile);
        }
      },
      checkView = function() {
        return firstToggle && getComputedStyle(firstToggle).display !== 'none' || window.innerWidth < breakpoint;
      },
      toggleEvents = function(action) {
        action = action ? 'addEventListener' : 'removeEventListener';
        Array.from(items).map(function (listItem) {
          if (listItem.lastElementChild.classList.contains('subnav') ) {
            listItem[action](mouseHoverEvents[0], enterHandler);
            listItem[action](mouseHoverEvents[1], leaveHandler);
          }
          var toggleElement = listItem.getElementsByClassName(parentToggle)[0];
          toggleElement && toggleElement[action]( 'click', clickHandler);
        });
        navbarToggle && navbarToggle[action]('click', clickHandler);
      },
      clickHandler = function(e) {
        e.preventDefault();
        var that = this, lookup, element;
        if ( (e.target === that || that.contains(e.target)) ) {
          element = that.closest('li') || that.closest('.navbar');
          if ( !element.classList.contains(openMobile) ) {
            element.classList.add(openMobile);
            lookup = toggleSiblings ? element.parentNode.getElementsByTagName('LI') : element.getElementsByTagName('LI');
            Array.from(lookup).map(function (x){ return x!==element && close(x); });
          } else {
            element.classList.remove(openMobile);
          }
        }
      },
      enterHandler = function () {
        var that = this;
        clearTimeout(that.timer);
        if (!that.isOpen && !checkView() ) {
          that.timer = setTimeout(function(){
            that.classList.add(openPosition);
            that.classList.add(openClass);
            that.isOpen = 1;
            Array.from(that.parentNode.getElementsByTagName('LI'))
                  .map(function (x) { return x !== that && close(x); });
          },17);
        }
      },
      leaveHandler = function() {
        var that = this;
        if (that.isOpen && !checkView()) {
          clearTimeout(that.timer);
          that.timer = setTimeout(function () { return close(that,1); }, delayDuration);
        }
      };
    this.dispose = function() {
      toggleEvents();
      delete menu.Navbar;
    };
    menu = queryElement(target);
    menu.Navbar && menu.Navbar.dispose();
    items = menu.getElementsByTagName('LI');
    navbarToggle = menu.getElementsByClassName('navbar-toggle')[0];
    firstToggle = menu.getElementsByClassName(parentToggle)[0];
    firstSubnav = menu.getElementsByClassName('subnav')[0];
    transitionDuration = firstSubnav ? getElementTransitionDuration(firstSubnav) : 0;
    breakpointOption = options.breakpoint;
    toggleSiblingsOption = options.toggleSiblings;
    delayOption = options.delay;
    dataBreakpoint = menu.getAttribute('data-breakpoint');
    dataToggleSiblings = menu.getAttribute('data-toggle-siblings');
    dataDelay = menu.getAttribute('data-delay');
    breakpoint = !isNaN(breakpointOption) ? breakpointOption : dataBreakpoint && !isNaN(dataBreakpoint) ? parseInt(dataBreakpoint) : 768;
    toggleSiblings = !!toggleSiblingsOption ? toggleSiblingsOption : dataToggleSiblings && dataToggleSiblings === 'true' ? 1 : 0;
    delayDuration = !isNaN(delayOption) ? delayOption : dataDelay && !isNaN(dataDelay) ? parseInt(dataDelay) : 500;
    toggleEvents(1);
    menu.Navbar = self;
  }

  function initComponent(lookup) {
    lookup = lookup ? lookup : document;
    var Navbars = Array.from(lookup.querySelectorAll('[data-function="navbar"]'));
    Navbars.map(function (x){ return new Navbar(x); });
  }
  document.body ? initComponent() : document.addEventListener( 'DOMContentLoaded', function iniWrapper(){
    initComponent();
    document.removeEventListener( 'DOMContentLoaded', iniWrapper );
  });

  return Navbar;

})));
