export const footerLogout = {

    verify_footer(url) {
        cy.visit(url)
        cy.contains("© 2022 - Powered by ExecuteAutomation.com").should('be.visible')
    }
}