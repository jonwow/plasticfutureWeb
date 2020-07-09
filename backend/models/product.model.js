// this is the model of a product.
// productSchema = data that gets into mongodb for each product
const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const productSchema = new Schema({

    description: { type: String, required: true, },
    name: { type: String, required: true,},
    type: {type: String, required: true,},
    name: {type: String, required: true,},
    season: {type: String, required: true,},
    primeCost: {type: Number, required: true,},
    price: {type: Number, required: true,},
    unitsSold: {type: Number, required: true,},
    releaseDate: {type: Date, required: true,},
    designers: {type: String, required: true,},
    description: {type: String, required: true,},
    productCode: {type: String, required: true,},
    status: {type: String, required: true,},
    orderBy: {type: Number, required: true,},
    color: {type: Array, required: true,},
    sizes: {type: Object, required: true,},
},
    {
        timestamps: true,
    });



const Product = mongoose.model("Product", productSchema);


// console.log(Product);

module.exports = Product;