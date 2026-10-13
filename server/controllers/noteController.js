
const Note = require('../models/Note');

// Get notes belonging to the logged-in user
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user._id })
            .sort({ createdAt: -1 });

        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notes.' });
    }
};

// Create a note for the logged-in user
const createNote = async (req, res) => {
    try {
        const { title, subject, content } = req.body;

        if (!title?.trim() || !subject?.trim()) {
            return res.status(400).json({
                message: 'Title and subject are required.'
            });
        }

        const note = await Note.create({
            userId: req.user._id,
            title: title.trim(),
            subject: subject.trim(),
            content: content || ''
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create note.' });
    }
};

// Delete a note belonging to the logged-in user
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!note) {
            return res.status(404).json({ message: 'Note not found.' });
        }

        res.status(200).json({ message: 'Note deleted successfully.' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid note ID.' });
    }
};

module.exports = { getNotes, createNote, deleteNote };
