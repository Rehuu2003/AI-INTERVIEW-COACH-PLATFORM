# AI Interview Backend

Minimal Express + MongoDB backend for the AI Interview project.

Features implemented:
- Express server with routes for auth, interviews, analytics
- JWT-based authentication
- MongoDB models for users and interviews
- Simple AI service placeholder for follow-up question generation and transcript analysis

Getting started:

1. Copy `.env.example` to `.env` and set `MONGODB_URI` and `JWT_SECRET`.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Run in dev:

```bash
npm run dev
```

The server listens on `PORT` (default 4000) and exposes APIs under `/api/*`.
