import { loginPage } from '../../../PageObjects/loginPage'
import { users_prd } from '../../../fixtures/users/users_prod.js'
import { users_qa } from '../../../fixtures/users/users_qa.js'

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
describe('domain-prd/accounts/example-test.cy.js', () => {
    before(() => {
        cy.clearCookies()
    })

    beforeEach(() => {
        cy.viewport("macbook-15")
        // Needed for the navigation to the any other page as a logged in user
        // now there is a more advanced way of doing this https://docs.cypress.io/api/commands/session
        Cypress.Cookies.preserveOnce("authentication_token")
    })

    context('This is an example test for the accounts folder', () => {
        it ('Login', () => {
           loginPage.login(url, user.username, user.password) 
        })
        // verify account is exist
        // it ('Verify account ID', () => {
        //     accountsPage.getaccountID()
        // })
    })
})