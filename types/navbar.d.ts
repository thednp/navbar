export default Navbar;
/**
 * Creates a new Navbar for desktop and mobile navigation.
 * @class
 */
declare class Navbar {
    /**
     * Navbar constructor
     * @constructor
     * @param {string | Element} target Element or selector
     * @param {object | undefined} config instance options
     */
    constructor(target: string | Element, config: object | undefined);
    /** @private */
    private menu;
    /** @private */
    private options;
    /** @private */
    private items;
    /** @private */
    private timer;
    /**
     * Destroy Navbar instance.
     * @public */
    public dispose(): void;
}
declare namespace Navbar {
    namespace init {
        export { navbarComponent as component };
        export { navbarSelector as selector };
        export { Navbar as constructor };
        export { Version };
    }
}
declare const navbarComponent: "Navbar";
declare const navbarSelector: string;
import Version from "./version.js";
