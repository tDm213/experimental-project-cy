import { loginPage } from '../../../../PageObjects/loginPage'
import { managePage } from '../../../../PageObjects/managePage'
import { users_prd } from '../../../../fixtures/users/users_prod.js'
import { users_qa } from '../../../../fixtures/users/users_qa.js'

// You can switch between the enviroments from the comand line
let url, user

if (Cypress.env("enviroment") == "qa") {
    url = Cypress.env("defaultURL_QA")
    user = users_qa.usersPoolOne.user_1_qa
} else {
    url = Cypress.env("defaultURL")
    user = users_prd.usersPoolOne.user_1
}

/* 
    It will be better to read for test reporting tools like allure
*/
describe('domain-test/prod-login-area/accounts/verifyManagePage.login.cy.js', () => {
    before(() => {
        cy.clearCookies()
        cy.login_ui(url, user.username, user.password)
    })

    beforeEach(() => {
        cy.viewport('macbook-15')
    })

    context('This is an example test for the accounts folder', () => {
        it ('Verify Manage account page', () => {
            managePage.verifyManagePageURLs(url)
        })
    })
})