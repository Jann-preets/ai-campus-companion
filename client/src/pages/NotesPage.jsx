import { useState } from 'react';
import { Card, Button } from '../components/ui';
import { FileText, Download, Trash, Plus } from 'lucide-react';

const NotesPage = () => {
    // Mock user notes
    const [notes, setNotes] = useState([
        { id: 1, title: 'Week 1 - Intro to Graphs', subject: 'Algorithms', size: '2.4 MB', date: '2023-10-15' },
        { id: 2, title: 'Chapter 4 Notes', subject: 'History of Art', size: '1.1 MB', date: '2023-10-12' },
        { id: 3, title: 'Lecture 12 - Linear Algebra', subject: 'Mathematics', size: '5.6 MB', date: '2023-10-10' }
    ]);

    const [modal, setModal] = useState({ show: false, title: '', subject: '' });

    const handleAddNote = () => {
        if (!modal.title || !modal.subject) return;

        const newNote = {
            id: Date.now(),
            title: modal.title,
            subject: modal.subject,
            size: '0.5 MB',
            date: new Date().toISOString().split('T')[0]
        };

        setNotes([newNote, ...notes]);
        setModal({ show: false, title: '', subject: '' });
    };

    const handleDelete = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return (
        <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold dark:text-white mb-2">My Notes</h1>
                    <p className="text-slate-500 dark:text-slate-400">Organize and access your study materials</p>
                </div>
                <Button onClick={() => setModal({ ...modal, show: true })}>
                    <Plus size={20} /> Upload Note
                </Button>
            </div>

            {modal.show && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl">
                        <h2 className="text-xl font-bold mb-4 dark:text-white">Upload New Note</h2>
                        <div className="space-y-4">
                            <input
                                placeholder="Note Title"
                                className="input-field"
                                value={modal.title}
                                onChange={e => setModal({ ...modal, title: e.target.value })}
                            />
                            <input
                                placeholder="Subject"
                                className="input-field"
                                value={modal.subject}
                                onChange={e => setModal({ ...modal, subject: e.target.value })}
                            />
                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" onClick={() => setModal({ show: false })}>Cancel</Button>
                                <Button onClick={handleAddNote}>Upload</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map(note => (
                    <Card key={note.id} className="card-hover group relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                <FileText size={24} />
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                                    <Download size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(note.id)}
                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash size={18} />
                                </button>
                            </div>
                        </div>

                        <h3 className="font-bold text-lg dark:text-white mb-1 truncate">{note.title}</h3>
                        <p className="text-sm text-primary font-medium mb-3">{note.subject}</p>

                        <div className="flex justify-between items-center text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-700 pt-3">
                            <span>{note.size}</span>
                            <span>{note.date}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default NotesPage;
