/** Creates a new Navbar for desktop and mobile navigation. */
declare class Navbar {
    static selector: string;
    static init: (element: Element | string) => Navbar;
    static getInstance: (element: Element) => Navbar | null;
    static version: string;
    menu: HTMLElement;
    navbarToggle: HTMLElement | null;
    items: HTMLCollectionOf<HTMLElement>;
    options: NavbarOptions;
    _observer: ResizeObserver;
    /**
     * @param target HTMLElement or selector
     * @param config instance options
     */
    constructor(target: string | Element, config?: Partial<NavbarOptions>);
    get defaults(): NavbarOptions;
    get name(): string;
    /**
     * Window `resize` event listener.
     */
    listenResize: () => void;
    /**
     * Destroy Navbar instance.
     */
    dispose(): void;
}
export default Navbar;

declare type NavbarOptions = {
    breakpoint: number;
    toggleSiblings: boolean;
    delay: number;
};

export { }
