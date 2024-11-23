import { expect, it, describe, beforeEach, vi } from 'vitest';
import { page } from '@vitest/browser/context';

import getMarkup from './fixtures/getMarkup';
import Navbar from '../src/ts/navbar';
import "./fixtures/style.css";

describe('Navbar Class Tests', async () => {
  const wrapper = document.createElement('div');
  document.body.append(wrapper);

  beforeEach(async () => {
    wrapper.innerHTML = '';
  });

  it('Invalid target won\'t work', async () => {
    try {
      Navbar.init('.wombat');
    } catch(e) {
      expect(e).to.be.instanceOf(TypeError);
      expect(e).to.have.property('message', 'Navbar cannot initialize the specified target.');
    }
  });

  it('Init with target element', async () => {
    const container = getMarkup();
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector(Navbar.selector) !== null, 200);
    const element = container.querySelector(Navbar.selector)!;
    if (!element) return;

    Navbar.init(element); // re-init for coverage
    const instance = Navbar.init(element);
    expect(instance.menu).to.equal(element);
    expect(instance.items.length).to.equal(18);
    expect(instance.name).to.eq('Navbar');
    expect(instance.options).to.deep.equal({breakpoint: 768, toggleSiblings: true, delay: 500});
    expect(instance.defaults).to.deep.equal({breakpoint: 768, toggleSiblings: true, delay: 500});
  });

  it('Can navigate on desktop', async () => {
    await page.viewport(800, 600);
    const container = getMarkup();
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector(Navbar.selector) !== null, 200);
    const element = container.querySelector(Navbar.selector)!;
    if (!element) return;

    const instance = new Navbar(element, { delay: 50 });

    instance.items[0].dispatchEvent(new PointerEvent('mouseenter', { bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.items[0].className).to.contain('open-position').and.contain('open');
    }, 350);

    instance.items[1].dispatchEvent(new PointerEvent('mouseenter', { bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.items[1].className).to.contain('open-position').and.contain('open');
    }, 350);

    instance.items[9].dispatchEvent(new PointerEvent('mouseenter', { bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.items[9].className).to.contain('open-position').and.contain('open');
    }, 350);

    await new Promise(res => setTimeout(res, 50));
    instance.items[0].dispatchEvent(new PointerEvent('mouseleave', { bubbles: true }));

    await new Promise(res => setTimeout(res, 150));
    await vi.waitFor(() => {
      expect(instance.items[0].className).to.not.contain('open-position').and.not.contain('open');
    }, 550);
  });

  it('Can navigate on mobile', async () => {
    await page.viewport(576, 600);
    const container = getMarkup();
    Object.assign(container.style, { padding: '240px 0', margin: '240px 0' });
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector(Navbar.selector) !== null, 200);
    const element = container.querySelector(Navbar.selector)!;
    if (!element) return;

    element.ownerDocument.defaultView?.scrollTo({ top: 500, behavior: 'smooth' });
    await new Promise(res => setTimeout(res, 150));

    const instance = new Navbar(element);
    const navbarToggle = element.querySelector<HTMLButtonElement>('.navbar-toggle .menu-icon')!;

    navbarToggle.dispatchEvent(new PointerEvent('click', { bubbles: true }));

    await vi.waitFor(() => {
      expect(instance.menu.className).to.contain('open-mobile');
    }, 50);

    instance.menu.querySelector('.subnav-toggle')?.dispatchEvent(new PointerEvent('click', { bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelector('.subnav')?.closest('li')?.className).to.contain('open-mobile');
    }, 50);

    const demosItem = page.getByText('Demos').element();
    demosItem?.closest('li')?.querySelector<HTMLButtonElement>('.subnav-toggle')?.click();
    await vi.waitFor(() => {
      expect(demosItem?.closest('li')?.className).to.contain('open-mobile');
    }, 50);

    const documentationItem = page.getByText('Documentation').element();
    documentationItem?.closest('li')?.querySelector<HTMLButtonElement>('.subnav-toggle')?.click();
    await vi.waitFor(() => {
      expect(documentationItem?.closest('li')?.className).to.contain('open-mobile');
      expect(demosItem?.closest('li')?.className).to.not.contain('open-mobile');
    }, 50);

    instance.menu.querySelector<HTMLButtonElement>('.navbar-toggle')?.click();
    await vi.waitFor(() => {
      expect(instance.menu.className).to.not.contain('open-mobile');
    }, 50);
  });

  it('Can work with keyboard events', async () => {
    await page.viewport(800, 600);
    const container = getMarkup();
    Object.assign(container.style, { padding: '240px 0', margin: '240px 0' });
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector(Navbar.selector) !== null, 200);
    const element = container.querySelector(Navbar.selector)!;
    const doc = element.ownerDocument;
    if (!element) return;
    
    const instance = new Navbar(element, { delay: 50 });

    // await new Promise(res => setTimeout(res, 50));
    doc.defaultView?.scrollTo({ top: 500, behavior: 'smooth' });
    await new Promise(res => setTimeout(res, 150));

    instance.menu.querySelector<HTMLAnchorElement>('li a')?.focus();
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowRight', bubbles: true }));

    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li a')[17]).to.equal(doc.activeElement);
    }, 150);

    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowRight', bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li a')[17]).to.equal(doc.activeElement);
    }, 150);

    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowLeft', bubbles: true }));
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowLeft', bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li a')[0]).to.equal(doc.activeElement);
    }, 150);

    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space', bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li')[0]?.className).to.contain('open-position').and.contain('open');
    }, 150);

    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space', bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li')[0]?.className).to.not.contain('open').and.not.contain('open-position');
    }, 150);

    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space', bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li')[0]?.className).to.contain('open-position').and.contain('open');
    }, 150);

    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'Escape', bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li')[0]?.className).to.not.contain('open').and.not.contain('open-position');
    }, 150);

    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space', bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li')[0]?.className).to.contain('open-position').and.contain('open');
    }, 150);

    instance.menu.querySelectorAll<HTMLButtonElement>('li a')[1]?.focus();
    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowUp', bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li a')[1]).to.equal(doc.activeElement);
    }, 150);

    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown', bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li a')[9]).to.equal(doc.activeElement);
    }, 150);

    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown', bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li a')[9]).to.equal(doc.activeElement);
    }, 150);

    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown', bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li a')[9]).to.equal(doc.activeElement);
    }, 150);

    doc.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowUp', bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li a')[1]).to.equal(doc.activeElement);
    }, 150);
  });

  it('Can close submenus on resize', async () => {
    await page.viewport(576, 600);
    const container = getMarkup();
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector(Navbar.selector) !== null, 200);
    const element = container.querySelector(Navbar.selector)!;
    if (!element) return;
    
    const instance = new Navbar(element, { delay: 50 });
    instance.menu.querySelector<HTMLButtonElement>('.navbar-toggle')?.click();
    await vi.waitFor(() => {
      expect(instance.menu.className).to.contain('open-mobile');
    }, 150);
    
    await page.viewport(1000, 600);
    await vi.waitFor(() => {
      expect(instance.menu.className).to.not.contain('open-mobile');
    }, 150);
  });

  it('Can dispose', async () => {
    await page.viewport(800, 600);
    const container = getMarkup();
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector(Navbar.selector) !== null, 200);
    const element = container.querySelector(Navbar.selector)!;
    if (!element) return;

    const instance = new Navbar(element, { delay: 50 });
    instance.menu.querySelector('li')?.dispatchEvent(new PointerEvent('mouseenter', { bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelector('li')?.className).to.contain('open');
    }, 150);

    instance.dispose();
    await vi.waitFor(() => {
      expect(instance.menu).to.be.undefined;
    }, 50);
  });

  it('Can do hide custom event', async () => {
    await page.viewport(800, 600);
    const container = getMarkup();
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector(Navbar.selector) !== null, 200);
    const element = container.querySelector(Navbar.selector)!;
    if (!element) return;
    const hideTarget = element.querySelector<HTMLAnchorElement>('li a');
    hideTarget?.addEventListener('hide.navbar', function(e) {
      if (!hideTarget.innerText.includes('wombat')) {
        e.preventDefault();
      }
    })

    const instance = new Navbar(element, { delay: 50 });
    instance.menu.querySelector('li')?.dispatchEvent(new PointerEvent('mouseenter', { bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelector('li')?.className).to.contain('open');
    }, 150);
    instance.menu.querySelector('li')?.dispatchEvent(new PointerEvent('mouseleave', { bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelector('li')?.className).to.contain('open');
    }, 150);
  });

  it('Can do show custom event', async() => {
    await page.viewport(800, 600);
    const container = getMarkup();
    wrapper.append(container);
    await vi.waitFor(() => container.querySelector(Navbar.selector) !== null, 200);
    const element = container.querySelector(Navbar.selector)!;
    if (!element) return;
    const showTarget = element.querySelectorAll<HTMLAnchorElement>('li a')[1];
    showTarget?.addEventListener('show.navbar', function(e) {
      if (!showTarget.innerText.includes('wombat')) {
        e.preventDefault();
      }
    });

    const instance = new Navbar(element, { delay: 50 });

    instance.menu.querySelectorAll('li')[0]?.dispatchEvent(new PointerEvent('mouseenter', { bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li')[0]?.className).to.contain('open');
    }, 150);

    instance.menu.querySelectorAll('li')[1]?.dispatchEvent(new PointerEvent('mouseenter', { bubbles: true }));
    await vi.waitFor(() => {
      expect(instance.menu.querySelectorAll('li')[1]?.className).to.not.contain('open');
    }, 150);
  });
});