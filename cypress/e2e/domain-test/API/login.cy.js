import { users_prd } from '../../../fixtures/users/users_prod.js'
import { users_qa } from '../../../fixtures/users/users_qa.js'

let url, user

if (Cypress.env("enviroment") == "qa") {
    url = Cypress.env("defaultURL_API_QA")
    user = users_qa.usersPoolOne.user_1_qa
} else {
    url = Cypress.env("defaultURL_API")
    user = users_prd.usersPoolOne.user_1
}

describe('domain-test/API/login.cy.js', () => {
  before(() => {
    cy.clearCookies()
  })

  context('Login example test', () => {
    it('Login', () => {
      cy.request({
        method: 'POST',
        url: url + '/authentication/login',
        headers: {
          'User-Agent':'Example/web',
          'Content-Type':'application/json',
          'Accept-Language': 'en-GB'
        },
        body: {
          "exampeUsername": user.username,
          "exampePassword": user.password
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.requestHeaders.cookie).to.be.a('string')
      })
    })
  })
})