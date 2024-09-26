const req = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const search = [
  "",
  "id=0",
  "id=55&userId=6&offset=1&limit=16",
  "id=55&userId=0",
  "DELETE",
];
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
    it.only("Positive: Validation status code", () => {
      cy.request(url + "/posts").then((response) => {
        expect(response.status).to.eq(200);
      });
      cy.request("POST", url + "/posts").then((response) => {
        expect(response.status).to.eq(201);
      });
      // 'PUT', 'PATCH', 'DELETE'
      req.slice(2).forEach((req) => {
        cy.request(req, url + "/posts/1").then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });

    it("Positive: Validate payload", () => {
      cy.request(url + "/posts").then((response) => {
        response.body.forEach((key) => {
          assert.typeOf(key.userId, "number", "userId is number");
          assert.typeOf(key.id, "number", "id is number");
          assert.typeOf(key.title, "string", "title is string");
          assert.typeOf(key.body, "string", "body is string");
          expect(Object.keys(key).length).to.equal(4);
        });
      });
    });

    // Response is a well-formed JSON object
    it("Positive: Validate JSON structure", () => {
      cy.request(url + "/posts").then((response) => {
        expect(response.body[0]).to.deep.equal({
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        });
      });
      cy.request({
        method: "POST",
        url: url + "/posts",
        headers: {
          "User-Agent": "Chrome/103.0.0.0 Safari/537.36",
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept-Language": "en",
        },
        body: {
          userId: 100,
          title: "TTTnesciunt quas odio",
          body: "TTTrepudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).to.deep.equal({
          userId: "100",
          title: "TTTnesciunt quas odio",
          id: 101,
          body: "TTTrepudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
        });
      });
      // 'PUT', 'PATCH', 'DELETE'
      req.slice(2).forEach((req) => {
        cy.request({
          method: req,
          url: url + "/posts/100",
          headers: {
            "User-Agent": "Chrome/103.0.0.0 Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Language": "en",
          },
          body: {
            userId: 101,
            title: "TTTnesciunt quas odio",
            body: "TTTrepudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
          },
          failOnStatusCode: false,
        }).then((response) => {
          if (req == "DELETE") {
            expect(response.body).to.deep.equal({});
          } else {
            expect(response.body).to.deep.equal({
              userId: "101",
              title: "TTTnesciunt quas odio",
              id: 100,
              body: "TTTrepudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque",
            });
          }
        });
      });
    });

    it("Positive: Validate state", () => {
      cy.request(url + "/posts").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.be.at.least(100);
      });
    });

    it("Positive: Validate header", () => {
      cy.request(url + "/posts").then((response) => {
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
      cy.request(url + "/posts").then((response) => {
        expect(response.duration).to.not.be.greaterThan(1000);
      });
      cy.request(url + "/posts/99").then((response) => {
        expect(response.duration).to.not.be.greaterThan(1000);
      });
    });
  });

  context(`Positive + optional parameters`, () => {
    it("Positive + OP: Validation status code", () => {
      cy.request(url + "/posts?id=55&userId=6&offset=1&limit=1").then(
        (response) => {
          expect(response.status).to.eq(200);
        }
      );
      cy.request("POST", url + "/posts?id=55&userId=6&offset=1&limit=1").then(
        (response) => {
          expect(response.status).to.eq(201);
        }
      );
      // 'PUT', 'PATCH', 'DELETE'
      req.slice(2).forEach((req) => {
        cy.request(req, url + "/posts/55?offset=1&limit=1").then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });

    it("Positive + OP: Validate payload", () => {
      cy.request(url + "/posts?id=5").then((response) => {
        response.body.forEach((key) => {
          assert.typeOf(key.userId, "number", "userId is number");
          assert.typeOf(key.id, "number", "id is number");
          assert.typeOf(key.title, "string", "title is string");
          assert.typeOf(key.body, "string", "body is string");
          expect(Object.keys(key).length).to.equal(4);
        });
      });
    });

    it("Positive + OP: Validate state", () => {
      cy.request(url + "/posts?id=5").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.be.at.least(1);
      });
    });

    it("Positive + OP: Validate header", () => {
      cy.request(url + "/posts?id=55&userId=6&offset=1&limit=16").then(
        (response) => {
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
        }
      );
    });

    it("Positive + OP: Performance sanity", () => {
      cy.request(url + "/posts?id=55&userId=6&offset=1&limit=16").then(
        (response) => {
          expect(response.duration).to.not.be.greaterThan(1000);
        }
      );
      cy.request(url + "/posts/99").then((response) => {
        expect(response.duration).to.not.be.greaterThan(1000);
      });
    });
  });

  context(`Negative testing`, () => {
    it("Negative: Verify that an erroneous HTTP status code is sent (NOT 200)", () => {
      cy.request(
        "POST",
        url +
          "/users?id=1&company.name=Romaguera-Crona&username=Bret&offset=1&limit=1"
      ).then((response) => {
        expect(response.status).to.eq(201);
      });
      // 'PUT', 'PATCH', 'DELETE'
      req.slice(2).forEach((req) => {
        cy.request({
          method: req,
          url: url + "/posts?id=1&userId=1",
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(404);
        });
      });
      // 'PUT', 'PATCH', 'DELETE'
      req.slice(2).forEach((req) => {
        cy.request({
          method: req,
          url:
            url +
            "/posts?id=1&company.name=Romaguera-Crona&username=Bret&offset=1&limit=1",
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(404);
        });
      });
    });
    // Response is a well-formed JSON object
    it("Negative: Validate JSON structure", () => {
      cy.request({
        method: "POST",
        url: url + "/posts",
        headers: {
          "User-Agent": "Chrome/103.0.0.0 Safari/537.36",
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept-Language": "en",
        },
        body: {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "uia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.body).to.deep.equal({
          userId: "1",
          id: 101,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "uia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        });
      });
      // 'PUT', 'PATCH', 'DELETE'
      req.slice(2).forEach((req) => {
        cy.request({
          method: req,
          url: url + "/posts/100",
          headers: {
            "User-Agent": "Chrome/103.0.0.0 Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Language": "en",
          },
          body: {
            userId: 1,
            id: 1,
            title:
              "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "uia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
          },
          failOnStatusCode: false,
        }).then((response) => {
          if (req == "DELETE") {
            expect(response.body).to.deep.equal({});
          }
          if (req == "PUT") {
            expect(response.body).to.deep.equal({
              userId: "1",
              id: 100,
              title:
                "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
              body: "uia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
            });
          }
          if (req == "PATCH") {
            expect(response.body).to.deep.equal({
              userId: "1",
              id: "1",
              title:
                "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
              body: "uia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
            });
          }
        });
      });
    });
    it("Negative + OP: Validate header", () => {
      search.forEach((s) => {
        cy.request(url + "/posts?" + s).then((response) => {
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
      req.slice(2).forEach((req) => {
        search.forEach((s) => {
          cy.request({
            method: req,
            url: url + "/posts/100?" + s,
            headers: {
              "User-Agent": "Chrome/103.0.0.0 Safari/537.36",
              "Content-Type": "application/x-www-form-urlencoded",
              "Accept-Language": "en",
            },
            body: {
              userId: 1,
              id: 1,
              title:
                "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
              body: "uia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.headers["content-type"]).to.eq(
              "application/json; charset=utf-8"
            );
            expect(response.headers["connection"]).to.eq("keep-alive");
            //expect(response.headers["cache-control"]).to.eq("max-age=43200");
            expect(response.headers["expires"]).to.eq("-1");
            expect(response.headers["access-control-allow-credentials"]).to.eq(
              "true"
            );
            expect(response.headers["x-powered-by"]).to.eq("Express");
            expect(response.headers["server"]).to.eq("cloudflare");
          });
        });
      });
    });
    it("Negative + OP: Performance sanity + optional parameters", () => {
      req.slice(2).forEach((req) => {
        search.forEach((s) => {
          cy.request({
            method: req,
            url: url + "/posts/100?" + s,
            headers: {
              "User-Agent": "Chrome/103.0.0.0 Safari/537.36",
              "Content-Type": "application/x-www-form-urlencoded",
              "Accept-Language": "en",
            },
            body: {
              userId: 1,
              id: 1,
              title:
                "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
              body: "uia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.duration).to.not.be.greaterThan(1000);
          });
        });
      });
    });
  });
  context(`Destructive testing`, () => {
    it("Destructive: Wrong headers", () => {
      req.slice(2).forEach((req) => {
        search.forEach((s) => {
          cy.request({
            method: req,
            url: url + "/posts/100?" + s,
            headers: {
              "User-Agent": "Chrome/99999",
              "Content-Type": "gfhgjh/json",
              "Accept-Language": "sFn",
              connection: "error",
              connections: "error",
              server: "error",
              servers: "error",
            },
            body: {
              userId: 1,
              id: 1,
              title:
                "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
              body: "uia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(200);
          });
        });
      });
    });
    it("Destructive: URL over 200 char", () => {
      cy.request({
        method: "GET",
        url: url + "/posts?" + longURL(),
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(414);
        expect(response.duration).to.not.be.greaterThan(1000);
      });
      // 'PUT', 'PATCH', 'DELETE'
      req.slice(2).forEach((req) => {
        cy.request({
          method: req,
          url: url + "/posts/100" + longURL(),
          headers: {
            "User-Agent": "Chrome/103.0.0.0 Safari/537.36",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Language": "en",
          },
          body: {
            userId: 1,
            id: 1,
            title:
              "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            body: "uia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(414);
          expect(response.duration).to.not.be.greaterThan(1000);
        });
      });
    });
  });
});
