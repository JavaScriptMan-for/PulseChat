import { Request, Response } from "express";
import { io } from "server";

class ChatController {
  public async connect_chat(req: Request, res: Response): Promise<any> {
    try {
      const chat_id = req.params.id;

      if (!chat_id) {
        return res.status(400).json({ message: "chat_id не передан" });
      }

      // Отправляем событие всем участникам комнаты
      io.to(chat_id).emit("chat:user_connected", {
        chat_id,
        timestamp: Date.now()
      });

      return res.status(200).json({
        message: "Подключение к чату подтверждено",
        data: { chat_id }
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}


export const chat_controller = new ChatController();
