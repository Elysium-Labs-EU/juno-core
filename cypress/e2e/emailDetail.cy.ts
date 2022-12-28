/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('view the email detail and use its options', () => {
  beforeEach(() => {
    cy.loginByGoogleApi()
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit(Cypress.env('todo_url'))
  })
  it('can open detail and start a reply', () => {
    cy.get('[data-cy="todo-focus-button"]').should('exist').click()
    cy.findByRole('heading', { name: /Focus/i }).should('exist')
    cy.get('[data-cy="reply-button"]').should('exist').click()
    cy.get('[data-cy="reply-composer"]').should('exist')
  })

  it('can open detail and start a forward', () => {
    cy.get('[data-cy="todo-focus-button"]').should('exist').click()
    cy.findByRole('heading', { name: /Focus/i }).should('exist')
    cy.get('[data-cy="forward-button"]').should('exist').click()
    cy.get('[data-cy="forward-composer"]').should('exist')
  })
})
