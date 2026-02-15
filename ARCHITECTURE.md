# AI Campus Companion - Architecture & Design Document

## 1. Overview
A full-stack, production-grade college portal application built with the MERN stack (MongoDB, Express, React, Node.js).
Featuring a modern, 3D-animated UI with glassmorphism, responsive design, and AI chatbot integration.

## 2. Tech Stack

### Frontend
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS + custom glassmorphism utilities
- **Animations:** Framer Motion (page transitions, interactions)
- **3D Graphics:** Three.js + React Three Fiber (@react-three/drei)
- **Icons:** Lucide React
- **Routing:** React Router DOM (v6)
- **State Management:** React Context API + Hooks (or Zustand if needed)
- **HTTP Client:** Axios

### Backend
- **Server:** Node.js + Express
- **Database:** MongoDB Atlas (Cloud) + Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens) + bcryptjs (for password hashing)
- **Middleware:** CORS, Error Handling, Auth Middleware
- **AI Integration:** OpenAI API / Gemini API (placeholder integration ready)
- **File Handling:** Multer (for note uploads)

## 3. Database Schema (MongoDB/Mongoose)

### Users Collection
- `username`: String (Unique)
- `email`: String (Unique)
- `password`: String (Hashed)
- `role`: String (Enum: 'student', 'admin') - Default: 'student'
- `profile`: Object (Bio, Year, Major, Avatar URL)
- `createdAt`: Date

### Timetable Collection
- `userId`: ObjectId (Ref: User)
- `day`: String (Monday, Tuesday, etc.)
- `courses`: Array of Objects
  - `courseCode`: String
  - `name`: String
  - `time`: String
  - `location`: String

### Exams Collection
- `userId`: ObjectId (Ref: User)
- `courseName`: String
- `date`: Date
- `location`: String
- `notes`: String

### Notes Collection
- `userId`: ObjectId (Ref: User)
- `title`: String
- `subject`: String
- `content`: String (or file URL/path)
- `tags`: Array of Strings
- `createdAt`: Date

### Chats Collection
- `userId`: ObjectId (Ref: User)
- `messages`: Array of Objects
  - `sender`: String ('user' | 'bot')
  - `text`: String
  - `contextIds`: Array of Strings (Ref: Notes used)
  - `timestamp`: Date

## 4. API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and return JWT
- `GET /api/auth/me` - Get current user profile (Protected)

### Dashboard (Timetables & Exams)
- `GET /api/dashboard/timetable` - Get user's timetable
- `POST /api/dashboard/timetable` - Add/Update timetable entry
- `GET /api/dashboard/exams` - Get user's upcoming exams
- `POST /api/dashboard/exams` - Add an exam

### Notes
- `GET /api/notes` - Get all notes for user
- `POST /api/notes` - Create a new note (with upload support)
- `DELETE /api/notes/:id` - Delete a note

### AI Chat
- `POST /api/chat` - Send query to AI (context-aware from notes)

## 5. UI/UX Strategy

### Visual Theme
- **Primary Colors:** Deep Navy Blue (`#0f172a`), Vibrant Accent Gold/Orange (`#f59e0b`), Soft White/Gray text.
- **Glassmorphism:** `backdrop-filter: blur(12px)`, semi-transparent backgrounds (`bg-white/10`).
- **Typography:** Modern sans-serif (Inter or similar).
- **3D Elements:**
  - Hero section: Floating geometric shapes representing knowledge/connections.
  - Interactive cards on dashboard.

### User Flow
1. **Landing Page:** Hero section with 3D animation, Features overview, Login/Signup CTAs.
2. **Auth:** Split screen or modal with smooth transitions between Login and Register.
3. **Dashboard:** Greeting, Quick stats (Next class, Exams coming up), Shortcuts to modules.
4. **Modules:**
   - **Timetable:** Interactive weekly calendar view.
   - **Notes:** Masonry, Grid, or List layout of notes with search.
   - **Chatbot:** Fixed or floating chat interface.
   - **Profile:** Settings and user details.

## 6. Implementation Steps
1. **Project Setup:** Monorepo-style structure (`/client`, `/server`) in the root.
2. **Backend Core:** Express server, MongoDB connection, Auth routes.
3. **Frontend Core:** React setup, Tailwind config, Theme provider.
4. **Components:** Build reusable UI components (Button, Card, Input).
5. **Pages:** Develop Landing, Auth, Dashboard skeleton.
6. **Feature Implementation:** Connect frontend to backend for Auth, Timetable, Notes.
7. **3D Integration:** Add R3F canvas to landing/dashboard.
8. **Final Polish:** Animations, Transitions, Responsive checks.
