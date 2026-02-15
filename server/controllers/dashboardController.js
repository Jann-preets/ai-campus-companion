const Timetable = require('../models/Timetable');
const Exam = require('../models/Exam');
const Note = require('../models/Note');

const getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;

        const timetable = await Timetable.find({ userId });
        const exams = await Exam.find({ userId }).sort({ date: 1 }); // Next exams first
        const notes = await Note.find({ userId }).sort({ createdAt: -1 }).limit(5); // Recent notes

        res.status(200).json({
            timetable,
            exams,
            notes
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardData };
