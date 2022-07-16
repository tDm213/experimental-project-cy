export const managePage = {
    verifyManagePageURLs(url) {
        cy.visit(`${url}/Manage`)

        cy.contains('Change your account settings').should('be.visible')
        cy.get('[href="/Manage/ChangePassword"]').should('be.visible')
        cy.get('[href="/Manage/ManageLogins"]').should('be.visible')
        cy.url().should('eq', `${url}/Manage`)    
    }

}