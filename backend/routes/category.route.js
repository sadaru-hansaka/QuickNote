const express = require('express');
const router = express.Router();

const {createCategory,getAllCategories,getCategory} = require('../controllers/category.controller');

router.post('/',createCategory);
router.get('/',getAllCategories);
router.get('/:id',getCategory);


module.exports = router;