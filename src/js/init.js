import documentAll from 'shorter-js/src/selectors/documentAll';
import getElementsByTagName from 'shorter-js/src/selectors/getElementsByTagName';
import matches from 'shorter-js/src/selectors/matches';
import Navbar from './navbar';

// DATA API
/**
 * Navbar initialization callback
 * @param {HTMLElement=} context Element
 */
function initNavbar(context) {
  const { selector, init } = Navbar;
  const collection = [HTMLElement, Element].some((x) => context instanceof x)
    ? getElementsByTagName('*', context) : documentAll;

  [...collection].filter((x) => matches(x, selector)).map((x) => init(x));
}
// initialize when loaded
if (document.body) initNavbar();
else document.addEventListener('DOMContentLoaded', initNavbar, { once: true });
