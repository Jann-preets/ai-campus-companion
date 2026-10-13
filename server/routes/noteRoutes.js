
const express = require('express');
const router = express.Router();

const {
    getNotes,
    createNote,
    deleteNote
} = require('../controllers/noteController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getNotes)
    .post(protect, createNote);

router.delete('/:id', protect, deleteNote);

module.exports = router;
