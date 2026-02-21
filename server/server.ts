import { config } from "dotenv";
config();
import express, { Express } from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

import auth_route from "@routes/auth.route";
import contacts_route from "@routes/contacts.route";

// consts
const BASE_URL = process.env.BASE_URL || "";

const app: Express = express();
const httpServer = createServer(app);


export const io = new Server(httpServer, {
    cors: {
        origin: "*", 
    }
});

io.on("connection", (socket) => {
  console.log("Socket подключён:", socket.id);

  socket.on("join", (chat_id) => {
    socket.join(chat_id);
    console.log(`Socket ${socket.id} вошёл в комнату ${chat_id}`);

    // Уведомляем других
    socket.to(chat_id).emit("chat:user_joined", {
      user_socket: socket.id,
      chat_id
    });
  });
});

app.use(express.json());

// Routes
app.use('/api', auth_route);
app.use('/api', contacts_route);

// Запуск сервера
httpServer.listen(5000, async () => {
    console.log("Сервер запущен");

    await mongoose.connect(BASE_URL)
        .then(() => {
            console.log("Database started");
        })
        .catch((e) => {
            console.log("Database Error", e);
        });
});