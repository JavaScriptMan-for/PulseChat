import { Request, Response } from "express";
import { io } from "server";

type AskType = (res: any) => void;

class ChatController {
  public async connect_chat(): Promise<any> {
    console.log("IO");
    io.on("connection", (socket) => {
      socket.on("join", (chatId: string, ask: AskType) => {
        if (!chatId)
          return ask({ ok: false, message: "Не удалось подсоединится к чату" });

        try {
          const room = `chat_${chatId}`;

          socket.join(room);

          ask({
            ok: true,
            message: "Успешное подсоединение",
            socketId: socket.id,
            chatId,
          });

          console.log(`Socket ${socket.id} joined room ${room}`);
        } catch (error) {
          console.error(error);
          ask({ ok: false, message: "Ошибка сервера" });
        }
      });
    });
  }

  public async send_message() {
    io.on("connection", (socket) => {
      socket.on("send_message", (data) => {
        const room = `chat_${data.chat_id}`;

        const date_obj = new Date();
        const nullable = '0'

        io.to(room).emit("new_message", {
          chat_id: data.chat_id,
          message: data.message,
          date: `${date_obj.getDate()},${date_obj.getMonth() - 1}.${date_obj.getFullYear} ${date_obj.getTime()}`,
          time: `${date_obj.getHours() < 9 ? nullable : ''}${date_obj.getHours()}:${date_obj.getMinutes() < 9 ? nullable : ''}${date_obj.getMinutes()}`,
          socketId: data.socketId
        });
      });
    });
  }
}

export const chat_controller = new ChatController();
