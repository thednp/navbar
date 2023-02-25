declare const defaultNavbarOptions: {
	breakpoint: number;
	toggleSiblings: boolean;
	delay: number;
};
declare class Navbar {
	static selector: string;
	static init: (element: string | HTMLElement) => Navbar;
	static getInstance: (element: HTMLElement) => Navbar | null;
	static version: string;
	menu: HTMLElement;
	navbarToggle: HTMLElement | null;
	items: HTMLCollectionOf<HTMLElement>;
	options: typeof defaultNavbarOptions;
	/**
	 * @param target HTMLElement or selector
	 * @param config instance options
	 */
	constructor(target: string | HTMLElement, config?: Partial<typeof defaultNavbarOptions>);
	get defaults(): {
		breakpoint: number;
		toggleSiblings: boolean;
		delay: number;
	};
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

export {
	Navbar as default,
};

export as namespace Navbar;

export {};
