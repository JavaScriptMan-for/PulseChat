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


export const io = new Server();


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