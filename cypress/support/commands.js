// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add("login_ui", (url, username, password) => {
  cy.session([username, password], () => {
    cy.visit(`${url}/Account/Login`);
    cy.get("#UserName").type(username);
    cy.get("#Password").type(password);
    cy.get('[value="Log in"]').click();

    // verify login
    cy.get("#logoutForm").should("be.visible");
    cy.url().should("not.eq", `${url}/Account/Login`);
  });
});

// Skip next errors
Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("Unexpected token '<'")) {
    return false;
  }
  if (err.message.includes("jQuery is not defined")) {
    return false;
  }
  if (err.message.includes("uncaught:exception")) {
    return false;
  }
});
