import Navbar from './navbar.js'

// DATA API
function initComponent(lookup) {
  lookup = lookup ? lookup : document;
  let Navbars = Array.from(lookup.querySelectorAll('[data-function="navbar"]'));
  Navbars.map(x=>new Navbar(x))
}
// initialize when loaded
document.body ? initComponent() : document.addEventListener( 'DOMContentLoaded', function iniWrapper(){
  initComponent();
  document.removeEventListener( 'DOMContentLoaded', iniWrapper )
});

