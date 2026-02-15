import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, LogIn, LayoutDashboard, User, Sun, Moon, LogOut } from 'lucide-react';

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthPage = location.pathname === '/auth';

    // Check if user is logged in
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/auth');
    };

    if (isAuthPage) return null;

    return (
        <nav className="glass-effect sticky top-0 w-full z-50 px-6 py-4 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-primary group font-bold">
                    <GraduationCap className="h-8 w-8 text-secondary group-hover:rotate-12 transition-transform" />
                    <span className="text-xl tracking-tight text-slate-800 dark:text-white">
                        Campus<span className="text-secondary">Companion</span>
                    </span>
                </Link>

                <div className="flex items-center space-x-6">
                    {userInfo && (
                        <>
                            <NavLink to="/dashboard" icon={<LayoutDashboard size={20} />} text="Dashboard" />
                            <div className="h-6 w-px bg-slate-300 dark:bg-slate-700"></div>
                        </>
                    )}

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {userInfo ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-full text-primary font-bold">
                                    {userInfo.username?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
                            >
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/auth" className="btn btn-primary shadow-lg shadow-primary/30">
                            <span>Login</span>
                            <LogIn size={18} />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, icon, text }) => (
    <Link
        to={to}
        className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors font-medium relative group"
    >
        {icon}
        <span>{text}</span>
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
    </Link>
);

export default Navbar;
