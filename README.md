# AI Campus Companion

A full-stack, production-grade college portal application built with the MERN stack (MongoDB, Express, React, Node.js).
Featuring a modern, 3D-animated UI with glassmorphism, responsive design, and AI chatbot integration.

## Features
- **3D Animated Landing Page** using React Three Fiber.
- **Glassmorphism UI** with Tailwind CSS.
- **Authentication** (Login/Signup) with JWT & MongoDB.
- **Student Dashboard** with Timetable, Exams, Notes, and AI Chat.
- **Full Backend** with Express, Mongoose, and REST APIs.

## Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account (for database)

## Setup Instructions

1.  **Clone the repository** (if you haven't already).
2.  **Install Dependencies**:
    ```bash
    npm install
    cd server && npm install
    cd ../client && npm install
    ```
    Or simply run:
    ```bash
    npm run install-all
    ```

3.  **Configure Environment Variables**:
    - Go to `server/.env` and replace `MONGO_URI` with your actual MongoDB connection string.
    - Set `JWT_SECRET` to a secure string.
    - Set `AI_API_KEY` if you plan to integrate OpenAI/Gemini.

4.  **Run the Application**:
    From the root directory:
    ```bash
    npm start
    ```
    This will launch both the backend (port 5000) and frontend (port 5173/3000) concurrently.

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Framer Motion, Three.js
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT, Bcrypt
