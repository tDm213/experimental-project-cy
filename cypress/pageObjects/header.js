export const header = {

    verify_length_left_header(url) {
        cy.visit(url)
        cy.get('[class="nav navbar-nav"]').children().should('have.length', 3)
    },
    verify_length_right_header(url) {
        cy.visit(url)
        cy.get('[class="nav navbar-nav navbar-right"]').children().should('have.length', 2)
    },
    verify_home_page(url) {
        cy.visit(url)
        cy.contains('Home').should('have.attr', 'href', '/').click()
        cy.url().should('eq', `${url}/`)
    },
    verify_about_page(url) {
        cy.visit(url)
        cy.contains('About').should('have.attr', 'href', '/Home/About').click()
        cy.title().should('eq', 'About - Execute Automation Employee App')
        cy.url().should('eq', `${url}/Home/About`) 
    },
    verify_employee_page(url) {
        cy.visit(url)
        cy.contains('Employee List').should('have.attr', 'href', '/Employee').click()
        cy.title().should('eq', '- Execute Automation Employee App')
        cy.url().should('eq', `${url}/Employee`)
    },
    verify_register_page(url) {
        cy.visit(url)
        cy.get('#registerLink').click()
        cy.title().should('eq', 'Register - Execute Automation Employee App')
        cy.url().should('eq', `${url}/Account/Register`) 
    },
    verify_login_page_logout(url) {
        cy.visit(url)
        cy.get('#loginLink').click()
        cy.title().should('eq', 'Login - Execute Automation Employee App')
        cy.url().should('eq', `${url}/Account/Login`) 
    }
}