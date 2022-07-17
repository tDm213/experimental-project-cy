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

  context('Login example test', () => {
    it('Login', { tags: ['@smoke', '@monitoring'] }, () => {
      it('Login', () => {
        cy.request({
          method: 'POST',
          url: url + '/Account/Login',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Language': 'en'

          },
          body: {
            "UserName": user.username,
            "Password": user.password,
            "RememberMe": false
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(200)
        })
      })
    })
  })
})