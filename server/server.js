const models = require("./models")
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys.js").MONGO_URI;
const schema = require("./schema/schema");
const cors = require("cors");

// Make sure to require your models index at the top of the file
// Don't forget to import your schema from ./schema/schema
const expressGraphQL = require("express-graphql");

const app = express();
app.use(cors());
// ...
// use the expressGraphQL middleware to connect our GraphQLSchema to Express
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);




if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// remember we use bodyParser to parse requests into json
app.use(bodyParser.json());

module.exports = app;
