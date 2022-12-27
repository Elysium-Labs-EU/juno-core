/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

// describe('empty spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('log in to the platform as job seeker', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit(Cypress.env('login_url'))
  })

  // it('displays the login method', () => {
  //   cy.findAllByText('Login with Google').should('exist')
  // })

  it('can use login method', () => {
    cy.loginByGoogleApi()
  })

  // it('has a link to the forgot password', () => {
  //   cy.findAllByText('Forgot password').should('exist')
  // })

  // it('has a link to redirect to the sign up', () => {
  //   cy.findAllByText('Sign up now').should('exist')
  // })

  // it('job seeker can log in using the email and password option', () => {
  //   cy.get("[type='email']").click().type('robbert+1@swiftly.one')
  //   cy.get("[type='password']").click().type('Robbert')
  //   cy.get('form')
  //     .findByRole('button', { name: /Log in as job seeker/i })
  //     .should('exist')
  //   .click()
  //   cy.get("[type='password']").should('not.exist')
  // })

  // it('employer can log in using the email and password option', () => {
  //   cy.findByRole('tab', { name: /I'm an employer/i })
  //     .should('exist')
  //     .click()
  //   cy.get("[type='email']").click().type('robbert+e1@swiftly.one')
  //   cy.get("[type='password']").click().type('Robbert')
  //   cy.get('form')
  //     .findByRole('button', { name: /Log in as employer/i })
  //     .should('exist')
  //     .click()
  //   cy.get("[type='password']").should('not.exist')
  // })
})
