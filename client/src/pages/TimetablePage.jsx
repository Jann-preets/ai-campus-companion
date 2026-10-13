import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from '../components/ui';
import { Calendar, Plus, Trash, Clock, MapPin } from 'lucide-react';

const TimetablePage = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);

    const [newClass, setNewClass] = useState({
        day: 'Monday',
        name: '',
        code: '',
        time: '',
        location: ''
    });

    const getToken = () => {
        const userInfo = JSON.parse(
            localStorage.getItem('userInfo') || '{}'
        );
        return userInfo.token;
    };

    // Fetch saved classes from MongoDB
    const fetchTimetable = async () => {
        try {
            setError('');

            const token = getToken();

            if (!token) {
                setError('Please log in to view your timetable.');
                return;
            }

            const response = await axios.get(
                'http://localhost:5000/api/timetable',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Convert day-based database records into individual classes
            const savedClasses = response.data.flatMap(dayEntry =>
                (dayEntry.courses || []).map(course => ({
                    id: course._id,
                    day: dayEntry.day,
                    name: course.name,
                    code: course.courseCode || '',
                    time: course.time || '',
                    location: course.location || ''
                }))
            );

            setClasses(savedClasses);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to load timetable.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTimetable();
    }, []);

    // Save a new class to MongoDB
    const handleAddClass = async (e) => {
        e.preventDefault();

        try {
            setError('');

            const token = getToken();

            if (!token) {
                setError('Please log in to add a class.');
                return;
            }

            const response = await axios.post(
                'http://localhost:5000/api/timetable',
                newClass,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const dayEntry = response.data;
            const savedCourse = dayEntry.courses[
                dayEntry.courses.length - 1
            ];

            setClasses(previous => [
                ...previous,
                {
                    id: savedCourse._id,
                    day: dayEntry.day,
                    name: savedCourse.name,
                    code: savedCourse.courseCode || '',
                    time: savedCourse.time || '',
                    location: savedCourse.location || ''
                }
            ]);

            setShowForm(false);
            setNewClass({
                day: 'Monday',
                name: '',
                code: '',
                time: '',
                location: ''
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to save class.'
            );
        }
    };

    // Delete a saved class from MongoDB
    const handleDelete = async (id) => {
        try {
            setError('');

            const token = getToken();

            if (!token) {
                setError('Please log in to delete a class.');
                return;
            }

            await axios.delete(
                `http://localhost:5000/api/timetable/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setClasses(previous =>
                previous.filter(cls => cls.id !== id)
            );
        } catch (error) {
    console.error('Create class error:', error);

    res.status(500).json({
        message: error.message || 'Failed to save class.'
    });
}
    };

    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold dark:text-white mb-2">
                        My Timetable
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Manage your weekly schedule
                    </p>
                </div>

                <Button onClick={() => setShowForm(!showForm)}>
                    <Plus size={20} /> Add Class
                </Button>
            </div>

            {showForm && (
                <Card className="mb-8">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">
                        Add New Class
                    </h2>

                    <form
                        onSubmit={handleAddClass}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <input
                            type="text"
                            placeholder="Course Name"
                            required
                            className="input-field"
                            value={newClass.name}
                            onChange={e =>
                                setNewClass({
                                    ...newClass,
                                    name: e.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Course Code"
                            required
                            className="input-field"
                            value={newClass.code}
                            onChange={e =>
                                setNewClass({
                                    ...newClass,
                                    code: e.target.value
                                })
                            }
                        />

                        <select
                            className="input-field"
                            value={newClass.day}
                            onChange={e =>
                                setNewClass({
                                    ...newClass,
                                    day: e.target.value
                                })
                            }
                        >
                            {[
                                'Monday',
                                'Tuesday',
                                'Wednesday',
                                'Thursday',
                                'Friday'
                            ].map(day => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>

                        <input
                            type="time"
                            required
                            className="input-field"
                            value={newClass.time}
                            onChange={e =>
                                setNewClass({
                                    ...newClass,
                                    time: e.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Location"
                            className="input-field"
                            value={newClass.location}
                            onChange={e =>
                                setNewClass({
                                    ...newClass,
                                    location: e.target.value
                                })
                            }
                        />

                        <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setShowForm(false);
                                    setError('');
                                }}
                            >
                                Cancel
                            </Button>

                            <Button type="submit">
                                Save Class
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            {error && (
                <p className="text-red-500 mb-4">{error}</p>
            )}

            {loading && (
                <p className="text-slate-500 mb-4">
                    Loading timetable...
                </p>
            )}

            {!loading && !error && classes.length === 0 && (
                <p className="text-slate-500 mb-4">
                    No classes scheduled yet. Add your first class.
                </p>
            )}

            <div className="grid gap-6">
                {[
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday'
                ].map(day => {
                    const dayClasses = classes
                        .filter(cls => cls.day === day)
                        .sort((a, b) => a.time.localeCompare(b.time));

                    if (dayClasses.length === 0) return null;

                    return (
                        <div key={day}>
                            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                                <Calendar size={20} /> {day}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {dayClasses.map(cls => (
                                    <Card
                                        key={cls.id}
                                        className="card-hover relative group"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(cls.id)}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Delete class"
                                        >
                                            <Trash size={18} />
                                        </button>

                                        <h4 className="text-xl font-bold dark:text-white">
                                            {cls.name}
                                        </h4>

                                        <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-sm font-bold mb-3">
                                            {cls.code}
                                        </span>

                                        <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} />
                                                {cls.time}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} />
                                                {cls.location || 'Location not specified'}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TimetablePage;