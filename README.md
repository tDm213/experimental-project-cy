# Cypress Experimental Project

The purpose of this Project is to test Cypress implementations and to see the way they work.

In this project we are able to:

- Run specific parts based on our needs
- Implement Cypress features

## Note

Before setting up this project, we need to make sure that we have installed:

- nodeJS
- Chrome (browser)
- Firefox (browser)

## Run

- Headless Run for the folder

```sh
npx cypress run --browser chrome --spec "cypress/e2e/regression-tests/login-area/accounts/*.cy.js"
```

- Override URL

```sh
npx cypress run --env defaultURL=http://example-url.example.com
```

- Environment Selector

```sh
npx cypress run --env enviroment=qa --browser chrome
```

- Run in a small screen resolution

```sh
npm run cy:regression:smallScreen
```

- Run only smoke tests (with the label "smoke")

```sh
npm run cy:smoke
```

## What features can be found in this Project:

- Cross-environmental check
- Cross-browser check
- Cross-resolution check
- Split tests for login.cy.js, reg.cy.js, api.cy.js
- API test
- Retry feature
- Basic implementation of POM
- Basic implementation of cy.session
- Basic implementation of Tags
