import { useState } from 'react';
import { Card, Button } from '../components/ui';
import { Calendar, Plus, Trash, Clock, MapPin } from 'lucide-react';

const TimetablePage = () => {
    // Mock data - would come from API in real usage
    const [classes, setClasses] = useState([
        { id: 1, day: 'Monday', name: 'Algorithms', code: 'CS301', time: '10:00 AM', location: 'Hall A' },
        { id: 2, day: 'Monday', name: 'Linear Algebra', code: 'MATH202', time: '02:00 PM', location: 'Room 304' },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [newClass, setNewClass] = useState({
        day: 'Monday',
        name: '',
        code: '',
        time: '',
        location: ''
    });

    const handleAddClass = (e) => {
        e.preventDefault();
        setClasses([...classes, { id: Date.now(), ...newClass }]);
        setShowForm(false);
        setNewClass({ day: 'Monday', name: '', code: '', time: '', location: '' });
    };

    const handleDelete = (id) => {
        setClasses(classes.filter(c => c.id !== id));
    };

    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold dark:text-white mb-2">My Timetable</h1>
                    <p className="text-slate-500 dark:text-slate-400">Manage your weekly schedule</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)}>
                    <Plus size={20} /> Add Class
                </Button>
            </div>

            {showForm && (
                <Card className="mb-8">
                    <h2 className="text-xl font-bold mb-4 dark:text-white">Add New Class</h2>
                    <form onSubmit={handleAddClass} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text" placeholder="Course Name" required
                            className="input-field"
                            value={newClass.name}
                            onChange={e => setNewClass({ ...newClass, name: e.target.value })}
                        />
                        <input
                            type="text" placeholder="Course Code" required
                            className="input-field"
                            value={newClass.code}
                            onChange={e => setNewClass({ ...newClass, code: e.target.value })}
                        />
                        <select
                            className="input-field"
                            value={newClass.day}
                            onChange={e => setNewClass({ ...newClass, day: e.target.value })}
                        >
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                        <input
                            type="time" required
                            className="input-field"
                            value={newClass.time}
                            onChange={e => setNewClass({ ...newClass, time: e.target.value })}
                        />
                        <input
                            type="text" placeholder="Location"
                            className="input-field"
                            value={newClass.location}
                            onChange={e => setNewClass({ ...newClass, location: e.target.value })}
                        />
                        <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                            <Button type="submit">Save Class</Button>
                        </div>
                    </form>
                </Card>
            )}

            <div className="grid gap-6">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
                    const dayClasses = classes.filter(c => c.day === day).sort((a, b) => a.time.localeCompare(b.time));
                    if (dayClasses.length === 0) return null;

                    return (
                        <div key={day}>
                            <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                                <Calendar size={20} /> {day}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {dayClasses.map(cls => (
                                    <Card key={cls.id} className="card-hover relative group">
                                        <button
                                            onClick={() => handleDelete(cls.id)}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash size={18} />
                                        </button>
                                        <h4 className="text-xl font-bold dark:text-white">{cls.name}</h4>
                                        <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-sm font-bold mb-3">{cls.code}</span>
                                        <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} /> {cls.time}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} /> {cls.location}
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
