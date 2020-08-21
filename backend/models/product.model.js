// productSchema = data that gets into mongodb for each product
const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const productSchema = new Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    season: { type: String, required: true },
    colors: { type: Array, required: true },
    primeCost: { type: Array, required: true },
    price: { type: Array, required: true },
    orderBy: { type: Array, required: true },
    unitsSold: { type: Array, required: true },
    designers: { type: String, required: true },
    releaseDate: { type: Array, required: true },
    productCode: { type: String, required: true },
    sizes: { type: Object, required: true },
    info: { type: String, required: true },
    public: { type: Array, required: true },
    available: { type: Array, required: true },
    description: { type: String, required: true },

},
    {
        timestamps: true,
    });



const Product = mongoose.model("Product", productSchema);



module.exports = Product;