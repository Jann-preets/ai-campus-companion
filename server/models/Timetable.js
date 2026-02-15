const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    day: { type: String, required: true },
    courses: [{
        courseCode: String,
        name: String,
        time: String,
        location: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Timetable', TimetableSchema);
