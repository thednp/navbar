import { addListener, removeListener } from '@thednp/event-listener';
import {
  keySpace,
  keyEscape,
  ariaExpanded,
  keyArrowRight,
  keyArrowLeft,
  keyArrowDown,
  keyArrowUp,
  getElementStyle,
  getWindow,
  getDocument,
  Timer,
  resizeEvent,
  keyupEvent,
  keydownEvent,
  mouseclickEvent,
  mouseleaveEvent,
  mouseenterEvent,
  getInstance,
  Data,
  ObjectKeys,
  normalizeOptions,
  passiveHandler,
  emulateTransitionEnd,
  dispatchEvent,
  addClass,
  hasClass,
  removeClass,
  isRTL,
  setAttribute,
  querySelector,
  matches,
  closest,
  getElementsByTagName,
  getElementsByClassName,
  createCustomEvent,
  isHTMLElement,
} from '@thednp/shorty';

import { version } from '../../package.json';

// NAVBAR GC
// =========
const navbarString = 'navbar';
const navbarComponent = 'Navbar';
const navbarSelector = `[data-function="${navbarString}"]`;
const navbarSelectors = `${navbarSelector},.${navbarString}`;
const openNavClass = 'open';
const openPositionClass = 'open-position';
const openMobileClass = 'open-mobile';
const subnavClass = 'subnav';
const subnavToggleClass = `${subnavClass}-toggle`;
const navbarToggleClass = `${navbarString}-toggle`;

const defaultNavbarOptions = {
  breakpoint: 768,
  toggleSiblings: true,
  delay: 500,
};

const showNavbarEvent = createCustomEvent(`show.${navbarString}`);
const shownNavbarEvent = createCustomEvent(`shown.${navbarString}`);
const hideNavbarEvent = createCustomEvent(`hide.${navbarString}`);
const hiddenNavbarEvent = createCustomEvent(`hidden.${navbarString}`);

/**
 * Returns a `Navbar` instance.
 *
 * @param element target element
 */
const getNavbarInstance = (element: HTMLElement) => getInstance<Navbar>(element, navbarComponent);

/**
 * Returns a `Navbar` instance.
 *
 * @param element target element
 */
const initNavbarCallback = (element: HTMLElement | string) => new Navbar(element);

// NAVBAR PRIVATE METHODS
// ======================
/**
 * @param self
 * @param add
 */
const toggleNavbarResizeEvent = (self: Navbar, add?: boolean) => {
  const action = add ? addListener : removeListener;

  action(getWindow(self.menu), resizeEvent, self.listenResize, passiveHandler);
};

/**
 * Returns `TRUE` if is mobile.
 *
 * @param self
 */
const checkNavbarView = (self: Navbar): boolean => {
  const { options, menu } = self;
  const [firstToggle] = getElementsByClassName(subnavToggleClass, menu);
  return (
    (firstToggle && getElementStyle(firstToggle, 'display') !== 'none') ||
    getWindow(menu).innerWidth < options.breakpoint
  );
};

/**
 * @param self
 * @param add
 */
const toggleNavbarEvents = (self: Navbar, add?: boolean) => {
  const action = add ? addListener : removeListener;
  const { items, navbarToggle, menu } = self;
  const doc = getDocument(menu);

  [...items].forEach(x => {
    const { lastElementChild } = x;
    if (lastElementChild && hasClass(lastElementChild as HTMLElement, subnavClass)) {
      action(x, mouseenterEvent, navbarEnterHandler);
      action(x, mouseleaveEvent, navbarLeaveHandler);
    }

    const [toggleElement] = getElementsByClassName(subnavToggleClass, x);
    if (toggleElement) action(toggleElement, mouseclickEvent, navbarClickHandler as EventListener);
  });

  action(doc, keydownEvent, navbarPreventScroll as EventListener);
  action(doc, keyupEvent, navbarKeyHandler as EventListener);
  /* istanbul ignore else */
  if (navbarToggle) action(navbarToggle, mouseclickEvent, navbarClickHandler as EventListener);
};

/**
 * @param element
 * @param selector
 */
const findChild = (element: HTMLElement, selector: string): HTMLElement => {
  return [...element.children].find(x => matches(x, selector)) as HTMLElement;
};

/** @param element */
const openNavbar = (element: HTMLElement) => {
  const subMenu = findChild(element, `.${subnavClass}`);
  const anchor = findChild(element, 'A');

  /* istanbul ignore else */
  if (anchor) {
    dispatchEvent(anchor, showNavbarEvent);
    if (showNavbarEvent.defaultPrevented) return;
  }

  addClass(element, openPositionClass);
  addClass(element, openNavClass);

  const { parentElement } = element;
  /* istanbul ignore else */
  if (parentElement) {
    const siblings = getElementsByClassName(openNavClass, parentElement);
    closeNavbars([...siblings].filter(x => x !== element));
  }

  const navOpenTransitionEnd = () => {
    Timer.clear(element, 'in');

    /* istanbul ignore else */
    if (anchor) {
      dispatchEvent(anchor, shownNavbarEvent);
      setAttribute(anchor, ariaExpanded, 'true');
    }
  };

  /* istanbul ignore else */
  if (subMenu) emulateTransitionEnd(subMenu, navOpenTransitionEnd);
};

/**
 * @param  element
 * @param  leave
 */
const closeNavbar = (element: HTMLElement, leave?: boolean) => {
  const subMenu = findChild(element, `.${subnavClass}`);
  const anchor = findChild(element, 'A');
  const toggleElement = findChild(element, subnavToggleClass);

  if ([openNavClass, openMobileClass].some(c => hasClass(element, c))) {
    /* istanbul ignore else */
    if (anchor) {
      dispatchEvent(anchor, hideNavbarEvent);
      /* istanbul ignore next: some strange bug with istanbul */
      if (hideNavbarEvent.defaultPrevented) return;
    }
  }

  if (hasClass(element, openNavClass)) {
    const navCloseTransitionEnd = () => {
      removeClass(element, openPositionClass);
      Timer.clear(element, 'out');
      /* istanbul ignore else */
      if (anchor) {
        dispatchEvent(anchor, hiddenNavbarEvent);
        setAttribute(anchor, ariaExpanded, 'false');
      }
    };

    removeClass(element, openNavClass);
    if (leave && subMenu) emulateTransitionEnd(subMenu, navCloseTransitionEnd);
    else navCloseTransitionEnd();
  }

  if (hasClass(element, openMobileClass)) {
    removeClass(element, openMobileClass);

    [toggleElement, anchor].forEach(x => {
      if (x) setAttribute(x, ariaExpanded, 'false');
    });
    /* istanbul ignore else */
    if (anchor) dispatchEvent(anchor, hiddenNavbarEvent);
  }
};

/** @param collection */
const closeNavbars = (collection: HTMLCollectionOf<HTMLElement> | HTMLElement[]) => {
  ([...collection] as HTMLElement[]).forEach(x => closeNavbar(x));
};

// NAVBAR EVENT LISTENERS
// ======================

/**
 * @param e event object
 */
const navbarPreventScroll = (e: KeyboardEvent) => {
  const { code, target } = e;
  /* istanbul ignore next */
  const menu = isHTMLElement(target) ? closest(target, navbarSelectors) : null;
  /* istanbul ignore next */
  if (menu && [keyArrowDown, keyArrowUp, keySpace].includes(code)) e.preventDefault();
};

/**
 * @param e Event object
 */
function navbarKeyHandler(this: HTMLElement, e: KeyboardEvent) {
  const { code } = e;
  const { activeElement } = getDocument(this);
  const menu = activeElement && closest(activeElement as HTMLElement, 'nav');
  const self = menu && getNavbarInstance(menu);

  /* istanbul ignore next: filter is required */
  if (!self || !activeElement || (this && !this.contains(activeElement))) return;

  const element = closest(activeElement as HTMLElement, 'LI');
  /* istanbul ignore next: filter is required */
  if (!element) return;

  const isMobile = checkNavbarView(self);
  const { previousElementSibling, nextElementSibling } = element;
  const openParentElement = closest(element, `.${openNavClass}`);
  const parentMenu = closest(element, 'UL');
  const [subnavMenu] = getElementsByClassName(subnavClass, element);
  const preventableEvents = [keySpace, keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp];
  const isColumn = parentMenu && getElementStyle(parentMenu, 'flex-direction') === 'column';
  const RTL = isRTL(element);
  const sidePrevKey = RTL ? /* istanbul ignore next */ keyArrowRight : keyArrowLeft;
  const sideNextKey = RTL ? /* istanbul ignore next */ keyArrowLeft : keyArrowRight;
  const prevSelection =
    parentMenu && previousElementSibling && ((code === keyArrowUp && isColumn) || (code === sidePrevKey && !isColumn));
  const nextSelection =
    parentMenu && nextElementSibling && ((code === keyArrowDown && isColumn) || (code === sideNextKey && !isColumn));
  let elementToFocus: HTMLElement | null = null;

  if (code === keyEscape && openParentElement) {
    navbarLeaveHandler.call(openParentElement);
    elementToFocus = openParentElement;
  } else if (!isMobile && subnavMenu && code === keySpace) {
    if (hasClass(element, openNavClass)) navbarLeaveHandler.call(element);
    else navbarEnterHandler.call(element);
  }

  if (prevSelection && element !== parentMenu.firstElementChild) {
    elementToFocus = previousElementSibling as HTMLElement;
  } else if (nextSelection && element !== parentMenu.lastElementChild) {
    elementToFocus = nextElementSibling as HTMLElement;
  }

  if (elementToFocus) {
    const { firstElementChild } = elementToFocus;
    /* istanbul ignore else */
    if (firstElementChild) (firstElementChild as HTMLElement).focus();
  }

  if (!isMobile && preventableEvents.includes(code)) {
    e.preventDefault();
  }
}

/**
 * @param e Event object
 */
const navbarClickHandler = (e: MouseEvent) => {
  e.preventDefault();

  const { currentTarget, target } = e;
  const menu = closest(currentTarget as HTMLElement, navbarSelectors);
  const self = menu && getNavbarInstance(menu);
  // console.log(currentTarget, e.target, self);

  /* istanbul ignore next: filter is required */
  if (!self) return;

  const { options, navbarToggle } = self;

  /* istanbul ignore else */
  if (target === currentTarget || (currentTarget as HTMLElement).contains(target as Node)) {
    const element = closest(currentTarget as HTMLElement, 'LI') || menu;
    const toggleElement =
      closest(currentTarget as HTMLElement, `.${navbarToggleClass}`) === navbarToggle
        ? navbarToggle
        : findChild(element, `.${subnavToggleClass}`);
    const anchor = toggleElement === navbarToggle ? null : findChild(element, 'A');
    const openSubs = getElementsByClassName(openMobileClass, element);

    if (!hasClass(element, openMobileClass)) {
      if (anchor) {
        dispatchEvent(anchor, showNavbarEvent);
        /* istanbul ignore next */
        if (showNavbarEvent.defaultPrevented) return;
      }

      if (toggleElement === navbarToggle) {
        toggleNavbarResizeEvent(self, true);
      } else {
        const selection = options.toggleSiblings
          ? getElementsByClassName(openMobileClass, element.parentElement as ParentNode)
          : /* istanbul ignore next */ openSubs;
        closeNavbars(selection);
      }
      addClass(element, openMobileClass);

      /* istanbul ignore else */
      if (toggleElement) setAttribute(toggleElement, ariaExpanded, 'true');
      if (anchor) {
        setAttribute(anchor, ariaExpanded, 'true');
        dispatchEvent(anchor, shownNavbarEvent);
      }
    } else {
      if (anchor) {
        dispatchEvent(anchor, hideNavbarEvent);
        /* istanbul ignore next */
        if (hideNavbarEvent.defaultPrevented) return;
      }

      closeNavbars(openSubs);
      removeClass(element, openMobileClass);

      /* istanbul ignore else */
      if (toggleElement) {
        setAttribute(toggleElement, ariaExpanded, 'false');
        if (toggleElement === navbarToggle) {
          toggleNavbarResizeEvent(self);
        }
      }
      if (anchor) {
        setAttribute(anchor, ariaExpanded, 'false');
        dispatchEvent(anchor, hiddenNavbarEvent);
      }
    }
  }
};

function navbarEnterHandler(this: HTMLElement) {
  const menu = closest(this, `${navbarSelector},.${navbarString}`);
  const self = menu && getNavbarInstance(menu);
  const timerOut = Timer.get(this, 'out');

  if (!self || checkNavbarView(self)) return;

  Timer.clear(this, 'out');

  if (!hasClass(this, openNavClass) && !timerOut) {
    const enterCallback = () => openNavbar(this);

    Timer.set(this, enterCallback, 17, 'in');
  }
}

function navbarLeaveHandler(this: HTMLElement) {
  const menu = closest(this, `${navbarSelector},.${navbarString}`);
  const self = menu && getNavbarInstance(menu);

  if (!self || checkNavbarView(self)) return;

  /* istanbul ignore else */
  if (hasClass(this, openNavClass)) {
    Timer.clear(this, 'in');
    const leaveCallback = () => {
      closeNavbars(getElementsByClassName(openPositionClass, this));
      closeNavbar(this, true);
    };

    Timer.set(this, leaveCallback, self.options.delay, 'out');
  }
}

// NAVBAR DEFINITION
// =================
/** Creates a new Navbar for desktop and mobile navigation. */
export default class Navbar {
  static selector = navbarSelector;
  static init = initNavbarCallback;
  static getInstance = getNavbarInstance;
  static version = version;
  public declare menu: HTMLElement;
  public declare navbarToggle: HTMLElement | null;
  public declare items: HTMLCollectionOf<HTMLElement>;
  public declare options: typeof defaultNavbarOptions;
  /**
   * @param target HTMLElement or selector
   * @param config instance options
   */
  constructor(target: string | HTMLElement, config?: Partial<typeof defaultNavbarOptions>) {
    const menu = querySelector(target);

    // invalidate
    if (!menu) throw new TypeError(`${navbarComponent} cannot initialize the specified target.`);
    const [navbarToggle] = getElementsByClassName(navbarToggleClass, menu);

    // reset on re-init
    const existing = getNavbarInstance(menu);
    if (existing) existing.dispose();

    // instance targets
    this.menu = menu;
    this.options = normalizeOptions(menu, defaultNavbarOptions, config || {});
    this.items = getElementsByTagName('LI', menu);

    // this.navbarToggle = null;
    this.navbarToggle = navbarToggle;

    // attach events
    toggleNavbarEvents(this, true);

    // attach instance to element
    Data.set(menu, navbarComponent, this);
  }

  get defaults() {
    return defaultNavbarOptions;
  }
  get name() {
    return navbarComponent;
  }

  // NAVBAR PUBLIC METHODS
  // =====================
  /**
   * Window `resize` event listener.
   */
  listenResize = () => {
    /* istanbul ignore else */
    if (!checkNavbarView(this)) {
      closeNavbars(getElementsByClassName(openMobileClass, getDocument(this.menu)));
      toggleNavbarResizeEvent(this);
    }
  };

  /**
   * Destroy Navbar instance.
   */
  dispose() {
    closeNavbars(this.items);
    toggleNavbarEvents(this);
    toggleNavbarResizeEvent(this);
    Data.remove(this.menu, navbarComponent);
    ObjectKeys(this).forEach(key => {
      delete this[key];
    });
  }
}
