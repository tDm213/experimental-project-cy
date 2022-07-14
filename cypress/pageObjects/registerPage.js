var Tm = Cypress.config('defaultCommandTimeout')
var randomname = (length) => {
    var result = '';
    var char = '';
    var char_list = 'abcdefghijklmnopqrstuvwxyz';

    for (var i = 0; i < length; i++) {
        char = char_list.charAt(Math.floor(Math.random() * char_list.length))

        // remove repeating letters
        while (result.slice(-1) == char) {
            char = char_list.charAt(Math.floor(Math.random() * char_list.length))
        }
        result += char;
    }
    return result;
}


export const registerPage = {
    registerNewUser(url) {
        cy.visit(`${url}/Account/Register`)
        cy.get('#UserName').type(`${randomname(6)}`)
        cy.get('#Password').type("Abc12345%")
        cy.get('#ConfirmPassword').type("Abc12345%")
        cy.get('#Email').type(`${randomname(6)}@example.com`)
        cy.get('[value="Register"]').click()

        // if you need a custom delay
        cy.wait(Tm / 4)

        cy.get('#logoutForm').should('be.visible')
        cy.url().should('not.eq', `${url}/Account/Register`)
    },
    registerNewUser_invalid_userName(url) {
        cy.visit(`${url}/Account/Register`)
        cy.get('#UserName').type(`${randomname(5)}`)
        cy.get('#Password').type("Abc12345%")
        cy.get('#ConfirmPassword').type("Abc12345%")
        cy.get('#Email').type(`${randomname(6)}@example.com`)
        cy.get('[value="Register"]').click()

        cy.contains('The UserName must be at least 6 charecters long.').should('be.visible')
        cy.url().should('eq', `${url}/Account/Register`)
    },
    registerNewUser_invalid_password(url) {
        cy.visit(`${url}/Account/Register`)
        cy.get('#UserName').type(`${randomname(5)}`)
        cy.get('#Password').type("Abc12345")
        cy.get('#ConfirmPassword').type("Abc12345")
        cy.get('#Email').type(`${randomname(6)}@example.com`)
        cy.get('[value="Register"]').click()

        cy.contains('The UserName must be at least 6 charecters long.').should('be.visible')
        cy.url().should('eq', `${url}/Account/Register`)
    }
}