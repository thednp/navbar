declare class Navbar {
    constructor(target: any, config: any);
    menu: any;
    options: any;
    items: any;
    timer: any;
    dispose(): void;
}
declare namespace Navbar {
    namespace init {
        export { navbarComponent as component };
        export { navbarSelector as selector };
        export { Navbar as constructor };
        export { Version };
    }
}
export default Navbar;
declare const navbarComponent: "Navbar";
declare const navbarSelector: string;
import Version from "./version.js";
