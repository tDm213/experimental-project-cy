import { users } from '../../../fixtures/users.js'

var global = Cypress.env("GeneralVariables")
var user = users.usersPoolTwo.user_2

  describe('domain-prd/API/login.cy.js', () => {
    before(() => {
      cy.clearCookies()
    })
  
    context('Login example test', () => {
      it('Login', () => {
        cy.request({
          method: 'POST',
          url: global.defaultURL_API + '/authentication/login',
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