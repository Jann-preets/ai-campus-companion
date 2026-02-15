const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Timetable = require('./models/Timetable');
const Exam = require('./models/Exam');
const Note = require('./models/Note');
const connectDB = require('./config/db');

dotenv.config({ path: __dirname + '/.env' });

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await User.deleteMany({});
        await Timetable.deleteMany({});
        await Exam.deleteMany({});
        await Note.deleteMany({});

        // Create Demo User
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const user = await User.create({
            username: 'Alex Student',
            email: 'student@college.edu',
            password: hashedPassword,
            role: 'student',
            profile: {
                bio: 'Computer Science Major | Junior Year',
                year: 'Junior',
                major: 'Computer Science'
            }
        });

        console.log('User created:', user.email);

        // Create Timetable
        await Timetable.create({
            userId: user._id,
            day: 'Monday',
            courses: [
                { courseCode: 'CS301', name: 'Algorithms', time: '10:00 AM', location: 'Hall A' },
                { courseCode: 'MATH202', name: 'Linear Algebra', time: '02:00 PM', location: 'Room 304' }
            ]
        });

        // Create Exams
        await Exam.create([
            {
                userId: user._id,
                courseName: 'Algorithms Midterm',
                date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
                location: 'Exam Hall 1',
                notes: 'Chapters 1-4'
            },
            {
                userId: user._id,
                courseName: 'Linear Algebra Final',
                date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                location: 'Room 202',
                notes: 'Bring calculator'
            }
        ]);

        // Create Notes
        await Note.create({
            userId: user._id,
            title: 'Graph Theory Intro',
            subject: 'Algorithms',
            content: 'Nodes, Vertices, and Edges...',
            tags: ['graphs', 'cs', 'algos']
        });

        console.log('Data seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
