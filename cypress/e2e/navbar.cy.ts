/// <reference types="cypress" />
// ***********************************************************

import Navbar from '../../src/ts/navbar';

describe('Navbar Class Tests', () => {

  beforeEach(() => {
    cy.visit('cypress/navbar.html')
  });

  it('Invalid target won\'t work', () => {
    cy.document().then(() => {
      try {
        const instance = Navbar.init('.wombat');
        // expect(instance.menu).to.be.undefined;
      } catch(e) {
        expect(e).to.be.instanceOf(TypeError);
        expect(e).to.have.property('message', 'Navbar cannot initialize the specified target.');

      }
      });
  });

  it('Init with target element', () => {
    cy.get(Navbar.selector).then(($element) => {
        const element = $element[0];
        Navbar.init(element); // re-init for coverage
        const instance = Navbar.init(element);
        expect(instance.menu).to.equal(element);
        expect(instance.items.length).to.equal(18);
        expect(instance.name).to.eq('Navbar');
        expect(instance.options).to.deep.equal({breakpoint: 768, toggleSiblings: true, delay: 500});
        expect(instance.defaults).to.deep.equal({breakpoint: 768, toggleSiblings: true, delay: 500});
      });
  });

  it('Can navigate on desktop', () => {
    cy.get(Navbar.selector).then(($element) => {
        cy.wrap(new Navbar($element[0])).as('desktop');
      })
    cy.get('@desktop').its('menu').find('li').eq(0).trigger('mouseenter')
    cy.get('@desktop').its('menu').find('li').eq(0).should('have.class', 'open-position').and('have.class', 'open')
    cy.get('@desktop').its('menu').find('li').eq(1).trigger('mouseenter')
    cy.get('@desktop').its('menu').find('li').eq(1).should('have.class', 'open-position').and('have.class', 'open')
    cy.get('@desktop').its('menu').find('li').eq(9).trigger('mouseenter')
    cy.get('@desktop').its('menu').find('li').eq(9).should('have.class', 'open-position').and('have.class', 'open')
    cy.get('@desktop').its('menu').find('li').eq(0).trigger('mouseleave')
    cy.get('@desktop').its('menu').find('li').eq(0).should('not.have.class', 'open').and('not.have.class', 'open-position')
    cy.get('@desktop').its('menu').find('li').eq(9).should('not.have.class', 'open').and('not.have.class', 'open-position')
  });

  it('Can navigate on mobile', () => {
    cy.viewport(576, 600)
      .get(Navbar.selector).then(($element) => {
        cy.wrap(new Navbar($element[0])).as('mobile');
      })
    cy.get('@mobile').its('menu').find('.navbar-toggle .menu-icon').click()
    cy.get('@mobile').its('menu').should('have.class', 'open-mobile')
    cy.get('@mobile').its('menu').find('.subnav-toggle').eq(0).click()
    cy.get('@mobile').its('menu').find('.subnav').eq(0).closest('LI').should('have.class', 'open-mobile')
    cy.contains('Demos').closest('LI').find('.subnav-toggle').click()
    cy.contains('Demos').closest('LI').should('have.class', 'open-mobile')
    cy.contains('Documentation').closest('LI').find('.subnav-toggle').click()
    cy.contains('Documentation').closest('LI').should('have.class', 'open-mobile')
    cy.contains('Demos').closest('LI').should('not.have.class', 'open-mobile')
    cy.contains('Documentation').closest('LI').find('.subnav-toggle').click()
    cy.contains('Documentation').closest('LI').should('not.have.class', 'open-mobile')
    cy.get('@mobile').its('menu').find('.navbar-toggle').click()
    cy.get('@mobile').its('menu').should('not.have.class', 'open-mobile')
  });

  it('Can work with keyboard events', () => {
    cy.get(Navbar.selector).then(($element) => {
        cy.wrap(new Navbar($element[0])).as('keyboard');
      })
      cy.get('@keyboard').its('menu').find('li a').eq(0).focus()
      cy.document().trigger('keydown', { code: 'ArrowRight' })
      cy.document().trigger('keyup', { code: 'ArrowRight' })
      cy.get('@keyboard').its('menu').find('li a').eq(17).should('be.focused')
      cy.document().trigger('keydown', { code: 'ArrowRight' })
      cy.document().trigger('keyup', { code: 'ArrowRight' })
      cy.get('@keyboard').its('menu').find('li a').eq(17).should('be.focused')
      cy.document().trigger('keydown', { code: 'ArrowLeft' })
      cy.document().trigger('keyup', { code: 'ArrowLeft' })
      cy.document().trigger('keydown', { code: 'ArrowLeft' })
      cy.document().trigger('keyup', { code: 'ArrowLeft' })
      cy.get('@keyboard').its('menu').find('li a').eq(0).should('be.focused')
      cy.document().trigger('keydown', { code: 'Space' })
      cy.document().trigger('keyup', { code: 'Space' })
      cy.get('@keyboard').its('menu').find('li').eq(0).should('have.class', 'open-position').and('have.class', 'open')
      cy.document().trigger('keydown', { code: 'Space' })
      cy.document().trigger('keyup', { code: 'Space' })
      cy.get('@keyboard').its('menu').find('li').eq(0).should('not.have.class', 'open').and('not.have.class', 'open-position')
      cy.document().trigger('keydown', { code: 'Space' })
      cy.document().trigger('keyup', { code: 'Space' })
      cy.get('@keyboard').its('menu').find('li').eq(0).should('have.class', 'open-position').and('have.class', 'open')
      cy.document().trigger('keydown', { code: 'Escape' })
      cy.document().trigger('keyup', { code: 'Escape' })
      cy.get('@keyboard').its('menu').find('li').eq(0).should('not.have.class', 'open').and('not.have.class', 'open-position')
      cy.document().trigger('keydown', { code: 'Space' })
      cy.document().trigger('keyup', { code: 'Space' })
      cy.get('@keyboard').its('menu').find('li').eq(0).should('have.class', 'open-position').and('have.class', 'open')
      cy.get('@keyboard').its('menu').find('li a').eq(1).focus()
      cy.document().trigger('keydown', { code: 'ArrowUp' })
      cy.document().trigger('keyup', { code: 'ArrowUp' })
      cy.get('@keyboard').its('menu').find('li a').eq(1).should('be.focused')
      cy.document().trigger('keydown', { code: 'ArrowDown' })
      cy.document().trigger('keyup', { code: 'ArrowDown' })
      cy.get('@keyboard').its('menu').find('li a').eq(9).should('be.focused')
      cy.document().trigger('keydown', { code: 'ArrowDown' })
      cy.document().trigger('keyup', { code: 'ArrowDown' })
      cy.get('@keyboard').its('menu').find('li a').eq(9).should('be.focused')
      cy.document().trigger('keydown', { code: 'ArrowUp' })
      cy.document().trigger('keyup', { code: 'ArrowUp' })
      cy.get('@keyboard').its('menu').find('li a').eq(1).should('be.focused')
  });

  it('Can close submenus on resize', () => {
    cy.viewport(576, 600)
      .get(Navbar.selector).then(($element) => {
        cy.wrap(new Navbar($element[0])).as('resize');
      })
    cy.get('@resize').its('menu').find('.navbar-toggle .menu-icon').click()
    cy.get('@resize').its('menu').should('have.class', 'open-mobile')
    cy.viewport(1000, 660)
    cy.window().trigger('resize')
    cy.wait(200)
    cy.get('@resize').its('menu').should('not.have.class', 'open-mobile')
  });

  it('Can dispose', () => {
    cy.get(Navbar.selector).then(($element) => {
        cy.wrap(new Navbar($element[0])).as('disposable');
      })
    cy.get('@disposable').its('menu').find('li').eq(0).trigger('mouseenter')
    cy.get('@disposable').its('menu').find('li').eq(0).should('have.class', 'open-position').and('have.class', 'open')
    cy.get('@disposable').invoke('dispose')
    cy.get('@disposable').its('menu').should('be.undefined');
  });

  it('Can do hide custom event', function() {
    cy.get(Navbar.selector).then(($element) => {
        const element = $element[0];
        const hideTarget = element.querySelector('li a');
        (hideTarget as HTMLElement).addEventListener('hide.navbar', function(e) {
          if (!(hideTarget as HTMLElement).innerText.includes('wombat')) {
            e.preventDefault();
          }
        })
        cy.wrap(new Navbar(element)).as('hide_event');
      })
    cy.get('@hide_event').its('menu').find('li').eq(0).trigger('mouseenter')
    cy.get('@hide_event').its('menu').find('li').eq(0).should('have.class', 'open-position').and('have.class', 'open')
    cy.get('@hide_event').its('menu').find('li').eq(0).trigger('mouseleave')
    cy.get('@hide_event').its('menu').find('li').eq(0).should('have.class', 'open-position').and('have.class', 'open')
    cy.wait(200);
  });

  it('Can do show custom event', function() {
    cy.get(Navbar.selector).then(($element) => {
        const element = $element[0];
        const showTarget = element.querySelectorAll('li a')[1];
        showTarget.addEventListener('show.navbar', function(e) {
          if (!(showTarget as HTMLElement).innerText.includes('wombat')) {
            e.preventDefault();
          }
        })
        cy.wrap(new Navbar(element)).as('show_event');
      })
    cy.get('@show_event').its('menu').find('li').eq(0).trigger('mouseenter')
    cy.get('@show_event').its('menu').find('li').eq(0).should('have.class', 'open-position').and('have.class', 'open')
    cy.get('@show_event').its('menu').find('li').eq(1).trigger('mouseenter')
    cy.get('@show_event').its('menu').find('li').eq(1).should('not.have.class', 'open-position').and('not.have.class', 'open')
    cy.wait(200);
  });
});