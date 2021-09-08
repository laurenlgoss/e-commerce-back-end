const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET api/tags/
router.get('/', async (req, res) => {
  try {
    // Find all tags
    const tagData = await Tag.findAll({
      // Include associated products
      include: [
        {
          model: Product,
          attributes: ['product_name'],
        },
      ],
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET api/tags/:id
router.get('/:id', async (req, res) => {
  try {
    // Find one tag by its id
    const tagData = await Tag.findByPk(req.params.id, {
      // Include associated products
      include: [
        {
          model: Product,
          attributes: ['product_name'],
        },
      ],
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST api/tags/
router.post('/', async (req, res) => {
  // create a new tag
});

// PUT api/tags/:id
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
});

// DELETE api/tags/:id
router.delete('/:id', async (req, res) => {
  try {
    // Delete tag by id
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ message: 'Delete successful.' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;