const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// displaying everything in tag table
router.get('/',async (req, res) => {
  try{
    // tagData comes from tag-seeds.js
    const tagData = await Tag.findAll({
    // join
      include: [{model:Product, through: ProductTag}]
    })
    res.status(200).json(tagData)
  }catch (error) {
    res.status(404).json({message:"Not able to find tags!"})
  }
});

// Displays tag by tag ID
router.get('/:id',async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model:Product, through: ProductTag}]
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(404).json({message:"Cannot find tag by id!"});
  }
});
// This makes new tag with new ID
router.post('/',async (req, res) => {
  try {
    const tagNew = await Tag.create(req.body)
    res.status(200).json(tagNew);
  } catch (error) {
    res.status(404).json({message:"Did not create new tag!"});
  }
});

// This updates existing tag based off ID
router.put('/:id',async (req, res) => {
  try {
    const UpdateTag = await Tag.update(req.body, {
      where: {
        id:req.params.id
      }
    })
    res.status(200).json(UpdateTag)
  }catch (error) {
    res.status(404).json({message:"Did not update Tag!"});
  }
});

// This deletes tag based off ID
router.delete('/:id',async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id:req.params.id
      }
    })
    res.status(200).json(tagData);
  }catch (error) {
    res.status(404).json({message:"Did not delete tag!"});
  }
});

module.exports = router;
