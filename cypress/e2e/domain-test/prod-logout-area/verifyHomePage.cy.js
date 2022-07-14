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
describe('domain-test/prod-logout-area/verifyHomePage.cy.js', () => {
    before(() => {
        cy.clearCookies()
    })

    beforeEach(() => {
        cy.viewport('macbook-15')
    })


    it('Verify header', () => {
        
    })

    it('Verify body', () => {
        
    })

    it('Verify footer', () => {
        
    })
})