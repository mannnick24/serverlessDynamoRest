# sample service to practice node TDD with AWS serverless

* setup aws account and serverless account
* npm install -g serverless
* npm install

## TODO
* add some tests
* add some validation

## endpoints
* endpoints:
  * POST - https://t94iknt3bd.execute-api.eu-west-2.amazonaws.com/dev/books
  * GET - https://t94iknt3bd.execute-api.eu-west-2.amazonaws.com/dev/books
  * GET - https://t94iknt3bd.execute-api.eu-west-2.amazonaws.com/dev/books/{id}
  * DELETE - https://t94iknt3bd.execute-api.eu-west-2.amazonaws.com/dev/books/{id}
* functions:
  * upsertBook: gnettest-rest-api-app-dev-upsertBook
  * listBooks: gnettest-rest-api-app-dev-listBooks
  * getBook: gnettest-rest-api-app-dev-getBook
  * deleteBook: gnettest-rest-api-app-dev-deleteBook

