declare module "navbar.js/src/js/version" {
    export default Version;
    const Version: string;
}
declare module "navbar.js/src/js/navbar" {
    /** Creates a new Navbar for desktop and mobile navigation. */
    export default class Navbar {
        /**
         * @param {string | HTMLElement | Element} target Element or selector
         * @param {Record<string, any>=} config instance options
         */
        constructor(target: string | HTMLElement | Element, config?: Record<string, any> | undefined);
        /** @type {(HTMLElement | Element)} */
        menu: (HTMLElement | Element);
        /** @type {Record<string, any>} */
        options: Record<string, any>;
        /** @type {HTMLCollectionOf<Element | HTMLElement>} */
        items: HTMLCollectionOf<Element | HTMLElement>;
        /** @type {(HTMLElement | Element)?} */
        navbarToggle: (HTMLElement | Element) | null;
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
