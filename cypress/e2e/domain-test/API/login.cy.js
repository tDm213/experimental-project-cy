import { users_prd } from '../../../fixtures/users/users_prod.js'
import { users_qa } from '../../../fixtures/users/users_qa.js'

let url, user

if (Cypress.env("enviroment") == "qa") {
    url = Cypress.env("defaultURL_API_QA")
    user = users_qa.usersPoolOne.user_1_qa
} else {
    url = Cypress.env("defaultURL")
    user = users_prd.usersPoolOne.user_1
}

describe('domain-test/API/login.cy.js', () => {
  before(() => {
    cy.clearCookies()
  })

  context('Login example test', () => {
    it('Login', () => {
      console.log(user.__RequestVerificationToken)
      cy.request({
        method: 'POST',
        url: url + '/Account/Login',
        // headers: {
        //   'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        //   'Content-Type':'application/x-www-form-urlencoded',
        //   'Accept-Language': 'en'

        // },
        body: {
          '__RequestVerificationToken': user.__RequestVerificationToken,
          "UserName": user.username,
          "Password": user.password,
          "RememberMe": false
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(500)
        console.log(response)
      })
    })
  })
})