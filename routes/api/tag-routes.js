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
  /* req.body should look like this...
    {
      "tag_name": "name",
      "productIds": [1, 2, 3]
    }
  */

  try {
    // Create new tag
    const newTag = await Tag.create(req.body);

    // If user gives products,
    if (req.body.productIds.length) {
      // Create new array with tag and product ids
      const productTagIdArray = req.body.productIds.map((product_id) => {
        return {
          tag_id: newTag.id,
          product_id,
        };
      });

      // Add product/tag array to product_tag table
      const newProductTags = await ProductTag.bulkCreate(productTagIdArray);

      return res.status(200).json(newProductTags);
    }
    // If user does not give products,
    else {
      res.status(200).json(newTag);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT api/tags/:id
router.put('/:id', async (req, res) => {
  /* req.body should look like this...
    {
      "tag_name": "name",
      "productIds": [1, 2, 3]
    }
  */

  try {
    // Update existing tag
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Find all associated products from product_tag
    const productTags = await ProductTag.findAll({
      where: {
        tag_id: req.params.id,
      },
    });

    // Get array of associated product_ids from product_tag
    const productTagIds = productTags.map(({ product_id }) => product_id);

    // Create array of product_tags to be added
    const newProductTags = req.body.productIds
      .filter((product_id) => !productTagIds.includes(product_id))
      .map((product_id) => {
        return {
          tag_id: req.params.id,
          product_id,
        };
      });

      // Create array of product_tags to be removed
      const productTagsToRemove = productTags
      .filter(({ product_id }) => !req.body.productIds.includes(product_id))
      .map(({ id }) => id);

      // Delete product_tags without new productIds, create product_tags with new productIds
      const updatedProductTags = await Promise.all([
        ProductTag.destroy({
          where: {
            id: productTagsToRemove,
          },
        }),
        ProductTag.bulkCreate(newProductTags),
      ]);

      res.status(200).json(updatedProductTags);
  } catch (err) {
    res.status(400).json(err);
  }
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
