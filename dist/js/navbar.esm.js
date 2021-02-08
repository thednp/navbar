/*!
* Navbar.js v2.1.2 (http://thednp.github.io/navbar.js)
* Copyright 2016-2021 © thednp
* Licensed under MIT (https://github.com/thednp/navbar.js/blob/master/LICENSE)
*/
var supportTransition = 'webkitTransition' in document.head.style || 'transition' in document.head.style;

var transitionDuration = 'webkitTransition' in document.head.style ? 'webkitTransitionDuration' : 'transitionDuration';

var transitionProperty = 'webkitTransition' in document.head.style ? 'webkitTransitionProperty' : 'transitionProperty';

function getElementTransitionDuration(element) {
  var computedStyle = getComputedStyle(element),
      propertyValue = computedStyle[transitionProperty],
      durationValue = computedStyle[transitionDuration],
      durationScale = durationValue.includes('ms') ? 1 : 1000,
      duration = supportTransition && propertyValue && propertyValue !== 'none' 
               ? parseFloat( durationValue ) * durationScale : 0;

  return !isNaN(duration) ? duration : 0
}

function queryElement(selector, parent) {
  var lookUp = parent && parent instanceof Element ? parent : document;
  return selector instanceof Element ? selector : lookUp.querySelector(selector);
}

function normalizeValue( value ) {
  if ( value === 'true' ) {
    return true
  }

  if ( value === 'false' ) {
    return false
  }

  if ( !isNaN(value) ) {
    return +value
  }

  if ( value === '' || value === 'null' ) {
    return null
  }

  // string / function / Element / Object
  return value
}

function normalizeOptions( element, defaultOps, inputOps, ns ){
  var normalOps = {}, dataOps = {}, 
    data = Object.assign( {}, element.dataset );

  Object.keys( data )
    .map( function (k) {
      var key = k.includes( ns ) 
        ? k.replace( ns, '' ) .replace(/[A-Z]/, function (match) { return match.toLowerCase(); } ) 
        : k;

      dataOps[key] =  normalizeValue( data[k] );
    });

  Object.keys( inputOps )
    .map( function (k) {
      inputOps[k] = normalizeValue( inputOps[k] );
    });

  Object.keys( defaultOps )
    .map( function (k) {
      normalOps[k] = k in inputOps ? inputOps[k]
        : k in dataOps ? dataOps[k]
        : defaultOps[k];
    });

  return normalOps
}

function addClass(element,classNAME) {
  element.classList.add(classNAME);
}

function hasClass(element,classNAME) {
  return element.classList.contains(classNAME)
}

function removeClass(element,classNAME) {
  element.classList.remove(classNAME);
}

var addEventListener = 'addEventListener';

var removeEventListener = 'removeEventListener';

// NAVBAR GC
// =========
var navbarString = 'navbar',
  navbarComponent = 'Navbar',
  navbarSelector = "[data-function=\"" + navbarString + "\"]";


// NAVBAR SCOPE
// ============
function Navbar( navbarElement, navbarOptions ) {

  // NAVBAR PRIVATE GC
  // =================
  var openClass = 'open',
    openPosition = 'open-position',
    openMobile = 'open-mobile',
    parentToggle = 'parent-toggle',
    defaultOptions = {
      breakpoint : 768,
      toggleSiblings : true,
      delay : 500
    };


  var self,
    ops = {},
    menu,
    items,
    navbarToggle,
    firstToggle,
    firstSubnav,
    transitionDuration;

  // NAVBAR EVENT LISTENERS
  // ======================
  function clickHandler(e) {
    e.preventDefault();

    var that = this, lookup, element;

    if ( e.target === that || that.contains( e.target ) ) {
      element = that.closest( 'LI' ) || that.closest( ("." + navbarString) );

      if ( !hasClass( element, openMobile ) ) {
        addClass( element, openMobile );

        lookup = ops.toggleSiblings 
          ? element.parentNode.getElementsByTagName( 'LI' ) 
          : element.getElementsByTagName( 'LI' );

        Array.from( lookup ).map( function (x){ return x !== element && close(x); } );

      } else {
        removeClass( element, openMobile );
      }
    }
  }

  function enterHandler() {
    var that = this; // this is now the event target, the LI
    clearTimeout( that.timer );

    if ( !that.isOpen && !checkView() ) {
      that.timer = setTimeout( function () {
        addClass( that, openPosition );
        addClass( that, openClass );
        that.isOpen = 1;

        Array.from( that.parentNode.getElementsByTagName( 'LI' ) )
          .map( function (x) { return x !== that && close(x); } );
      }, 17 );
    }
  }

  function leaveHandler() {
    var that = this;

    if ( that.isOpen && !checkView() ) {
      clearTimeout(that.timer);
      that.timer = setTimeout( function () { return close(that,1); }, ops.delay );
    }
  }

  // NAVBAR PRIVATE METHODS
  // ======================
  function close( element, leave ) {
    if ( hasClass( element,openClass ) ) {
      removeClass( element, openClass );
      if ( leave ) {
        setTimeout( function () {
          removeClass( element, openPosition );
          element.isOpen = 0;
        }, transitionDuration);
      } else {
        removeClass( element, openPosition );
        element.isOpen = 0;
      }
    } 
    hasClass( element, openMobile ) && removeClass( element, openMobile );
  }

  function checkView() {
    return firstToggle && getComputedStyle(firstToggle).display !== 'none' 
        || window.innerWidth < ops.breakpoint; 
  }

  function toggleEvents ( action ) {
    action = action ? addEventListener : removeEventListener;

    Array.from(items).map(function (listItem) {
      if ( hasClass( listItem.lastElementChild, 'subnav' ) ) {
        listItem[action]('mouseenter', enterHandler);
        listItem[action]('mouseleave', leaveHandler);
        listItem[action]('focusin', enterHandler);
        listItem[action]('focusout', leaveHandler);
      }
      var toggleElement = listItem.getElementsByClassName(parentToggle)[0];
      toggleElement && toggleElement[action]( 'click', clickHandler); 
    });
    navbarToggle && navbarToggle[action]('click', clickHandler);
  }

  // NAVBAR DEFINITION
  // =================
  var Navbar = function Navbar( target, options ){

    // bind
    self = this;

    // check options
    options = options || {};

    // instance targets
    menu = queryElement( target );

    // reset on re-init
    menu[navbarComponent] && menu[navbarComponent].dispose();

    // internal targets
    items = menu.getElementsByTagName( 'LI' );
    navbarToggle = queryElement( ("." + navbarString + "-toggle"), menu );
    firstToggle = queryElement( parentToggle, menu );
    firstSubnav = queryElement( '.subnav', menu );
    transitionDuration = firstSubnav ? getElementTransitionDuration(firstSubnav) : 0;

    // set options
    ops = normalizeOptions( menu, defaultOptions, options );
      
    // attach events
    toggleEvents(1);

    // attach instance to element
    menu[navbarComponent] = self;
  };

  // NAVBAR PUBLIC METHOD
  // ====================
  Navbar.prototype.dispose = function() {
    toggleEvents();
    delete menu[navbarComponent];
  };

  return new Navbar( navbarElement, navbarOptions )
}

var navbarInit = {
  component: navbarComponent,
  selector: navbarSelector,
  constructor: Navbar
};

// DATA API
function initNavbar(lookup) {
  lookup = lookup ? lookup : document;

  var selector = navbarInit.selector;
  var constructor = navbarInit.constructor;
  var navs = lookup.querySelectorAll( selector );

  Array.from( navs ).map(function (x){ return new constructor(x); });
}
// initialize when loaded
document.body ? initNavbar() : 
document.addEventListener( 'DOMContentLoaded', initNavbar, {once: true} );

export default Navbar;
