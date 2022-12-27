/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('use the email list and its options', () => {
  beforeEach(() => {
    cy.loginByGoogleApi()
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit(Cypress.env('todo_url'))
  })
  it('can toggle Sort Inbox button', () => {
    cy.get('[data-cy="inbox-sort-button"]').should('exist')
    cy.get('[data-cy="more-menu"]').should('exist').click()
    cy.get('[data-cy="Settings"]').should('exist').click()
    cy.findByRole('heading', { name: /Settings/i }).should('exist')
    cy.get('[data-cy="flexible-flow-switch"]').should('exist').click()
    cy.get('[data-cy="inbox-sort-button"]').should('not.exist')
    cy.get('[data-cy="flexible-flow-switch"]').should('exist').click()
    cy.get('[data-cy="inbox-sort-button"]').should('exist')
  })

  it('can start sort inbox', () => {
    cy.get('[data-cy="inbox-sort-button"]').should('exist').click()
    cy.findByRole('heading', { name: /Sort/i }).should('exist')
  })

  it('can start focus todo', () => {
    cy.get('[data-cy="todo-focus-button"]').should('exist').click()
    cy.findByRole('heading', { name: /Focus/i }).should('exist')
  })

  it('can open reply via overview', () => {
    cy.get('[data-cy="reply-inline-button"]').should('exist').click()
    cy.findByRole('heading', { name: /To Do/i }).should('exist')
  })
})
