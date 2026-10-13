import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from "../api";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
            const { data } = await axios.post(`${API_BASE_URL}${endpoint}`, formData);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-college-navy relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-college-blue/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-college-gold/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card bg-white/5 border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-xl"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-college-gold">
                            {isLogin ? 'Welcome Back' : 'Join Campus'}
                        </h2>
                        <p className="text-gray-400 text-sm mt-2">
                            {isLogin ? 'Access your dashboard' : 'Create your student account'}
                        </p>
                    </div>

                    {error && <div className="text-red-500 text-sm text-center mb-4 bg-red-500/10 p-2 rounded">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-college-gold transition-colors"
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-college-gold transition-colors"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-college-gold transition-colors"
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="w-full bg-gradient-to-r from-college-gold to-yellow-600 text-college-navy font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/30 transition-all transform active:scale-95 flex justify-center items-center gap-2">
                            {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthPage;
