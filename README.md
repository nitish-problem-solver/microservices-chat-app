# 🗨️ Microservices Chat Application

A real-time **room-based chat application** built using **Microservices Architecture** with  
**Node.js, Socket.IO, MongoDB, gRPC, React, Zustand, Docker**.

This project demonstrates **real-world backend + frontend + DevOps concepts** and is suitable for interviews and production-ready learning.

---

## 🚀 Features

### 🔐 Authentication Service
- User signup & login
- JWT-based authentication
- gRPC server to validate tokens
- MongoDB for user persistence

### 💬 Chat Service
- Room-based group chat (multi-user)
- Real-time messaging with Socket.IO
- Message persistence in MongoDB
- Join / leave rooms
- Fetch message history per room
- JWT authentication via gRPC (Auth Service)

### 🎨 Frontend
- React + Vite
- Zustand for state management
- Tailwind CSS + Shadcn UI
- Real-time message updates
- Room switching with history
- Message alignment (current user right, others left)
- 12-hour timestamp format
- Username derived from email

---




## 🔐 Environment Variables

### Auth Service (`backend/auth-service/.env`)
```env
PORT=4001
MONGO_URI=mongodb://mongo:27017/auth
JWT_SECRET=supersecret

Chat Service (backend/chat-service/.env)
PORT=4002
MONGO_URI=mongodb://mongo:27017/chat
AUTH_GRPC_URL=auth-service:50051
JWT_SECRET=supersecret



▶️ Run Locally (Without Docker)
Start Auth Service
cd backend/auth-service
npm install
npm run dev

Start Chat Service
cd backend/chat-service
npm install
npm run dev

Start Frontend
cd frontend/chat-ui
npm install
npm run dev
