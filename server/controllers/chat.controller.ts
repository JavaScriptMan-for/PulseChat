import Message from "@models/Messages.model";
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
      socket.on("send_message", async (data) => {
        const room = `chat_${data.chat_id}`;

        console.log(data)

        const date_obj = new Date();
        const nullable = '0'

        const date = `${date_obj.getDate() < 9 ? nullable : ''}${date_obj.getDate()}.${date_obj.getMonth() + 1 < 9 ? nullable : ''}${date_obj.getMonth() + 1}.${date_obj.getFullYear()}`
        const time = `${date_obj.getHours() < 9 ? nullable : ''}${date_obj.getHours()}:${date_obj.getMinutes() < 9 ? nullable : ''}${date_obj.getMinutes()}`

        io.to(room).emit("new_message", {
          chat_id: data.chat_id,
          message: data.message,
          date: date,
          time: time,
          socketId: data.socketId
        });

        if(!data.chat_id || !data.message || !data.socketId || !data.userId) {
          console.error("Сообщение не отправилось")
          return
        }
        const message = new Message({ chat_id: data.chat_id, user_id: data.userId, date, time, message: data.message })
        await message.save()
      });
    });
  }

  public async get_messages(req: Request, res: Response): Promise<any> {
    try {

    const { chat_id } = req.params

    const messages = await Message.find({ chat_id })
    if(!messages) return res.status(400).json({message: "Сообщение не найдено"})

    res.status(200).json({message: "Сообщения успешно найдены", data: { messages }})
    } catch (error) {
      console.error(error);
      res.status(500).json({message: 'Ошибка сервера'})
    }
  }
}

export const chat_controller = new ChatController();
