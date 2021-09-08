const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try {
    // Find all categories
    const categoryData = await Category.findAll({
      // Include associated products
      include: [
        {
          model: Product,
          attributes: ['product_name'],
        },
      ],
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find one category by its id
    const categoryData = await Category.findByPk(req.params.id, {
      // Include associated products
      include: [
        {
          model: Product,
          attributes: ['product_name'],
        },
      ],
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;