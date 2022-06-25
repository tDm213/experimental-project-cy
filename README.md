- Headless Run for the specific folder
```sh
npx cypress run --browser chrome --spec "cypress/e2e/domain-test/accounts/*.cy.js"
```

- Override url
```sh
npx cypress run --env defaultURL=http://example-url.example.com --browser chrome --spec "cypress/e2e/domain-test/accounts/*.cy.js"
```
- Enviroment Selector
```sh
npx cypress run --env enviroment=qa --browser chrome --spec "cypress/e2e/domain-test/accounts/*.cy.js"
```