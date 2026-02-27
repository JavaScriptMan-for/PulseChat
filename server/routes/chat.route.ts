import { chat_controller } from "@controllers/chat.controller";
import { auth_token } from "@middlewares/auth_token.mid";
import { Router } from "express";

const router: Router = Router()

router.get('/get-messages/:chat_id', auth_token, chat_controller.get_messages)


export default router;