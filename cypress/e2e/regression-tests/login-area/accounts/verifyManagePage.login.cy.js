import { managePage } from '../../../../PageObjects/login_area/managePage'
import { usersProd } from '../../../../fixtures/users/usersProd.js'
import { usersQA } from '../../../../fixtures/users/usersQA.js'

// You can switch between the enviroments from the comand line
let url, user

if (Cypress.env("enviroment") == "qa") {
    url = Cypress.env("defaultURL_QA")
    user = usersQA.usersPoolOne.user_1_qa
} else {
    url = Cypress.env("defaultURL")
    user = usersProd.usersPoolOne.user_1
}

/* 
    It will be better to read for test reporting tools like allure
*/
describe('regression-tests/login-area/accounts/verifyManagePage.login.cy.js', () => {
    before(() => {
        cy.clearCookies()
        cy.login_ui(url, user.username, user.password)
    })

    beforeEach(() => {
        cy.viewport(Cypress.env("viewport"))
    })

    context('This is an example test for the accounts folder', () => {
        it('Verify Manage account page', () => {
            managePage.verifyManagePageURLs(url)
        })
    })
})