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
  const color = req.body.color;  
  const primeCost = req.body.primeCost;  
  const price = req.body.price;
  const orderBy = req.body.orderBy;
  const unitsSold = req.body.unitsSold;
  const designers = req.body.designers;
  const releaseDate = req.body.releaseDate;
  const productCode = req.body.productCode;
  const sizes = req.body.sizes;
  const info = req.body.info;
  const public = req.body.public;
  const available = req.body.available;
  const description = req.body.description;
  
  
  
  const newProduct = new Product({
    type,
    name,
    season,
    color,
    primeCost,
    price,
    orderBy,
    unitsSold,
    designers,
    releaseDate,
    productCode,
    sizes,
    info,
    public,
    available,
    description,
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