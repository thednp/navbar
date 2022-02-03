export as namespace Navbar;
export default Navbar;

import './navbar';
import Navbar from "navbar.js/src/js/navbar";

declare enum NavbarEvents {
  show = "show.navbar",
  shown = "shown.navbar",
  hide = "hide.navbar",
  hidden = "hidden.navbar",
}

export interface Event {
  /** e.type */
  readonly type: NavbarEvents;
}

declare global {
  interface HTMLElement {
    addEventListener(
      type: Navbar.Event,
      listener: (this: HTMLElement | Element, ev: Navbar.Event) => any,
      options?: boolean | AddEventListenerOptions,
    ): void;
  }
}

export * as SHORTER from "shorter-js";
export * as EventListener from "event-listener.js";