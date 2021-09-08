const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET api/categories/
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

// GET api/categories/:id
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

// POST api/categories/
router.post('/', async (req, res) => {
  try {
    // Create new category
    const categoryData = await Category.create({
      category_name: req.body.category_name,
    });

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT api/categories/:id
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
});

// DELETE api/categories/:id
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;