export {}
declare global {
  namespace Cypress {
    interface Chainable {
      loginByGoogleApi(): Chainable<void>
    }
  }
}
