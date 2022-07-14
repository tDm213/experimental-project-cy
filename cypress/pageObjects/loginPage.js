var Tm = Cypress.config('defaultCommandTimeout')

export const loginPage = {
    login(url, username, password) {
        cy.visit(`${url}/Account/Login`)
        cy.get('#UserName').type(username)
        cy.get('#Password').type(password)
        cy.get('[value="Log in"]').click()

        // if you need a custom delay
        cy.wait(Tm/4)

        cy.get('#logoutForm').should('be.visible')
        cy.url().should('not.eq', `${url}/Account/Login`)
    }
}