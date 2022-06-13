import { loginPage } from '../../../support/PageObjects/loginPage'
import { users } from '../../../fixtures/users.js'

var global = Cypress.env("GeneralVariables")
var user = users.usersPoolOne.user_1
/* 
    It will be better to read for test reporting tools like allure
*/
describe('domain-prd/accounts/example-test.cy.js', () => {
    before(() => {
        cy.clearCookies()
    })

    beforeEach(() => {
        cy.viewport("macbook-15")
        // needed for the navigation to the any other page as a logged in user
        // now there is a more advanced way of doing this https://docs.cypress.io/api/commands/session
        Cypress.Cookies.preserveOnce("authentication_token")
    })

    context('This is an example test for the accounts folder', () => {
        it ('Login', () => {
           loginPage.login(global.defaultURL, user.username, user.password) 
        })
        // verify account is exist
        // it ('Verify account ID', () => {
        //     accountsPage.getaccountID()
        // })
    })
})