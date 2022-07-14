export const changePasswordPage = {
    changePassword(url, password) {
        cy.visit(`${url}/Manage/ChangePassword`)
        cy.get('#OldPassword').type(password)
        cy.get('#NewPassword').type(password)
        cy.get('#ConfirmPassword').type(password)

        cy.get('[value="Change password"]').click()

        cy.get('#logoutForm').should('be.visible')
        cy.contains('Your password has been changed.').should('be.visible')
        cy.url().should('eq', `${url}/Manage?Message=ChangePasswordSuccess`)
    }
}