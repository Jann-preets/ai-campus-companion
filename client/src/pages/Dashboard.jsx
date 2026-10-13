import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Book, MessageSquare, User, LogOut, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from "../api";
const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dashboardData, setDashboardData] = useState({
        timetable: [],
        exams: [],
        notes: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (!userInfo) {
                navigate('/auth');
                return;
            }
            setUser(userInfo);

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                const { data } = await axios.get(`${API_BASE_URL}/api/dashboard`, config);
                setDashboardData(data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('userInfo');
                    navigate('/auth');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/auth');
    };

    if (loading) {
        return <div className="min-h-screen bg-college-navy flex items-center justify-center text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-college-navy p-6 md:p-12 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-college-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <header className="flex justify-between items-center mb-12 relative z-10">
                <div>
                    <h1 className="text-3xl font-bold text-white">
                        Hello, <span className="text-college-gold">{user?.username || 'Student'}</span>
                    </h1>
                    <p className="text-gray-400">Welcome back to your campus portal.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-white/10 p-2 rounded-full border border-white/20">
                        <User className="text-white" />
                    </div>
                    <button onClick={handleLogout} className="text-white/60 hover:text-white transition-colors">
                        <LogOut size={20} />
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
                <DashboardCard
                    title="Timetable"
                    icon={<Calendar />}
                    color="bg-blue-500/20"
                    desc={`${dashboardData.timetable.length} classes scheduled`}
                    delay={0}
                    onClick={() => navigate('/timetable')}
                />
                <DashboardCard
                    title="Notes"
                    icon={<Book />}
                    color="bg-green-500/20"
                    desc={`${dashboardData.notes.length} documents uploaded`}
                    delay={0.1}
                    onClick={() => navigate('/notes')}
                />
                <DashboardCard
                    title="AI Tutor"
                    icon={<MessageSquare />}
                    color="bg-purple-500/20"
                    desc="Ask a question"
                    delay={0.2}
                    onClick={() => navigate('/ai-tutor')}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
                {/* Timetable Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass-card min-h-[300px]"
                >
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-college-gold" /> Upcoming Classes
                    </h2>
                    <div className="space-y-4">
                        {dashboardData.timetable.length > 0 ? (
                            dashboardData.timetable.map((dayItem) => (
                                <div key={dayItem._id} className="bg-white/5 p-4 rounded-xl border border-white/10">
                                    <h3 className="text-college-gold font-bold mb-2">{dayItem.day}</h3>
                                    <div className="space-y-2">
                                        {dayItem.courses.map((course, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-sm">
                                                <span className="font-semibold text-white">{course.name} ({course.courseCode})</span>
                                                <div className="flex gap-3 text-gray-400">
                                                    <span className="flex items-center gap-1"><Clock size={14} /> {course.time}</span>
                                                    <span className="flex items-center gap-1"><MapPin size={14} /> {course.location}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No classes scheduled.</p>
                        )}
                    </div>
                </motion.div>

                {/* Exams Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card min-h-[300px]"
                >
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Book size={20} className="text-college-gold" /> Upcoming Exams
                    </h2>
                    <div className="space-y-4">
                        {dashboardData.exams.length > 0 ? (
                            dashboardData.exams.map((exam) => (
                                <div key={exam._id} className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div>
                                        <h4 className="font-bold text-white">{exam.courseName}</h4>
                                        <p className="text-sm text-gray-400">{exam.location} • {exam.notes}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-college-gold font-bold">{new Date(exam.date).toLocaleDateString()}</div>
                                        <div className="text-xs text-gray-500">{new Date(exam.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No exams scheduled.</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const DashboardCard = ({ title, icon, color, desc, delay, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        onClick={onClick}
        className={`glass-card p-6 rounded-2xl border border-white/10 hover:border-college-gold/50 cursor-pointer group bg-white/5`}
    >
        <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <span className="text-white">{icon}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-gray-400">{desc}</p>
    </motion.div>
);

export default Dashboard;
