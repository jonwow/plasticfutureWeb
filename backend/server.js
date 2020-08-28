// extra stuff that this needs
const express = require('express');
const cors = require('cors');
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
    console.log("Server is running on port: " + port);

});