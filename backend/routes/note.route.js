const express = require('express');
const router = express.Router();
const Note = require('../models/note.model');
const {createNote, getNotes, getNotesById,updateNotes,deletenotes} = require('../controllers/note.controller');

// create notes
router.post('/', createNote);

// get notes
router.get('/', getNotes)
router.get('/:id', getNotesById);
// update
router.put('/:id', updateNotes);
// delete
router.delete('/:id', deletenotes)

module.exports = router;