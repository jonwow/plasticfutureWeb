// Express.js basically helps you manage everything, from routes, to handling requests and views.
const express = require('express');

// Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served. A web page may freely embed cross-origin images, stylesheets, scripts, iframes, and videos.
const cors = require('cors');

// Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
const mongoose = require("mongoose");

// reads the '.env' file and calls it "process.env"
// https://www.npmjs.com/package/dotenv
require('dotenv').config();
 
if (require('dotenv').config().error) {
  throw require('dotenv').config().error
}
 
// ?
const app = express();
const port = process.env.PORT || 5000;

// ?
app.use(cors());
app.use(express.json());



// ?
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;


// once the connection is opened...
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully.");
});


// ?
const productsRouter = require("./routes/products");

// ?
app.use('/products', productsRouter);


// ?
app.listen(port, () => {
    // console.log("Server is running on port: " + port);

});