/*!
* navbar.js v2.0.3 (http://thednp.github.io/navbar.js)
* Copyright 2016-2020 © thednp
* Licensed under MIT (https://github.com/thednp/navbar.js/blob/master/LICENSE)
*/
function on (element, event, handler, options) {
  options = options || false;
  element.addEventListener(event, handler, options);
}

function off (element, event, handler, options) {
  options = options || false;
  element.removeEventListener(event, handler, options);
}

function addClass(element,classNAME) {
  element.classList.add(classNAME);
}

function removeClass(element,classNAME) {
  element.classList.remove(classNAME);
}

function hasClass(element,classNAME) {
  return element.classList.contains(classNAME)
}

var mouseHoverEvents = ('onmouseleave' in document) ? [ 'mouseenter', 'mouseleave'] : [ 'mouseover', 'mouseout' ];

var supportTransition = 'webkitTransition' in document.body.style || 'transition' in document.body.style;

var transitionDuration = 'webkitTransition' in document.body.style ? 'webkitTransitionDuration' : 'transitionDuration';

function getElementTransitionDuration (element) {
  var duration = supportTransition ? window.getComputedStyle(element)[transitionDuration] : 0;
  duration = parseFloat(duration);
  duration = typeof duration === 'number' && !isNaN(duration) ? duration * 1000 : 0;
  return duration;
}

function queryElement (selector, parent) {
  var lookUp = parent && parent instanceof Element ? parent : document;
  return selector instanceof Element ? selector : lookUp.querySelector(selector);
}

function tryWrapper (fn,origin){
  try{ fn(); }
  catch(e){
    console.error((origin + ": " + e));
  }
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
      if (hasClass(element,openClass)) {
        removeClass(element, openClass);
        if (leave) {
          setTimeout(function () {
            removeClass(element, openPosition);
            element.isOpen = 0;
          }, transitionDuration);
        } else {
          removeClass(element, openPosition);
          element.isOpen = 0;
        }
      }
      if (hasClass(element,openMobile)) {
        removeClass(element,openMobile);
      }
    },
    checkView = function() {
      return firstToggle && getComputedStyle(firstToggle).display !== 'none' || window.innerWidth < breakpoint;
    },
    toggleEvents = function(action) {
      Array.from(items).map(function (listItem) {
        if (hasClass(listItem.lastElementChild,'subnav') ) {
          action(listItem, mouseHoverEvents[0], enterHandler);
          action(listItem, mouseHoverEvents[1], leaveHandler);
        }
        var toggleElement = listItem.getElementsByClassName(parentToggle)[0];
        toggleElement && action(toggleElement, 'click', clickHandler);
      });
      navbarToggle && action(navbarToggle, 'click', clickHandler);
    },
    clickHandler = function(e) {
      e.preventDefault();
      var that = this, lookup, element;
      if ( (e.target === that || that.contains(e.target)) ) {
        element = that.closest('li') || that.closest('.navbar');
        if ( !hasClass(element,openMobile) ) {
          addClass(element,openMobile);
          lookup = toggleSiblings ? element.parentNode.getElementsByTagName('LI') : element.getElementsByTagName('LI');
          Array.from(lookup).map(function (x){ return x!==element && close(x); });
        } else {
          removeClass(element,openMobile);
        }
      }
    },
    enterHandler = function () {
      var that = this;
      clearTimeout(that.timer);
      if (!that.isOpen && !checkView() ) {
        that.timer = setTimeout(function(){
          addClass(that,openPosition);
          addClass(that,openClass);
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
    toggleEvents(off);
    delete menu.Navbar;
  };
  tryWrapper(function (){
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
    toggleEvents(on);
    menu.Navbar = self;
  },'Navbar');
}

function one (element, event, handler, options) {
  on(element, event, function handlerWrapper(e){
    if (e.target === element) {
      handler(e);
      off(element, event, handlerWrapper, options);
    }
  }, options);
}

function initComponent() {
  var Navbars = Array.from(document.querySelectorAll('[data-function="navbar"]'));
  Navbars.map(function (x){ return new Navbar(x); });
}
document.body ? initComponent() : one(document, 'DOMContentLoaded', initComponent);

export default Navbar;
