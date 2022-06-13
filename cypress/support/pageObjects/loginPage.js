var Tm = Cypress.config('defaultCommandTimeout')

export const loginPage = {
    login(url, username, password) {
        cy.visit(`${url}/login`)
        cy.get('#exampeUsernameField').type(username)
        cy.get('#exampePasswordField').type(password)
        cy.get('#exampleLoginButton').click()

        // if you need a custom delay
        cy.wait(Tm/4)

        cy.url().should('not.eq', `${url}/login`)
    }
}