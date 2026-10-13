# AI Campus Companion

AI Campus Companion is a full-stack college portal designed to help students organize their academic activities in one place. Built using the MERN stack, it combines a modern, responsive interface with authentication, timetable management, notes, and an AI-powered study assistant.

## Features

- **Modern UI:** Responsive interface built with React and Tailwind CSS, with animations and visual effects.
- **User Authentication:** Login and signup functionality using JWT authentication and MongoDB.
- **Student Dashboard:** A centralized dashboard for accessing academic tools.
- **Timetable Management:** Create and manage class schedules.
- **Notes Management:** Create and manage study notes.
- **AI Study Assistant:** AI-powered chat functionality to support student learning.
- **REST APIs:** Backend endpoints built with Express.js and Node.js.
- **Database Integration:** MongoDB with Mongoose for data persistence.

## Tech Stack

**Frontend**
- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Authentication & Security**
- JSON Web Tokens (JWT)
- bcrypt

## Prerequisites

- Node.js and npm
- A MongoDB Atlas account or another accessible MongoDB instance
- AI API credentials if required by the AI assistant configuration

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Jann-preets/ai-campus-companion.git
cd ai-campus-companion
```

### 2. Install Dependencies

Install the root dependencies if your project uses them:

```bash
npm install
```

Install the backend dependencies:

```bash
cd server
npm install
```

Install the frontend dependencies:

```bash
cd ../client
npm install
cd ..
```

Alternatively, use the root-level installation script if `install-all` is configured in the root `package.json`:

```bash
npm run install-all
```

### 3. Configure Environment Variables

Create a `.env` file inside the `server/` directory.

Add the environment variables required by your backend configuration. For example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
AI_API_KEY=your_ai_provider_api_key
```

Replace the placeholder values with your actual credentials. Use the AI API key variable name expected by your AI provider integration.

**Security note:** Never commit `.env` files, database credentials, API keys, or JWT secrets to GitHub.

### 4. Run the Application

From the project root, run:

```bash
npm start
```

This works if the root `package.json` defines a start script that launches both the frontend and backend.

Otherwise, start the backend and frontend in separate terminal windows.

**Backend:**

```bash
cd server
npm start
```

**Frontend:**

```bash
cd client
npm run dev
```

Use the local URLs displayed in your terminal to open the application.

## Project Structure

```text
ai-campus-companion/
├── client/
│   └── src/
│       └── pages/
│           ├── NotesPage.jsx
│           └── TimetablePage.jsx
├── server/
│   ├── controllers/
│   │   ├── aiController.js
│   │   ├── noteController.js
│   │   └── timetableController.js
│   ├── routes/
│   │   ├── noteRoutes.js
│   │   └── timetableRoutes.js
│   ├── index.js
│   └── package.json
├── .gitignore
└── README.md
```

## Future Improvements

- Deploy the frontend and backend to production hosting platforms.
- Improve timetable validation and error handling.
- Expand AI-powered study assistance and academic planning features.

## Author

**Janar Preethika**

GitHub: [Jann-preets](https://github.com/Jann-preets)
