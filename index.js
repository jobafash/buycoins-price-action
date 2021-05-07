const express = require('express');
const express_graphql = require('express-graphql');
const schema = require('./dist/schema');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/graphql',
  express_graphql({ schema: schema, graphiql: true }),
);

app.listen(port, () => console.log(`API listening on http://localhost/${port}/graphql`)
  );

module.exports = app;