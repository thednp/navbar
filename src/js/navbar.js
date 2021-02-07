import getElementTransitionDuration from 'shorter-js/src/misc/getElementTransitionDuration.js'
import queryElement from 'shorter-js/src/misc/queryElement.js'
import normalizeOptions from 'shorter-js/src/misc/normalizeOptions.js'
import addClass from 'shorter-js/src/class/addClass.js'
import hasClass from 'shorter-js/src/class/hasClass.js'
import removeClass from 'shorter-js/src/class/removeClass.js'


// NAVBAR GC
// =========
const navbarString = 'navbar',
  navbarComponent = 'Navbar',
  navbarSelector = `[data-function="${navbarString}"]`


// NAVBAR SCOPE
// ============
export default function Navbar( navbarElement, navbarOptions ) {

  // NAVBAR PRIVATE GC
  // =================
  const openClass = 'open',
    openPosition = 'open-position',
    openMobile = 'open-mobile',
    parentToggle = 'parent-toggle',
    defaultOptions = {
      breakpoint : 768,
      toggleSiblings : true,
      delay : 500
    }


  let self,
    ops = {},
    menu,
    items,
    navbarToggle,
    firstToggle,
    firstSubnav,
    transitionDuration

  // NAVBAR EVENT LISTENERS
  // ======================
  function clickHandler(e) {
    e.preventDefault()

    let that = this, lookup, element

    if ( e.target === that || that.contains( e.target ) ) {
      element = that.closest( 'LI' ) || that.closest( `.${navbarString}` )

      if ( !hasClass( element, openMobile ) ) {
        addClass( element, openMobile )

        lookup = ops.toggleSiblings 
          ? element.parentNode.getElementsByTagName( 'LI' ) 
          : element.getElementsByTagName( 'LI' )

        Array.from( lookup ).map( x=> x !== element && close(x) )

      } else {
        removeClass( element, openMobile )
      }
    }
  }

  function enterHandler() {
    let that = this // this is now the event target, the LI
    clearTimeout( that.timer )

    if ( !that.isOpen && !checkView() ) {
      that.timer = setTimeout( () => {
        addClass( that, openPosition )
        addClass( that, openClass )
        that.isOpen = 1

        Array.from( that.parentNode.getElementsByTagName( 'LI' ) )
          .map( x => x !== that && close(x) )
      }, 17 )
    }
  }

  function leaveHandler() {
    let that = this

    if ( that.isOpen && !checkView() ) {
      clearTimeout(that.timer)
      that.timer = setTimeout( () => close(that,1), ops.delay )
    }
  }

  // NAVBAR PRIVATE METHODS
  // ======================
  function close( element, leave ) {
    if ( hasClass( element,openClass ) ) {
      removeClass( element, openClass )
      if ( leave ) {
        setTimeout( () => {
          removeClass( element, openPosition )
          element.isOpen = 0
        }, transitionDuration)
      } else {
        removeClass( element, openPosition )
        element.isOpen = 0
      }
    } 
    hasClass( element, openMobile ) && removeClass( element, openMobile )
  }

  function checkView() {
    return firstToggle && getComputedStyle(firstToggle).display !== 'none' 
        || window.innerWidth < ops.breakpoint; 
  }

  function toggleEvents ( action ) {
    action = action ? 'addEventListener' : 'removeEventListener'

    Array.from(items).map(listItem => {
      if ( hasClass( listItem.lastElementChild, 'subnav' ) ) {
        listItem[action]('mouseenter', enterHandler);
        listItem[action]('mouseleave', leaveHandler);
        listItem[action]('focusin', enterHandler);
        listItem[action]('focusout', leaveHandler);
      }
      let toggleElement = listItem.getElementsByClassName(parentToggle)[0]
      toggleElement && toggleElement[action]( 'click', clickHandler); 
    })
    navbarToggle && navbarToggle[action]('click', clickHandler);
  }

  // NAVBAR DEFINITION
  // =================
  class Navbar {
    constructor( target, options ){

      // bind
      self = this

      // check options
      options = options || {}

      // instance targets
      menu = queryElement( target )

      // reset on re-init
      menu[navbarComponent] && menu[navbarComponent].dispose()

      // internal targets
      items = menu.getElementsByTagName( 'LI' )
      navbarToggle = queryElement( `.${navbarString}-toggle`, menu )
      firstToggle = queryElement( parentToggle, menu )
      firstSubnav = queryElement( '.subnav', menu )
      transitionDuration = firstSubnav ? getElementTransitionDuration(firstSubnav) : 0

      // set options
      ops = normalizeOptions( menu, defaultOptions, options )
      
      // attach events
      toggleEvents(1)

      // attach instance to element
      menu[navbarComponent] = self
    }
  }

  // NAVBAR PUBLIC METHOD
  // ====================
  Navbar.prototype.dispose = function() {
    toggleEvents()
    delete menu[navbarComponent]
  }

  return new Navbar( navbarElement, navbarOptions )
}

export const navbarInit = {
  component: navbarComponent,
  selector: navbarSelector,
  constructor: Navbar
}