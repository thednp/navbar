declare module "navbar.js/src/js/version" {
    export default Version;
    const Version: string;
}
declare module "navbar.js/src/js/navbar" {
    export default Navbar;
    /**
     * Creates a new Navbar for desktop and mobile navigation.
     * @class
     */
    class Navbar {
        /**
         * Navbar constructor
         * @constructor
         * @param {string | Element} target Element or selector
         * @param {Record<string, any>=} config instance options
         */
        constructor(target: string | Element, config?: Record<string, any> | undefined);
        /** @private */
        private menu;
        /** @private */
        private options;
        /** @private */
        private items;
        /** @private @type {Element?} */
        private navbarToggle;
        /** @private @type {number?} */
        private timer;
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
