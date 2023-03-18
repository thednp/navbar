import { getDocument, getElementsByTagName, matches, DOMContentLoadedEvent } from '@thednp/shorty';
import { addListener } from '@thednp/event-listener';

import Navbar from './navbar';

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
