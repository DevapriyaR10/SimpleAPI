# RBAC Task Manager

A **Role-Based Access Control (RBAC) Task Manager** built with **Node.js, Express, MongoDB, and React**.  
Supports **JWT authentication**, **admin/user roles**, and a **4-page React frontend** (Landing, Login, Register, Dashboard).  
Includes **Swagger API documentation** and scalable project structure.

backend/
│── src/
│   ├── config/
│   │   ├── db.js
│   │   └── swagger.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── task.controller.js
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── task.routes.js
│   └── app.js
│   └──server.js
│── .env
│── package.json
│── README.md

frontend/
│── src/
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── services/api.js
│   ├── App.jsx
│   └── main.jsx
│── index.html
│── package.json
│── vite.config

## Features

### Backend
- User **registration & login** with password hashing
- **JWT authentication**
- **Role-based access** (`user` vs `admin`)
- CRUD APIs for **Tasks**
- **Admin-only delete**
- **Swagger API docs** (`/api-docs`)
- Modular and scalable project structure

### Frontend
- 4 pages: **Landing, Login, Register, Dashboard**
- Role-based dashboard content
- JWT token handling
- Display tasks from backend
- Error/success messages handling

---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Frontend:** React, Vite, Axios, React Router
- **API Docs:** Swagger (OpenAPI)

---

## Local Setup

### Backend

```bash
cd backend
npm install
# Create .env file:
# MONGO_URI=<your-mongodb-uri>
# JWT_SECRET=<your-secret>
npm run dev
Backend runs on http://localhost:5000
Swagger docs: http://localhost:5000/api-docs

Frontend
cd frontend
npm install
npm run dev
Frontend runs on http://localhost:3000

Deployed Link: 
