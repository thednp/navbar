import Navbar from './navbar.js'
import {one} from 'shorter-js/src/event/one.js'
import {tryWrapper} from 'shorter-js/src/misc/tryWrapper.js'

// DATA API
function initComponent() {
  tryWrapper(()=>{
    let Navbars = Array.from(document.querySelectorAll('[data-function="navbar"]'));
    Navbars.map(x=>new Navbar(x))
  },'Navbar')
}
// initialize when loaded
document.body ? initComponent() : one(document, 'DOMContentLoaded', initComponent);
