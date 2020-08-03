const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/add').post((req, res) => {
  const type = req.body.type;
  const name = req.body.name;
  const season = req.body.season;
  const primeCost = req.body.primeCost;
  const price = req.body.price;
  const unitsSold = req.body.unitsSold;
  const releaseDate = Date.parse(req.body.releaseDate);
  const designers = req.body.designers;
  const description = req.body.description;
  const productCode = String(req.body.productCode);
  // (discontinued, will be renewed, unreleased ), 
  const status = req.body.status;
  const orderBy = Number(req.body.orderBy);
  const color = req.body.color;
  /* for each additional color, make an additional row */
  const sizes = Object(req.body.sizes);

  // Sizes[0][3] = xxxs color #4
  const newProduct = new Product({
    type,
    name,
    season,
    primeCost,
    price,
    unitsSold,
    releaseDate,
    designers,
    description,
    productCode,
    status,
    orderBy,
    color,
    sizes,
  });

  newProduct.save()
  .then(() => res.json('Product added!'))
  .catch(err => res.status(400).json('Error: ' + err));
}); 


// ROUTE THAT DISPLAYS PRODUCTS
router.route('/:id').get((req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;