
const Timetable = require('../models/Timetable');

// Get the logged-in user's timetable
const getTimetable = async (req, res) => {
    try {
        const timetable = await Timetable.find({
            userId: req.user._id
        }).sort({ day: 1 });

        res.status(200).json(timetable);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch timetable.'
        });
    }
};

// Add a class to a day
const createClass = async (req, res) => {
    try {
        const { day, name, code, time, location } = req.body;

        if (!day || !name?.trim() || !time?.trim()) {
            return res.status(400).json({
                message: 'Day, class name, and time are required.'
            });
        }

        let timetable = await Timetable.findOne({
            userId: req.user._id,
            day
        });

        if (!timetable) {
            timetable = new Timetable({
                userId: req.user._id,
                day,
                courses: []
            });
        }

        timetable.courses.push({
            name: name.trim(),
            courseCode: (code || '').trim(),
            time: time.trim(),
            location: (location || '').trim()
        });

        await timetable.save();

        res.status(201).json(timetable);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to save class.'
        });
    }
};

// Delete a class using its course ID
const deleteClass = async (req, res) => {
    try {
        const timetable = await Timetable.findOne({
            userId: req.user._id,
            'courses._id': req.params.id
        });

        if (!timetable) {
            return res.status(404).json({
                message: 'Class not found.'
            });
        }

        timetable.courses.pull({ _id: req.params.id });

        if (timetable.courses.length === 0) {
            await Timetable.deleteOne({ _id: timetable._id });
        } else {
            await timetable.save();
        }

        res.status(200).json({
            message: 'Class deleted successfully.'
        });
    } catch (error) {
        res.status(400).json({
            message: 'Invalid class ID.'
        });
    }
};

module.exports = {
    getTimetable,
    createClass,
    deleteClass
};
