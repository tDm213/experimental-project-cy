import { managePage } from "../../../../PageObjects/login_area/managePage";
import { usersProd } from "../../../../fixtures/users/usersProd.js";
import { usersQA } from "../../../../fixtures/users/usersQA.js";

let url = 'https://globalsqa.com'
let accounts = [1007, 1008, 1009]
let userName = 'Ron Weasly'

/* 
    It will be better to read for test reporting tools like allure
*/
describe("regression-tests/login-area/payments/XYZ_bank_customer.login.cy.js", () => {
    before(() => {
        cy.clearCookies();
        cy.login_bank(url, userName)
        accounts.forEach((account) => {
            cy.log(`clear account ${account} for test user`)
            cy.visit(`${url}/angularJs-protractor/BankingProject/#/account`);
            cy.get('[id="accountSelect"]').select(account.toString())
            cy.get('[ng-click="transactions()"]').click()
            cy.get('[class="fixedTopBox"]').then($body => {
                if ($body.find('[ng-click="reset()"]').length > 0) {
                    cy.get('[ng-click="reset()"]').click({ force: true })
                }
            });
        });
    });

    beforeEach(() => {
        //cy.login_bank(url, userName)
        cy.viewport(Cypress.env("viewport"));
    });

    //   accounts.forEach((account) => {
    //     context("Verify account", () => {
    //         it("verify cusomers name and default account", () => {
    //         });
    //         it("update account verify selected account", () => {});
    //       });
    //       context("Verify deposits like a customer", () => {
    //         it("display errors for deposit", () => {});
    //         it("create valid deposits like a cusomer and verify transaction", () => {});
    //       });
    //       context("Verify withdrawal like a customer", () => {
    //         it("display errors for deposit", () => {});
    //         it("create valid withdrawal like a cusomer and verify transaction", () => {});
    //       });
    //   });

    // context("Verify headers", () => {
    //     it("go back to the home page a login customer", () => { });
    //     it("logout successfully", () => { });
    // });
});
