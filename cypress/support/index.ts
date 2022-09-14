/* eslint-disable @typescript-eslint/no-namespace */

// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />

export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-testid attribute.
       * @example cy.dataTestId('submit-button')
       */
      dataTestId(value: string): Chainable<Element>;
    }
  }
}

// @ts-ignore
Cypress.Commands.add("dataTestId", (value) => {
  return cy.get(`[data-testid=${value}]`);
});
