const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    subject: String,
    content: String,
    fileUrl: String,
    tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
