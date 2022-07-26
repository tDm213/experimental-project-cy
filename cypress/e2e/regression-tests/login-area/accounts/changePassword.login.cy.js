import { changePasswordPage } from "../../../../PageObjects/login_area/changePasswordPage";
import { usersProd } from "../../../../fixtures/users/usersProd.js";
import { usersQA } from "../../../../fixtures/users/usersQA.js";

// You can switch between the enviroments from the comand line
let url, user;

if (Cypress.env("enviroment") == "qa") {
  url = Cypress.env("defaultURL_QA");
  user = usersQA.usersPoolOne.user_1_qa;
} else {
  url = Cypress.env("defaultURL");
  user = usersProd.usersPoolOne.user_1;
}

/* 
    It will be better to read for test reporting tools like allure
*/
describe("regression-tests/login-area/accounts/changePassword.login.cy.js", () => {
  before(() => {
    cy.clearCookies();
    cy.login_ui(url, user.username, user.password);
  });

  beforeEach(() => {
    cy.viewport(Cypress.env("viewport"));
  });

  it("Change Password", () => {
    changePasswordPage.changePassword(url, user.password);
  });
});
