/// <reference types="cypress" />
// ***********************************************************

import Navbar from '../../src/js/navbar';

describe('Navbar Class Tests', () => {

  beforeEach(() => {
    cy.intercept('GET', 'cypress/navbar.html').as('navbar-page')
      .visit('cypress/navbar.html')
  });

  it('Invalid target won\'t work', () => {
    cy.wait('@navbar-page')
      .document().then(() => {
        const instance = Navbar.init('.wombat');
        expect(instance.menu).to.be.null;
      });
  });

  it('Init with target element', () => {
    cy.wait('@navbar-page')
      .get(Navbar.selector).then(($element) => {
        const element = $element[0];
        Navbar.init(element); // re-init for coverage
        const instance = Navbar.init(element);
        expect(instance.menu).to.equal(element);
        expect(instance.items.length).to.equal(18);
        expect(instance.name).to.eq('Navbar');
        expect(instance.options).to.deep.equal({breakpoint: 768, toggleSiblings: true, delay: 500});
        expect(instance.defaults).to.deep.equal({breakpoint: 768, toggleSiblings: true, delay: 500});
        expect(instance.version).to.be.string;
      });
  });

  it('Can navigate on desktop', () => {
    cy.wait('@navbar-page')
      .get(Navbar.selector).then(($element) => {
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
    cy.wait('@navbar-page')
      .viewport(576, 600)
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
    cy.wait('@navbar-page')
      .get(Navbar.selector).then(($element) => {
        cy.wrap(new Navbar($element[0])).as('keyboard');
      })
    cy.get('@keyboard').its('menu').find('li a').eq(0).focus()
    cy.get('@keyboard').its('menu').trigger('keydown', { code: 'ArrowRight' })
    cy.get('@keyboard').its('menu').find('li a').eq(17).should('be.focused')
    cy.get('@keyboard').its('menu').trigger('keydown', { code: 'ArrowRight' })
    cy.get('@keyboard').its('menu').find('li a').eq(17).should('be.focused')
    cy.get('@keyboard').its('menu').trigger('keydown', { code: 'ArrowLeft' })
    cy.get('@keyboard').its('menu').trigger('keydown', { code: 'ArrowLeft' })
    cy.get('@keyboard').its('menu').find('li a').eq(0).should('be.focused')
    cy.get('@keyboard').its('menu').trigger('keydown', { code: 'Space' })
    cy.get('@keyboard').its('menu').find('li').eq(0).should('have.class', 'open-position').and('have.class', 'open')
    cy.get('@keyboard').its('menu').trigger('keydown', { code: 'Space' })
    cy.get('@keyboard').its('menu').find('li').eq(0).should('not.have.class', 'open').and('not.have.class', 'open-position')
    cy.get('@keyboard').its('menu').trigger('keydown', { code: 'Space' })
    cy.get('@keyboard').its('menu').find('li').eq(0).should('have.class', 'open-position').and('have.class', 'open')
    cy.get('@keyboard').its('menu').trigger('keydown', { code: 'Escape' })
    cy.get('@keyboard').its('menu').find('li').eq(0).should('not.have.class', 'open').and('not.have.class', 'open-position')
    cy.get('@keyboard').its('menu').trigger('keydown', { code: 'Space' })
    cy.get('@keyboard').its('menu').find('li').eq(0).should('have.class', 'open-position').and('have.class', 'open')
    cy.get('@keyboard').its('menu').find('li a').eq(1).focus()
    cy.get('@keyboard').its('menu').trigger('keydown', { code: 'ArrowUp' })
    cy.get('@keyboard').its('menu').find('li a').eq(1).should('be.focused')
    cy.get('@keyboard').its('menu').trigger('keydown', { code: 'ArrowDown' })
    cy.get('@keyboard').its('menu').find('li a').eq(9).should('be.focused')
    cy.get('@keyboard').its('menu').trigger('keydown', { code: 'ArrowDown' })
    cy.get('@keyboard').its('menu').find('li a').eq(9).should('be.focused')
    cy.get('@keyboard').its('menu').trigger('keydown', { code: 'ArrowUp' })
    cy.get('@keyboard').its('menu').find('li a').eq(1).should('be.focused')
  });

  it('Can close submenus on resize', () => {
    cy.wait('@navbar-page')
      .viewport(576, 600)
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
    cy.wait('@navbar-page')
      .get(Navbar.selector).then(($element) => {
        cy.wrap(new Navbar($element[0])).as('disposable');
      })
    cy.get('@disposable').its('menu').find('li').eq(0).trigger('mouseenter')
    cy.get('@disposable').its('menu').find('li').eq(0).should('have.class', 'open-position').and('have.class', 'open')
    cy.get('@disposable').invoke('dispose')
    cy.get('@disposable').its('menu').should('be.null');
  });

  it('Can do hide custom event', function() {
    cy.wait('@navbar-page')
      .get(Navbar.selector).then(($element) => {
        const element = $element[0];
        const hideTarget = element.querySelector('li a');
        hideTarget.addEventListener('hide.navbar', function(e) {
          if (!hideTarget.innerText.includes('wombat')) {
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
    cy.wait('@navbar-page')
      .get(Navbar.selector).then(($element) => {
        const element = $element[0];
        const showTarget = element.querySelectorAll('li a')[1];
        showTarget.addEventListener('show.navbar', function(e) {
          if (!showTarget.innerText.includes('wombat')) {
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