import Navbar from './navbar.js';

// DATA API
function initNavbar(context) {
  const lookup = context instanceof Element ? context : document;

  const { selector, constructor } = Navbar.init;
  const navs = lookup.querySelectorAll(selector);

  Array.from(navs).map((x) => new constructor(x));
}
// initialize when loaded
if (document.body) initNavbar();
else document.addEventListener('DOMContentLoaded', initNavbar, { once: true });
