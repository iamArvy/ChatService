# Chat Service

The **Chat Service** is a real-time messaging microservice built with **NestJS**, supporting both **GraphQL** and **REST API** interfaces. It allows users to initiate private conversations or group chats, send messages, delete/update them, and retrieve conversation histories. The service integrates **WebSocket (Socket.io)** for live chat and uses **Swagger** and **Apollo Playground** for API documentation and testing.

---

## 🚀 Features

* 🔁 Real-time messaging using Socket.io
* 📦 Create 1-on-1 or group conversations
* 📨 Send, edit, and delete messages
* 📜 Retrieve list of conversations and message history
* ⚙️ REST API and GraphQL support
* 📘 API documentation via Swagger and Apollo Playground
* 🧩 Modular and scalable microservice architecture

---

## 🛠️ Tech Stack

* **Framework**: NestJS
* **Realtime**: Socket.io
* **API**: REST, GraphQL (Apollo)
* **ORM**: Prisma & Mongoose
* **Databases**: PostgreSQL (for relational data), MongoDB (for document-based data)
* **API Docs**: Swagger (REST), Apollo Playground (GraphQL)

---

## 📦 Installation

```bash
# Clone the repository
git clone <repo-url>
cd chat-service

# Install dependencies using pnpm (preferred)
pnpm install

# Or using npm
yarn install
npm install
```

---

## 🧪 Running the Service

```bash
# Start the dev server
pnpm start:dev

# Or with Docker
docker-compose up --build
```

---

## 📚 API Documentation

* **Swagger UI** (REST): [http://localhost:3000/api](http://localhost:3000/api)
* **Apollo Playground** (GraphQL): [http://localhost:3000/graphql](http://localhost:3000/graphql)

---

## 🗃️ Folder Structure (Simplified)

```
chat-service/
├── src/
│   ├── gateway/         # WebSocket Gateway
│   ├── message/         # Message logic
│   ├── conversation/    # Conversations
│   ├── graphql/         # GraphQL resolvers & schema
│   ├── rest/            # REST controllers
│   ├── prisma/          # Prisma setup (Postgres)
│   ├── mongoose/        # Mongoose models (MongoDB)
│   └── app.module.ts
├── docker-compose.yml
└── README.md
```

---

## 🧱 Future Plans

* ✅ Integrate message read receipts
* ✅ Support file/media attachments
* ✅ Add SQS/Kafka for message queuing
