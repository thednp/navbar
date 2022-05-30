/** @typedef {import('../../types/index')} */
import getDocument from '@thednp/shorty/src/get/getDocument';
import getElementsByTagName from '@thednp/shorty/src/selectors/getElementsByTagName';
import matches from '@thednp/shorty/src/selectors/matches';

import DOMContentLoadedEvent from '@thednp/shorty/src/strings/DOMContentLoadedEvent';

import Navbar from './navbar';

// DATA API
/**
 * Navbar initialization callback
 * @param {HTMLElement=} context Element
 */
function initNavbar(context) {
  const { selector, init } = Navbar;
  const collection = getElementsByTagName('*', getDocument(context));

  [...collection].filter((x) => matches(x, selector)).forEach(init);
}

// initialize when loaded
if (document.body) initNavbar();
else document.addEventListener(DOMContentLoadedEvent, initNavbar, { once: true });
