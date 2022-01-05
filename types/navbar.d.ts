declare module "navbar.js/src/js/version" {
    export default Version;
    const Version: string;
}
declare module "navbar.js/src/js/navbar" {
    /** Creates a new Navbar for desktop and mobile navigation. */
    export default class Navbar {
        /**
         * @param {string | HTMLElement} target Element or selector
         * @param {Record<string, any>=} config instance options
         */
        constructor(target: string | HTMLElement, config?: Record<string, any> | undefined);
        /** @private @type {HTMLElement?} */
        private menu;
        /** @private @type {Record<string, any>} */
        private options;
        /** @private */
        private items;
        /** @private @type {HTMLElement?} */
        private navbarToggle;
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
