const express = require('express');
const router = express.Router();
const Note = require('../models/note.model');
const auth = require("../middleware/auth");
const {createNote, getNotes,getRecentNotes, getNotesById,updateNotes,deletenotes,getNotesByTitle,toggleFavorite,getFavoriteNotes} = require('../controllers/note.controller');

// create notes
router.post('/',auth, createNote);

// get notes
router.get('/',auth, getNotes)
router.get('/favorites', auth, getFavoriteNotes);
router.get('/recent', auth, getRecentNotes);

router.get('/:id',auth, getNotesById);
router.get('/search/:title',auth,getNotesByTitle);
// update
router.put('/:id',auth, updateNotes);
// delete
router.delete('/:id',auth, deletenotes)

router.put('/:id/favorite', auth, toggleFavorite);




module.exports = router;