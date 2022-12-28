/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('log in to the system', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('login_url'))
  })

  it('displays the login method', () => {
    cy.findAllByText('Login with Google').should('exist')
  })

  it('can use login method', () => {
    cy.loginByGoogleApi()
    cy.findAllByText('Login with Google').should('not.exist')
    cy.wait(10000)
    cy.contains('To Do').should('exist')
  })
})
