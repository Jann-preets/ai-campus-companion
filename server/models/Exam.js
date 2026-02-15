const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseName: { type: String, required: true },
    date: { type: Date, required: true },
    location: String,
    notes: String
}, { timestamps: true });

module.exports = mongoose.model('Exam', ExamSchema);
