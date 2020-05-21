'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamo = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.DYNAMODB_TABLE;

// create a book
exports.upsert = (evt, ctx, cb) => {

  const data = JSON.parse(evt.body)

  if (!data.name || !data.authorName || !data.releaseDate) {
    console.error('Validation Failed')
    console.error(data);
    cb(new Error('Couldn\'t create the book.'));
    return
  }

  const uuid = data.uuid ? data.uuid : uuid.v1();

  const params = {
    TableName: tableName,
    Item: {
      uuid: uuid.v1(),
      name: data.name,
      authorName: data.authorName,
      releaseDate: data.releaseDate
    }
  }

  dynamo.put(params, (err, resp) => {
    // TODO refactor to common resp handler
    if (err) {
      cb(err)
    } else {
      cb(null, {
        statusCode: 201,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(resp)
      })
    }
  })
};

// get a book
exports.delete = (evt, ctx, cb) => {

  console.log( `delete ${evt.pathParameters}` );

  dynamo.delete({
    Key: {
      uuid: evt.pathParameters.id,
      NumberRangeKey: 1
    },
    TableName: tableName
  }, (err, data) => {
    if (err) {
      cb(err)
    } else {
      const book = data.Item
      cb(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(book)
      })
    }
  })
};

// get a book
exports.get = (evt, ctx, cb) => {

  console.log( evt.pathParameters );

  dynamo.get({
    Key: {
      uuid: evt.pathParameters.id
    },
    TableName: tableName
  }, (err, data) => {
    if (err) {
      cb(err)
    } else {
      const book = data.Item
      cb(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(book)
      })
    }
  })
};

// list books
exports.list = (evt, ctx, cb) => {

  dynamo.scan({
    TableName: tableName
  }, (err, data) => {
    if (err) {
      cb(err)
    } else {
      const books = data.Items
      cb(null, {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(books)
      })
    }
  })
};

