
const express = require('express');
const router = express.Router();

const {
    getTimetable,
    createClass,
    deleteClass
} = require('../controllers/timetableController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getTimetable)
    .post(protect, createClass);

router.delete('/:id', protect, deleteClass);

module.exports = router;
