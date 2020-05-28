import Navbar from './navbar.js'
import {one} from 'shorter-js/src/event/one.js'

// DATA API
function initComponent() {
  let Navbars = Array.from(document.querySelectorAll('[data-function="navbar"]'));
  Navbars.map(x=>new Navbar(x))
}
// initialize when loaded
document.body ? initComponent() : one(document, 'DOMContentLoaded', initComponent);
