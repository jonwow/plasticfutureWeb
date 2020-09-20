// Express.js helps with routes, handling requests
const express = require('express');

// cors helps with requests
const cors = require('cors');

// mongoose makes working with mongodb easier (used for schemas and connections here)
const mongoose = require("mongoose");

// reads the '.env' file and calls it "process.env"
// https://www.npmjs.com/package/dotenv
require('dotenv').config();
 
if (require('dotenv').config().error) {
  throw require('dotenv').config().error
}
 
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// takes the uri from the .env file
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;


// once the connection is opened...
connection.once('open', () => {
    console.log("MongoDB is succesfully connected!");
});


// creates a router for products based on the ./routes/products.js file 
const productsRouter = require("./routes/products");
app.use('/products', productsRouter);


app.listen(port, () => {
  console.log('listening to port '+ port);
});