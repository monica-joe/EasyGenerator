import { Utility } from "./utility";

const url = new Utility().getBaseUrl();

Cypress.Commands.add("openLocalhost", () => {
  cy.visit(`${url}task.html`);
  cy.url().should("include", url)})