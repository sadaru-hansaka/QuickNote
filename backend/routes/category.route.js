const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const {createCategory,getAllCategories,getCategory,deleteCategories} = require('../controllers/category.controller');

router.post('/',auth,createCategory);
router.get('/',auth,getAllCategories);
router.get('/:id',getCategory);
router.delete('/:id',deleteCategories);

module.exports = router;