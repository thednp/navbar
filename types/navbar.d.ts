declare module "navbar.js/src/js/version" {
    export default Version;
    const Version: string;
}
declare module "navbar.js/src/js/navbar" {
    /** Creates a new Navbar for desktop and mobile navigation. */
    export default class Navbar {
        /**
         * @param {string | HTMLElement} target HTMLElement or selector
         * @param {Record<string, any>=} config instance options
         */
        constructor(target: string | HTMLElement, config?: Record<string, any> | undefined);
        /** @type {(HTMLElement)} */
        menu: (HTMLElement);
        /** @type {Record<string, any>} */
        options: Record<string, any>;
        /** @type {HTMLCollectionOf<HTMLElement>} */
        items: HTMLCollectionOf<HTMLElement>;
        /** @type {HTMLElement?} */
        navbarToggle: HTMLElement | null;
        /**
         * Window `resize` event listener.
         */
        listenResize(): void;
        /** @static */
        get defaults(): {
            breakpoint: number;
            toggleSiblings: boolean;
            delay: number;
        };
        /** @static */
        get version(): string;
        /** @static */
        get name(): string;
        /**
         * Destroy Navbar instance.
         * @public */
        public dispose(): void;
    }
}
declare module "navbar.js/types/source" {
    export { default as Navbar } from "navbar.js/src/js/navbar";
}
