const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// This list all categories in table
router.get('/',async (req, res) => {
  try{
    // categoryData comes from category-seeds.js
    const categoryData = await Category.findAll({
      // model:product comes from folder models and file Product.js line 6
      include: [{model:Product}]
    })
    res.status(200).json(categoryData)
  }catch (error) {
    res.status(404).json({message:"Not able to find Categories!"})
  }
});

// This locates existing category based off ID
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(404).json({message:"Cannot find category id!"});
  }
});

// This creates a new category with new ID #
router.post('/',async (req, res) => {
  try {
    const categoryNew = await Category.create(req.body)
    res.status(200).json(categoryNew);
  } catch (error) {
    res.status(404).json({message:"Did not create new category!"});
  }
});

// This updates existing category name based off of ID #
router.put('/:id',async (req, res) => {
  try {
    const UpdateCategory = await Category.update(req.body, {
      where: {
        id:req.params.id
      }
    })
    res.status(200).json(UpdateCategory)
  }catch (error) {
    res.status(404).json({message:"Did not update category!"});
  }
});

// This deletes category based off ID #
router.delete('/:id',async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id:req.params.id
      }
    })
    res.status(200).json(categoryData);
  }catch (error) {
    res.status(404).json({message:"Did not delete category!"});
  }
});

module.exports = router;
