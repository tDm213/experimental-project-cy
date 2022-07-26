let url;
let longURL = () => {
  let string = "";
  for (let i = 0; i < 200; i++)
    string =
      string +
      "id=1&company.name=Romaguera-Crona&username=Bret&offset=1&limit=1";

  return string;
};

if (Cypress.env("enviroment") == "qa") {
  url = Cypress.env("defaultURL_API_QA");
} else {
  url = Cypress.env("defaultURL_API_QA");
}

describe(`Verify API ${url}/users`, { tags: ["@smoke", "@monitoring"] }, () => {
  before(() => {
    cy.clearCookies();
  });

  context(`Basic positive tests (happy paths)`, () => {
    // All requests should return 2XX HTTP status code
    // Returned status code is according to spec:
    // – 200 OK for GET requests
    // – 201 for POST or PUT requests creating a new resource
    // – 200, 202, or 204 for a DELETE operation and so on
    it("Positive: Validation status code", () => {
      cy.request(url + "/users").then((response) => {
        expect(response.status).to.eq(200);
      });
    });
    // Response is a well-formed JSON object
    it("Positive: Validate JSON structure", () => {
      cy.request(url + "/users").then((response) => {
        expect(response.body[0]).to.deep.equal({
          id: 1,
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz",
          address: {
            street: "Kulas Light",
            suite: "Apt. 556",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
              lat: "-37.3159",
              lng: "81.1496",
            },
          },
          phone: "1-770-736-8031 x56442",
          website: "hildegard.org",
          company: {
            name: "Romaguera-Crona",
            catchPhrase: "Multi-layered client-server neural-net",
            bs: "harness real-time e-markets",
          },
        });
      });
    });
    // Response structure is according to data model
    // (schema validation: field names and field types are as expected, including nested objects; field values are as expected; non-nullable fields are not null, etc.)
    it("Positive: Validate payload", () => {
      cy.request(url + "/users").then((response) => {
        response.body.forEach((key) => {
          assert.typeOf(key.id, "number", "id is number");
          assert.typeOf(key.name, "string", "name is string");
          assert.typeOf(key.username, "string", "username is string");
          assert.typeOf(key.email, "string", "email is string");
          assert.typeOf(key.address, "object", "address is string");
        });
      });
    });
    it("Positive: Validate payload nested", () => {
      cy.request(url + "/users").then((response) => {
        response.body.forEach((key) => {
          assert.exists(
            key.address.street,
            "address.street is not null or undefined"
          );
          assert.exists(
            key.address.suite,
            "address.suite is not null or undefined"
          );
          assert.exists(
            key.address.city,
            "address.city is not null or undefined"
          );
          assert.exists(
            key.address.zipcode,
            "address.zipcode is not null or undefined"
          );
          assert.exists(
            key.address.geo.lat,
            "address.geo.lat is not null or undefined"
          );
          assert.exists(
            key.address.geo.lng,
            "address.geo.lng is not null or undefined"
          );
        });
      });
    });
    //For GET requests, verify there is NO STATE CHANGE in the system (idempotence)
    it("Positive: Validate state", () => {
      cy.request(url + "/users").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.be.at.least(10);
      });
    });
    // Verify that HTTP headers are as expected, including content-type, connection, cache-control, expires,
    // access-control-allow-origin, keep-alive, HSTS, and other standard header fields – according to spec.
    // Verify that information is NOT leaked via headers (e.g. X-Powered-By header is not sent to user).
    it("Positive: Validate header", () => {
      cy.request(url + "/users").then((response) => {
        expect(response.headers["content-type"]).to.eq(
          "application/json; charset=utf-8"
        );
        expect(response.headers["connection"]).to.eq("keep-alive");
        expect(response.headers["cache-control"]).to.eq("max-age=43200");
        expect(response.headers["expires"]).to.eq("-1");
        expect(response.headers["access-control-allow-credentials"]).to.eq(
          "true"
        );
        expect(response.headers["x-powered-by"]).to.eq("Express");
        expect(response.headers["server"]).to.eq("cloudflare");
      });
    });
    // Positive is received in a timely manner (within reasonable expected time) — as defined in the test plan.
    it("HappyPath: Performance sanity", () => {
      cy.request(url + "/users").then((response) => {
        expect(response.duration).to.not.be.greaterThan(1000);
      });
    });
  });
  context(`Positive + optional parameters`, () => {
    // Run same tests as in #1, this time including the endpoint’s optional parameters (e.g., filter, sort, limit, skip, etc.)
    it("Positive+OP: Validation status code + optional parameters", () => {
      cy.request(
        url +
          "/users?id=1&company.name=Romaguera-Crona&username=Bret&offset=1&limit=1"
      ).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
    it("Positive+OP: Validate payload first user + optional parameters", () => {
      cy.request(url + "/users?id=1").then((response) => {
        expect(response.body).to.deep.equal([
          {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496",
              },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets",
            },
          },
        ]);
      });
    });
    it("Positive+OP: Validate payload nested + optional parameters", () => {
      cy.request(
        url + "/users?address.geo.lat=-37.3159&address.geo.lng=81.1496"
      ).then((response) => {
        expect(response.body).to.deep.equal([
          {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496",
              },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets",
            },
          },
        ]);
      });
    });
    it("Positive+OP: Validate state + optional parameters", () => {
      cy.request(
        url + "/users?address.geo.lat=-37.3159&address.geo.lng=81.1496"
      ).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.be.at.least(1);
      });
    });
    it("Positive+OP: Validate header + optional parameters", () => {
      cy.request(
        url + "/users?address.geo.lat=-37.3159&address.geo.lng=81.1496"
      ).then((response) => {
        expect(response.headers["content-type"]).to.eq(
          "application/json; charset=utf-8"
        );
        expect(response.headers["connection"]).to.eq("keep-alive");
        expect(response.headers["cache-control"]).to.eq("max-age=43200");
        expect(response.headers["expires"]).to.eq("-1");
        expect(response.headers["access-control-allow-credentials"]).to.eq(
          "true"
        );
        expect(response.headers["x-powered-by"]).to.eq("Express");
        expect(response.headers["server"]).to.eq("cloudflare");
      });
    });
    it("Positive+OP: Performance sanity + optional parameters", () => {
      cy.request(
        url + "/users?address.geo.lat=-37.3159&address.geo.lng=81.1496"
      ).then((response) => {
        expect(response.duration).to.not.be.greaterThan(1000);
      });
    });
  });
  context(`Negative testing`, () => {
    // 1. Verify that an erroneous HTTP status code is sent (NOT 200)
    // 2. Verify that the HTTP status code is in accordance with error case as defined in spec
    it("Negative: Verify that an erroneous HTTP status code is sent (NOT 200)", () => {
      cy.request(
        "POST",
        url +
          "/users?id=1&company.name=Romaguera-Crona&username=Bret&offset=1&limit=1"
      ).then((response) => {
        expect(response.status).to.eq(201);
      });
      cy.request({
        method: "DELETE",
        url:
          url +
          "/users?id=1&company.name=Romaguera-Crona&username=Bret&offset=1&limit=1",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
      cy.request({
        method: "PUT",
        url:
          url +
          "/users?id=1&company.name=Romaguera-Crona&username=Bret&offset=1&limit=1",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
    it("Negative + OP: Verify that an erroneous HTTP status code is sent (NOT 200)", () => {
      cy.request(
        "POST",
        url + "/users?asddfgfhghgdfs=sdfghjgfd&users=testestse1"
      ).then((response) => {
        expect(response.status).to.eq(201);
      });
      cy.request({
        method: "DELETE",
        url: url + "/users?asddfgfhghgdfs=sdfghjgfd&users=testestse1",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
      cy.request({
        method: "PUT",
        url: url + "/users?asddfgfhghgdfs=sdfghjgfd&users=testestse0",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
      cy.request("POST", url + "/users?name=sadfh").then((response) => {
        expect(response.status).to.eq(201);
      });
      cy.request({
        method: "DELETE",
        url: url + "/users?name=sadfh",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
      cy.request({
        method: "PUT",
        url: url + "/users?name=sadfh",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
      });
    });
    it("Negative + OP: Validate payload + optional parameters", () => {
      cy.request(url + "/users?asddfgfhghgdfs=sdfghjgfd&users=testestset").then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body.length).to.be.above(9);
        }
      );
      cy.request(url + "/users?name=sadfh").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.equal([]);
      });
    });
    it("Negative + OP: Validate header + optional parameters", () => {
      cy.request(url + "/users?name=sadfh").then((response) => {
        expect(response.headers["content-type"]).to.eq(
          "application/json; charset=utf-8"
        );
        expect(response.headers["connection"]).to.eq("keep-alive");
        expect(response.headers["cache-control"]).to.eq("max-age=43200");
        expect(response.headers["expires"]).to.eq("-1");
        expect(response.headers["access-control-allow-credentials"]).to.eq(
          "true"
        );
        expect(response.headers["x-powered-by"]).to.eq("Express");
        expect(response.headers["server"]).to.eq("cloudflare");
      });
      cy.request(url + "/users?namesf=sadfh").then((response) => {
        expect(response.headers["content-type"]).to.eq(
          "application/json; charset=utf-8"
        );
        expect(response.headers["connection"]).to.eq("keep-alive");
        expect(response.headers["cache-control"]).to.eq("max-age=43200");
        expect(response.headers["expires"]).to.eq("-1");
        expect(response.headers["access-control-allow-credentials"]).to.eq(
          "true"
        );
        expect(response.headers["x-powered-by"]).to.eq("Express");
        expect(response.headers["server"]).to.eq("cloudflare");
      });
    });
    it("Negative + OP: Performance sanity + optional parameters", () => {
      cy.request(
        url +
          "/users?address.geo.lat=-37.3159&address.geo.lng=81.1496&name=sadfh"
      ).then((response) => {
        expect(response.duration).to.not.be.greaterThan(1000);
      });
      cy.request(
        url +
          "/users?address.geo.lat=-37.3159&address.geo.lng=81.1496&namesf=sadfh"
      ).then((response) => {
        expect(response.duration).to.not.be.greaterThan(1000);
      });
    });
  });
  context(`Destructive testing`, () => {
    it("Destructive: Wrong headers", () => {
      cy.request({
        method: "GET",
        url: url + "/users",
        headers: {
          "User-Agent": "Chrome/99999",
          "Content-Type": "gfhgjh/json",
          "Accept-Language": "sFn",
          connection: "error",
          connections: "error",
          server: "error",
          servers: "error",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
    it("Destructive: URL over 200 char", () => {
      cy.request({
        method: "GET",
        url: url + "/users?" + longURL(),
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(414);
        expect(response.duration).to.not.be.greaterThan(1000);
      });
    });
  });
});
