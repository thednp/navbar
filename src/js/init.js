import Navbar from './navbar';

// DATA API
/**
 * Navbar initialization callback
 * @param {Element | undefined} context Element
 */
function initNavbar(context) {
  const lookup = context instanceof Element ? context : document;

  const { selector, init } = Navbar;
  const navs = lookup.querySelectorAll(selector);

  Array.from(navs).map((x) => init(x));
}
// initialize when loaded
if (document.body) initNavbar();
else document.addEventListener('DOMContentLoaded', initNavbar, { once: true });
