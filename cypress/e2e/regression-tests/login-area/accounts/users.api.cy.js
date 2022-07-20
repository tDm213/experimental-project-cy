let url

if (Cypress.env("enviroment") == "qa") {
  url = Cypress.env("defaultURL_API_QA")
} else {
  url = Cypress.env("defaultURL_API_QA")
}

describe('regression-tests/login-area/accounts/users.api.cy.js', () => {
  before(() => {
    cy.clearCookies()
  })

  context(`Verify API ${url}/users`, { tags: ['@smoke', '@monitoring'] }, () => {
    context(`Basic positive tests (happy paths)`, () => {
      // All requests should return 2XX HTTP status code
      // Returned status code is according to spec: 
      // – 200 OK for GET requests
      // – 201 for POST or PUT requests creating a new resource 
      // – 200, 202, or 204 for a DELETE operation and so on
      it('Validation status code', () => {
        cy.request(url + '/users').then((response) => {
          expect(response.status).to.eq(200)
        })
        cy.request('POST', url + '/users').then((response) => {
          expect(response.status).to.eq(201)
        })
        cy.request({
          method: 'DELETE',
          url: url + '/users',
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(404)
        })
        cy.request({
          method: 'PUT',
          url: url + '/users',
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(404)
        })
      })
      // Response is a well-formed JSON object
      it('Validate JSON structure', () => {
        cy.request(url + '/users').then((response) => {
          expect(response.body[0]).to.deep.equal(
            {
              "id": 1,
              "name": "Leanne Graham",
              "username": "Bret",
              "email": "Sincere@april.biz",
              "address": {
                "street": "Kulas Light",
                "suite": "Apt. 556",
                "city": "Gwenborough",
                "zipcode": "92998-3874",
                "geo": {
                  "lat": "-37.3159",
                  "lng": "81.1496"
                }
              },
              "phone": "1-770-736-8031 x56442",
              "website": "hildegard.org",
              "company": {
                "name": "Romaguera-Crona",
                "catchPhrase": "Multi-layered client-server neural-net",
                "bs": "harness real-time e-markets"
              }
            }
          )
        })
      })
      // Response structure is according to data model 
      // (schema validation: field names and field types are as expected, including nested objects; field values are as expected; non-nullable fields are not null, etc.)
      it('Validate payload', () => {
        cy.request(url + '/users').then((response) => {
          response.body.forEach(key => {
            assert.typeOf(key.id, 'number', 'id is number')
            assert.typeOf(key.name, 'string', 'name is string')
            assert.typeOf(key.username, 'string', 'username is string')
            assert.typeOf(key.email, 'string', 'email is string')
            assert.typeOf(key.address, 'object', 'address is string')
          })
        })
      })
      it('Validate payload nested', () => {
        cy.request(url + '/users').then((response) => {
          response.body.forEach(key => {
            assert.exists(key.address.street, 'address.street is not null or undefined')
            assert.exists(key.address.suite, 'address.suite is not null or undefined')
            assert.exists(key.address.city, 'address.city is not null or undefined')
            assert.exists(key.address.zipcode, 'address.zipcode is not null or undefined')
            assert.exists(key.address.geo.lat, 'address.geo.lat is not null or undefined')
            assert.exists(key.address.geo.lng, 'address.geo.lng is not null or undefined')
          })
        })
      })
      //For GET requests, verify there is NO STATE CHANGE in the system (idempotence)
      it('Validate state', () => {
        cy.request(url + '/users').then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.length).to.be.at.least(10)
        })
      })
      // Verify that HTTP headers are as expected, including content-type, connection, cache-control, expires,
      // access-control-allow-origin, keep-alive, HSTS, and other standard header fields – according to spec.
      // Verify that information is NOT leaked via headers (e.g. X-Powered-By header is not sent to user). 
      it('Validate header', () => {
        cy.request(url + '/users').then((response) => {
          expect(response.headers['content-type']).to.eq("application/json; charset=utf-8")
          expect(response.headers['connection']).to.eq("keep-alive")
          expect(response.headers['cache-control']).to.eq("max-age=43200")
          expect(response.headers['expires']).to.eq("-1")
          expect(response.headers['access-control-allow-credentials']).to.eq("true")
          expect(response.headers['x-powered-by']).to.eq("Express")
          expect(response.headers['server']).to.eq("cloudflare")
        })
      })
      // Response is received in a timely manner (within reasonable expected time) — as defined in the test plan.
      it('Performance sanity', () => {
        cy.request(url + '/users').then((response) => {
          expect(response.duration).to.not.be.greaterThan(1000)
        })
      })
    })
    context(`Positive + optional parameters`, () => {
      // Run same tests as in #1, this time including the endpoint’s optional parameters (e.g., filter, sort, limit, skip, etc.)
      it('Validation status code + optional parameters', () => {
        cy.request(url + '/users?id=1&company.name=Romaguera-Crona&username=Bret&offset=1&limit=1').then((response) => {
          expect(response.status).to.eq(200)
        })
        cy.request('POST', url + '/users?id=1&company.name=Romaguera-Crona&username=Bret&offset=1&limit=1').then((response) => {
          expect(response.status).to.eq(201)
        })
        cy.request({
          method: 'DELETE',
          url: url + '/users?id=1&company.name=Romaguera-Crona&username=Bret&offset=1&limit=1',
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(404)
        })
        cy.request({
          method: 'PUT',
          url: url + '/users?id=1&company.name=Romaguera-Crona&username=Bret&offset=100&limit=50',
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(404)
        })
      })
      it('Validate payload first user + optional parameters', () => {
        cy.request(url + '/users?id=1').then((response) => {
          expect(response.body).to.deep.equal(
            [{
              "id": 1,
              "name": "Leanne Graham",
              "username": "Bret",
              "email": "Sincere@april.biz",
              "address": {
                "street": "Kulas Light",
                "suite": "Apt. 556",
                "city": "Gwenborough",
                "zipcode": "92998-3874",
                "geo": {
                  "lat": "-37.3159",
                  "lng": "81.1496"
                }
              },
              "phone": "1-770-736-8031 x56442",
              "website": "hildegard.org",
              "company": {
                "name": "Romaguera-Crona",
                "catchPhrase": "Multi-layered client-server neural-net",
                "bs": "harness real-time e-markets"
              }
            }]
          )
        })
      })
      it('Validate payload nested + optional parameters', () => {
        cy.request(url + '/users?address.geo.lat=-37.3159&address.geo.lng=81.1496').then((response) => {
          expect(response.body).to.deep.equal(
            [{
              "id": 1,
              "name": "Leanne Graham",
              "username": "Bret",
              "email": "Sincere@april.biz",
              "address": {
                "street": "Kulas Light",
                "suite": "Apt. 556",
                "city": "Gwenborough",
                "zipcode": "92998-3874",
                "geo": {
                  "lat": "-37.3159",
                  "lng": "81.1496"
                }
              },
              "phone": "1-770-736-8031 x56442",
              "website": "hildegard.org",
              "company": {
                "name": "Romaguera-Crona",
                "catchPhrase": "Multi-layered client-server neural-net",
                "bs": "harness real-time e-markets"
              }
            }]
          )
        })
      })
      it('Validate state + optional parameters', () => {
        cy.request(url + '/users?address.geo.lat=-37.3159&address.geo.lng=81.1496').then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.length).to.be.at.least(1)
        })
      })
      it('Validate header + optional parameters', () => {
        cy.request(url + '/users?address.geo.lat=-37.3159&address.geo.lng=81.1496').then((response) => {
          expect(response.headers['content-type']).to.eq("application/json; charset=utf-8")
          expect(response.headers['connection']).to.eq("keep-alive")
          expect(response.headers['cache-control']).to.eq("max-age=43200")
          expect(response.headers['expires']).to.eq("-1")
          expect(response.headers['access-control-allow-credentials']).to.eq("true")
          expect(response.headers['x-powered-by']).to.eq("Express")
          expect(response.headers['server']).to.eq("cloudflare")
        })
      })
      it('Performance sanity + optional parameters', () => {
        cy.request(url + '/users?address.geo.lat=-37.3159&address.geo.lng=81.1496').then((response) => {
          expect(response.duration).to.not.be.greaterThan(1000)
        })
      })   
    })
  })
})