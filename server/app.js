const express = require("express"); // Node web server framework
const graphqlHTTP = require("express-graphql"); // connects server w/ graphql API
const schema = require("./schema/schema"); // Data schema that allows server to understand API
const mongoose = require("mongoose"); // Object data modeling for mongoDB
const cors = require("cors"); // Allow endpoint to accept requests

const app = express();
app.use(cors());

// *---------* Connect to DB *---------*
mongoose.connect(
  "mongodb+srv://josh:admin@cluster0-p31vb.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.once("open", () => {
  console.log("connected to MongoDB 🚀");
});

// *---------* Connect API endpoints with server  *---------*

// Fires off a request whenever a request to /graphql is made
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, r => {
  console.log("Server listening on port 4000");
});
