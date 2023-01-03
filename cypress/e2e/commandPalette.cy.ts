/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('use the command palette', () => {
  beforeEach(() => {
    cy.loginByGoogleApi()
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    // cy.visit(Cypress.env('todo_url'))
  })
  it('can open the command palette', () => {
    cy.findByTitle('Command Palette').should('exist').click()
  })

  // it('can search for email using the search button', () => {
  //   cy.findByTitle('Command Palette').should('exist').click()
  //   cy.get('[id=search]').click().type('Google')
  //   cy.findByTitle('Search').should('exist').click()
  //   cy.get('[class="search-thread-list-item"]').should('exist')
  // })

  // it('can search for email using the Enter button', () => {
  //   cy.findByTitle('Command Palette').should('exist').click()
  //   cy.get('[id=search]').click().type('Google{enter}')
  //   cy.get('[class="search-thread-list-item"]').should('exist')
  // })

  // it('can open a search result', () => {
  //   cy.findByTitle('Command Palette').should('exist').click()
  //   cy.get('[id=search]').click().type('Google{enter}')
  //   cy.get('[class="search-thread-list-item"]').should('exist').eq(0).click()
  //   cy.findByRole('heading', { name: /Search/i }).should('exist')
  // })

  // it('can open settings via Command menu', () => {
  //   cy.findByTitle('Command Palette').should('exist').click()
  //   cy.get('[id=search]').click().type('Settings')
  //   cy.get('[data-cy="command-palette-list-item"]')
  //     .should('exist')
  //     .eq(1)
  //     .click()
  //   cy.findByRole('heading', { name: /Settings/i }).should('exist')
  // })

  // it('can reset search query via escape button and close modal', () => {
  //   cy.findByTitle('Command Palette').should('exist').click()
  //   cy.get('[id=search]').click().type('Google{enter}')
  //   cy.get('[class="search-thread-list-item"]').should('exist')
  //   cy.get('[id=search]').click().type('{esc}')
  //   cy.get('[class="search-thread-list-item"]').should('not.exist')
  //   cy.get('[id=search]').click().type('{esc}')
  //   cy.get('[id=search]').should('not.exist')
  // })
})
