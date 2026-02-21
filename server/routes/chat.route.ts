import { chat_controller } from "@controllers/chat.controller";
import { Router } from "express";

const router: Router = Router()

router.get('/chat/:id', chat_controller.connect_chat.bind(chat_controller))


export default router;