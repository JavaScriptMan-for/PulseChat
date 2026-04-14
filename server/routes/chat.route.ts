import { chat_controller } from "@controllers/chat.controller";
import { auth_token } from "@middlewares/auth_token.mid";
import { Router } from "express";

const router: Router = Router()

router.get('/get-messages/:chat_id', auth_token, chat_controller.get_messages)
router.post('/get-unread-messages', auth_token, chat_controller.get_unread_messages)
router.delete("/delete-unread-messages", auth_token, chat_controller.delete_unread_messages)


export default router;