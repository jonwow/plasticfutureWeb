const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});


// to be implemented soon. 
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
  const status = req.body.status;
  // (discontinued, will be renewed, unreleased ), 
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

/* security reasons. delete it through mongodb site instead.
router.route('/:id').delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Product deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
}); */

/* security reasons. update it through mongodb site instead.
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
}); */

module.exports = router;