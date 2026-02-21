import { Router } from "express";
import { auth_controller } from "@controllers/auth.controller"
import { auth_token } from "@middlewares/auth_token.mid";

const router:Router = Router();

router.get('/auth', auth_token, auth_controller.auth.bind(auth_controller))
router.post('/login', auth_controller.login.bind(auth_controller))
router.post('/register', auth_controller.register.bind(auth_controller))

export default router;