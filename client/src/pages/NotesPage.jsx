import { useState, useEffect } from 'react';
import { Card, Button } from '../components/ui';
import { FileText, Download, Trash, Plus } from 'lucide-react';
import axios from 'axios';

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [modal, setModal] = useState({
        show: false,
        title: '',
        subject: ''
    });

    const getToken = () => {
        const userInfo = JSON.parse(
            localStorage.getItem('userInfo') || '{}'
        );
        return userInfo.token;
    };

    const fetchNotes = async () => {
        try {
            setError('');
            const token = getToken();

            if (!token) {
                setError('Please log in to view your notes.');
                return;
            }

            const response = await axios.get(
                'http://localhost:5000/api/notes',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNotes(response.data);
        } catch (err) {
            setError(
                err.response?.data?.message || 'Failed to load notes.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleAddNote = async () => {
        if (!modal.title.trim() || !modal.subject.trim()) {
            setError('Please enter both a title and subject.');
            return;
        }

        try {
            const token = getToken();

            if (!token) {
                setError('Please log in to add a note.');
                return;
            }

            const response = await axios.post(
                'http://localhost:5000/api/notes',
                {
                    title: modal.title.trim(),
                    subject: modal.subject.trim()
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNotes(previous => [response.data, ...previous]);
            setModal({ show: false, title: '', subject: '' });
            setError('');
        } catch (err) {
            setError(
                err.response?.data?.message || 'Failed to save note.'
            );
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = getToken();

            if (!token) {
                setError('Please log in to delete a note.');
                return;
            }

            await axios.delete(
                `http://localhost:5000/api/notes/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setNotes(previous =>
                previous.filter(note => note._id !== id)
            );
            setError('');
        } catch (err) {
            setError(
                err.response?.data?.message || 'Failed to delete note.'
            );
        }
    };

    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold dark:text-white mb-2">
                        My Notes
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Organize and access your study materials
                    </p>
                </div>

                <Button
                    onClick={() => {
                        setError('');
                        setModal({
                            show: true,
                            title: '',
                            subject: ''
                        });
                    }}
                >
                    <Plus size={20} /> Upload Note
                </Button>
            </div>

            {modal.show && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl">
                        <h2 className="text-xl font-bold mb-4 dark:text-white">
                            Upload New Note
                        </h2>

                        <div className="space-y-4">
                            <input
                                placeholder="Note Title"
                                className="input-field"
                                value={modal.title}
                                onChange={e =>
                                    setModal({
                                        ...modal,
                                        title: e.target.value
                                    })
                                }
                            />

                            <input
                                placeholder="Subject"
                                className="input-field"
                                value={modal.subject}
                                onChange={e =>
                                    setModal({
                                        ...modal,
                                        subject: e.target.value
                                    })
                                }
                            />

                            <div className="flex justify-end gap-2 mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setModal({
                                            show: false,
                                            title: '',
                                            subject: ''
                                        });
                                        setError('');
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button onClick={handleAddNote}>
                                    Upload
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            {error && (
                <p className="text-red-500 mb-4">{error}</p>
            )}

            {loading && (
                <p className="text-slate-500 mb-4">Loading notes...</p>
            )}

            {!loading && !error && notes.length === 0 && (
                <p className="text-slate-500 mb-4">
                    No notes yet. Add your first note.
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map(note => (
                    <Card
                        key={note._id}
                        className="card-hover group relative"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <FileText size={24} />
                            </div>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    type="button"
                                    className="p-2 text-slate-400 hover:text-primary transition-colors"
                                    title="Download is not available yet"
                                    onClick={() =>
                                        setError(
                                            'File downloads are not available yet.'
                                        )
                                    }
                                >
                                    <Download size={18} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(note._id)}
                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                    title="Delete note"
                                >
                                    <Trash size={18} />
                                </button>
                            </div>
                        </div>

                        <h3 className="font-bold text-lg dark:text-white mb-1 truncate">
                            {note.title}
                        </h3>

                        <p className="text-sm text-primary font-medium mb-3">
                            {note.subject}
                        </p>

                        <div className="flex justify-between items-center text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-700 pt-3">
                            <span>Note</span>
                            <span>
                                {note.createdAt
                                    ? new Date(note.createdAt).toLocaleDateString()
                                    : ''}
                            </span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default NotesPage;