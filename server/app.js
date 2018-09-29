const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://admin:test123@ds117623.mlab.com:17623/gql-ninja', {
	useNewUrlParser: true
});

mongoose.connection.once('open', () => {
	console.log('connected to database');
});

// allow cross-origin requests
app.use(cors());

// Middleware to handle GraphQL and schema is a required
// schema is basically how our graph will look like
app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true // thi is the ui to allow us to test graphql queries. without it enabled, we will get an error of query missing
	})
);

app.listen(4000, () => {
	console.log('Server is running on 4000');
});
