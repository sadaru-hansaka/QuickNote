const express = require('express');
const router = express.Router();

const {createCategory,getAllCategories,getCategory,deleteCategories} = require('../controllers/category.controller');

router.post('/',createCategory);
router.get('/',getAllCategories);
router.get('/:id',getCategory);
router.delete('/:id',deleteCategories);

module.exports = router;