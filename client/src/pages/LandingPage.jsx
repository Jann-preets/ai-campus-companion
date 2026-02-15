import React, { Suspense } from 'react';
import Hero3D from '../components/Hero3D';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="relative min-h-screen overflow-hidden text-white flex flex-col justify-center">
            <Suspense fallback={null}>
                <Hero3D />
            </Suspense>

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-6"
                >
                    <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-medium tracking-wide text-college-gold">
                        AI-POWERED EDUCATION
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                        The Future of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-college-gold to-yellow-200">
                            Campus Life
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-lg">
                        Manage your schedule, exams, and notes with an intelligent AI companion designed for modern students.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/auth" className="bg-college-gold text-college-navy px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center gap-2">
                            Get Started <ArrowRight size={20} />
                        </Link>
                        <Link to="/features" className="px-8 py-4 rounded-full font-bold border border-white/30 hover:bg-white/10 transition-colors backdrop-blur-sm">
                            Learn More
                        </Link>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hidden md:grid grid-cols-2 gap-4"
                >
                    <FeatureCard icon={<Calendar size={32} />} title="Smart Timetable" desc="AI-optimized scheduling" />
                    <FeatureCard icon={<BookOpen size={32} />} title="Notes Manager" desc="Organize & search instantly" delay={0.1} />
                    <FeatureCard icon={<MessageSquare size={32} />} title="AI Tutor" desc="24/7 Context-aware help" delay={0.2} />
                    <div className="bg-gradient-to-br from-college-gold to-yellow-600 rounded-2xl p-6 flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
                        <h3 className="text-2xl font-bold text-college-navy text-center">Join 5000+ Students</h3>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 + delay }}
        className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer"
    >
        <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3 rounded-full w-fit mb-4 group-hover:scale-110 transition-transform text-college-gold">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{desc}</p>
    </motion.div>
);

export default LandingPage;
