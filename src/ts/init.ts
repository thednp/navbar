/** @typedef {import('../../types/index')} */
import getDocument from '@thednp/shorty/src/get/getDocument';
import getElementsByTagName from '@thednp/shorty/src/selectors/getElementsByTagName';
import matches from '@thednp/shorty/src/selectors/matches';

import DOMContentLoadedEvent from '@thednp/shorty/src/strings/DOMContentLoadedEvent';

import Navbar from './navbar';
import { addListener } from '@thednp/event-listener';

// DATA API
/**
 * Navbar initialization callback
 *
 * @param context Element
 */
const initNavbar = (context?: ParentNode) => {
  const { selector, init } = Navbar;
  const collection = getElementsByTagName('*', getDocument(context));

  [...collection].filter(x => matches(x, selector)).forEach(init);
};

// initialize when loaded
if (document.body) initNavbar();
else addListener(document, DOMContentLoadedEvent, () => initNavbar(), { once: true });
