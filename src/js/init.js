import {navbarInit} from './navbar.js'

// DATA API
function initNavbar(lookup) {
  lookup = lookup ? lookup : document

  const { selector, constructor } = navbarInit,
    navs = lookup.querySelectorAll( selector )

  Array.from( navs ).map(x=>new constructor(x))
}
// initialize when loaded
document.body ? initNavbar() : 
document.addEventListener( 'DOMContentLoaded', initNavbar, {once: true} )

