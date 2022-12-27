/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import handleUserTokens from '../../src/utils/handleUserTokens'
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('loginByGoogleApi', () => {
  console.log(Cypress.env('googleRefreshToken'))
  // cy.log(Cypress.env('googleRefreshToken'))
  cy.log('Logging in to Google')
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'refresh_token',
      client_id: Cypress.env('googleClientId'),
      client_secret: Cypress.env('googleClientSecret'),
      refresh_token: Cypress.env('googleRefreshToken'),
    },
  }).then(({ body }) => {
    handleUserTokens({ data: { credentials: body } }).setCredentials()
    const { access_token } = body
    const success = 'success'

    // Use this function to visit the callback page. The state and code are only used to validate the action.

    cy.visit(
      `${Cypress.env(
        'frontend_app_url'
      )}/oauth2callback_test?state=${success}&code=${access_token}`
    )
  })
})

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
