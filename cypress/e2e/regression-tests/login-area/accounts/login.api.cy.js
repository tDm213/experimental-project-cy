import { usersProd } from '../../../../fixtures/users/usersProd.js'
import { usersQA } from '../../../../fixtures/users/usersQA.js'

let url, user

if (Cypress.env("enviroment") == "qa") {
  url = Cypress.env("defaultURL_API_QA")
  user = usersQA.usersPoolOne.user_1_qa
} else {
  url = Cypress.env("defaultURL")
  user = usersProd.usersPoolOne.user_1
}

describe('regression-tests/API/loginAPI.login.cy.js', () => {
  before(() => {
    cy.clearCookies()
  })

  context('Login example test', { tags: ['@smoke', '@monitoring'] }, () => {
    it('Login', () => {
      cy.request({
        method: 'POST',
        url: url + '/Account/Login',
        headers: {
          'User-Agent': 'Chrome/103.0.0.0 Safari/537.36',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept-Language': 'en'

        },
        body: {
          "__RequestVerificationToken":"jJ27CGSB6SHC24F0oV5nGIcKmDPqG2WfwOCDZxTUIhJ8Tk9TiSYlzhrzuhP5Ct2rHTiOY46WawRVGy6qanY18HsdbKEeK0TqWjgOY9b6RZE1",
          "UserName": user.username,
          "Password": user.password,
          "RememberMe": "false"
        },
        failOnStatusCode: false
      }).as('log_in')
      
      
      
      cy.get('@log_in').then((response) => {
        expect(response.status).to.eq(500)
        expect(response.body).to.contain('The anti-forgery token could not be decrypted')
      })
    })
  })
})