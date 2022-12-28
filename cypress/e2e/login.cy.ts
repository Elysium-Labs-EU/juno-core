/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

// describe('empty spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('log in to the system', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit(Cypress.env('login_url'))
  })

  it('displays the login method', () => {
    cy.findAllByText('Login with Google').should('exist')
  })

  it('can use login method', () => {
    cy.loginByGoogleApi()
    cy.findAllByText('Login with Google').should('not.exist')
  })

  // it('has a link to the forgot password', () => {
  //   cy.findAllByText('Forgot password').should('exist')
  // })

  // it('has a link to redirect to the sign up', () => {
  //   cy.findAllByText('Sign up now').should('exist')
  // })
})
