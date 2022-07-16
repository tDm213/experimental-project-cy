import { registerPage } from '../../../../PageObjects/login_area/registerPage'

// You can switch between the enviroments from the comand line
let url

if (Cypress.env("enviroment") == "qa") {
    url = Cypress.env("defaultURL_QA")
} else {
    url = Cypress.env("defaultURL")
}

/* 
    It will be better to read for test reporting tools like allure
*/
describe('regression-tests/login-area/accounts/createNewAccount.reg.cy.js', () => {
    before(() => {
        cy.clearCookies()
    })

    beforeEach(() => {
        cy.viewport(Cypress.env("viewport"))
    })

    context('This is an example test for the registration page', () => {
        it('Try to register with invalid username', () => {
            registerPage.registerNewUser_invalid_userName(url)
        })
        it('Try to register with invalid password', () => {
            registerPage.registerNewUser_invalid_password(url)
        })
        it('Verify Manage account page', () => {
            registerPage.registerNewUser(url)
        })
    })
})