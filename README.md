# Event Management System

A full-stack event management application built with React, Express, and SQLite.

## Features

- User Authentication & Authorization
- Event Management
- Group Management
- Real-time Chat
- Role-based Access Control
- User Profile Management

## Tech Stack

### Frontend
- React
- TypeScript
- Tailwind CSS
- React Query
- React Router
- Lucide React (Icons)

### Backend
- Express.js
- SQLite (better-sqlite3)
- JSON Web Tokens
- bcrypt.js
- Zod (Validation)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   JWT_SECRET=your-secret-key-here
   PORT=3000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── server/
│   ├── db/
│   │   └── schema.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── events.js
│   │   ├── groups.js
│   │   └── chat.js
│   └── index.js
├── src/
│   ├── components/
│   │   └── Navbar.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Users.tsx
│   │   ├── Events.tsx
│   │   ├── Groups.tsx
│   │   └── Chat.tsx
│   ├── utils/
│   │   └── api.ts
│   ├── App.tsx
│   └── main.tsx
└── package.json
```

## Testing

Run tests:
```bash
npm test
```

Generate coverage report:
```bash
npm run test:coverage
```

## Default Admin Account
Username: chris
Password: chris

## API Endpoints

### Authentication
- POST /api/auth/login
- POST /api/auth/register

### Users
- GET /api/users
- POST /api/users

### Events
- GET /api/events
- POST /api/events

### Groups
- GET /api/groups
- POST /api/groups

### Chat
- GET /api/chat/:eventId
- POST /api/chat