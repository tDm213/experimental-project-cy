- Headless Run for the specific folder
```sh
npx cypress run --browser chrome --spec "cypress/e2e/regression-tests/login-area/accounts/*.cy.js"
```

- Override url and for the specific folder
```sh
npx cypress run --env defaultURL=http://example-url.example.com --browser chrome --spec "cypress/e2e/regression-tests/login-area/accounts/*.cy.js"
```
- Enviroment Selector
```sh
npx cypress run --env enviroment=qa --browser chrome
```
npx cypress run --env viewport=iphone-3 --browser chrome --spec "cypress/e2e/regression-tests/login-area/accounts/changePassword.login.cy.js"