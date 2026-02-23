import { Request, Response } from "express";
import { io } from "server";

type AskType = (res: any) => void;

class ChatController {
  public async connect_chat(req: Request, res: Response): Promise<any> {
      io.on('connection', (socket) => {
        console.log("Connect", socket.id)


        socket.on('join', (chatId: string, ask: AskType) => {
         if(!chatId) return ask({ ok: false, message: "Не удалось подсоединится к чату" })

          try {
            const room = `chat_${chatId}`;

            socket.join(room)

            ask({ ok: true, message: "Успешное подсоединение", socketId: socket.id, chatId })

            console.log(`Socket ${socket.id} joined room ${room}`);

          } catch (error) {
            console.error(error);
            ask({ ok: false, message: "Ошибка сервера" })
          }
        })
      })

  }
}


export const chat_controller = new ChatController();
