import { config } from "dotenv";
config();
import express, { Express } from "express";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";

import auth_route from "@routes/auth.route";
import contacts_route from "@routes/contacts.route";

import { chat_controller } from "@controllers/chat.controller"

// consts
const BASE_URL = process.env.BASE_URL || "";

const app: Express = express();
const httpServer = createServer(app);


export const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});



chat_controller.connect_chat()
chat_controller.send_message()

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