import { header } from '../../../PageObjects/header'
import { footer } from '../../../PageObjects/footer'

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

    it('Verify header left', () => {
        header.verify_length_left_header(url)

        // Home
        header.verify_home_page(url)

        // About
        header.verify_about_page(url)

        // Employee List
        header.verify_employee_page(url)
    })
    
    it('Verify header right', () => {
        header.verify_length_right_header(url)

        // Register
        header.verify_register_page(url)

        // Login
        header.verify_login_page_logout(url)
    })

    it('Verify body', () => {
        cy.visit(url)
        cy.get('[src="/Image/EA_banner_white_v1.jpg"]').should('be.visible')
        cy.contains('Visit now »').should('have.attr', 'href', 'http://executeautomation.com')
    })

    it('Verify footer', () => {
        footer.verify_footer(url)
    })
})