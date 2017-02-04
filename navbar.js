/* navbar.js - Minimal navigation script
 * by dnp_theme
 * Licensed under MIT-License
 */

(function (root,factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory); // AMD. Register as an anonymous module.
  } else if (typeof exports == 'object') {
    module.exports = factory(); // Node, not strict CommonJS
  } else {
    root.Navbar = factory();
  }
}(this, function () {

  // constants
  var isIE = navigator && (new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null) ? parseFloat( RegExp.$1 ) : false,
      supportTransitions = !(isIE && isIE<10),
      mouseHover = ('onmouseleave' in document) ? ['mouseenter', 'mouseleave'] : ['mouseover', 'mouseout'],
      
      // strings 
      getElementsByTagName = 'getElementsByTagName',
      querySelectorAll = 'querySelectorAll',
      length = 'length';

  // utilities
  function on(element, eventName, handler) {
    element.addEventListener(eventName, handler, false);
  }
  function addClass(element,classNAME) {
    element.classList.add(classNAME);
  }
  function removeClass(element,classNAME) {
    element.classList.remove(classNAME);
  }
  function hasClass(element,classNAME) {
    return element.classList.contains(classNAME);
  }

  // Navbar constructor
  var Navbar = function(el) {
    var menu = (typeof el === 'object') ? el : document.querySelector(el),
      items = menu[getElementsByTagName]('LI'),
      
      // private strings
      timer = 'timer',
      openClass = 'open',
      openPosition = 'open-position',
      
      // private method
      close = function (element){
        if ( hasClass(element,openClass) ) {
          removeClass(element,openClass);
          setTimeout(function(){ 
            removeClass(element,openPosition); 
          }, (supportTransitions ? 200 : 0));
        }      
      },

      // handlers
      enterHandler = function () {
        var that = this; // this is now the event target, the LI
        clearTimeout(that[timer]);
        if ( !hasClass(that,openClass) ) {
          that[timer] = setTimeout( function() {
            addClass(that,openClass); 
            addClass(that,openPosition);                        
            var siblings = that.parentNode[getElementsByTagName]('LI'); //all parentNode children
            for ( var h=0; h<siblings[length]; h++ ) {
              if ( siblings[h] !== that ) {//siblings only
                close(siblings[h])
              }  
            }
          }, 100 );  
        }
      },
      leaveHandler = function () {
        var that = this;
        clearTimeout(that[timer]);
        that[timer] = setTimeout( function() {
          close(that);
        }, 500);
      };

    // initialize
    for ( var i=0, itemsLength = items[length]; i<itemsLength; i++ ) {
      if ( items[i][getElementsByTagName]('UL')[length] ) {
        on(items[i], mouseHover[0], enterHandler);
        on(items[i], mouseHover[1], leaveHandler);  
      }
    }
  },

  // DATA API
  Navbars = document[querySelectorAll]('[data-function="navbar"]');
  for (var i=0, nl = Navbars[length]; i<nl; i++){
    new Navbar(Navbars[i])
  }
  return Navbar;
}));  