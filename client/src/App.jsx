import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

import TimetablePage from './pages/TimetablePage';
import NotesPage from './pages/NotesPage';
import AITutorPage from './pages/AITutorPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
    return (
        <ThemeProvider>
            <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
                <Navbar />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/timetable" element={<TimetablePage />} />
                    <Route path="/notes" element={<NotesPage />} />
                    <Route path="/ai-tutor" element={<AITutorPage />} />
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;
