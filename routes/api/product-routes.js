const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// GET api/products/
router.get('/', async (req, res) => {
  try {
    // Find all products
    const productData = await Product.findAll({
      // Include associated category, tag
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
        {
          model: Tag,
          attributes: ['tag_name'],
        },
      ],
    });

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET api/products/:id
router.get('/:id', async (req, res) => {
  try {
    // Find one product by its id
    const productData = await Product.findByPk(req.params.id, {
      // Include associated category, tag
      include: [
        {
          model: Category,
          attributes: ['category_name'],
        },
        {
          model: Tag,
          attributes: ['tag_name'],
        },
      ],
    });

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST api/products/
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // If there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // If no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// PUT api/products/:id
router.put('/:id', (req, res) => {
  // Update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // Find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // Get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // Create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // Figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // Run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      res.status(400).json(err);
    });
});

// DELETE api/products/:id
router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    // Delete product by id
    const productData = await Product.destroy({
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