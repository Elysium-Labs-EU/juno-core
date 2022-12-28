/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

// describe('empty spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('log in to the system', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('login_url'))
  })

  it('displays the login method', () => {
    cy.findAllByText('Login with Google').should('exist')
  })

  it('can use login method', () => {
    cy.loginByGoogleApi()
    cy.wait(8000)
    cy.findAllByText('Login with Google').should('not.exist')
    cy.contains('To Do').should('exist')
  })

  // it('has a link to the forgot password', () => {
  //   cy.findAllByText('Forgot password').should('exist')
  // })

  // it('has a link to redirect to the sign up', () => {
  //   cy.findAllByText('Sign up now').should('exist')
  // })
})
