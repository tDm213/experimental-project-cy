import { headerLogout } from "../../../pageObjects/logout_area/headerLogout";
import { footerLogout } from "../../../pageObjects/logout_area/footerLogout";

// You can switch between the enviroments from the comand line
let url;
const sizes = ["iphone-6", "ipad-2", [1024, 768]];

if (Cypress.env("enviroment") == "qa") {
  url = Cypress.env("defaultURL_QA");
} else {
  url = Cypress.env("defaultURL");
}

/* 
    It will be better to read for test reporting tools like allure
*/
describe("regression-tests/logout-area/verifyHomePage.cy.js", () => {
  before(() => {
    cy.clearCookies();
  });

  sizes.forEach((size) => {
    beforeEach(() => {
      if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
      } else {
        cy.viewport(size);
      }
    });

    it(`Verify header left on ${size} screen`, () => {
      if (size == "iphone-6") {
        cy.log(`skip check for the iphone-6`);
        return;
      }

      headerLogout.verify_length_left_header(url);

      // Home
      headerLogout.verify_home_page(url);

      // About
      headerLogout.verify_about_page(url);

      // Employee List
      headerLogout.verify_employee_page(url);
    });

    it(`Verify header right on ${size} screen`, () => {
      if (size == "iphone-6") {
        cy.log(`skip check for the iphone-6`);
        return;
      }

      headerLogout.verify_length_right_header(url);

      // Register
      headerLogout.verify_register_page(url);

      // Login
      headerLogout.verify_login_page_logout(url);
    });

    it(`Verify body on ${size} screen`, () => {
      cy.visit(url);
      cy.get('[src="/Image/EA_banner_white_v1.jpg"]').should("be.visible");
      cy.contains("Visit now »").should(
        "have.attr",
        "href",
        "http://executeautomation.com"
      );
    });

    it(`Verify footer on ${size} screen`, () => {
      footerLogout.verify_footer(url);
    });
  });
});
