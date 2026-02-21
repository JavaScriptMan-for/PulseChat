import { Router } from "express";
import { contact_controller } from "@controllers/contacts.controller";
import { auth_token } from "@middlewares/auth_token.mid";

const router: Router = Router();

router.post('/add-contact', auth_token, contact_controller.add_contact.bind(contact_controller))
router.get('/get-contacts', auth_token, contact_controller.get_contacts.bind(contact_controller))
router.get('/get-contact', auth_token, contact_controller.get_contact.bind(contact_controller))
router.delete('/delete-contact/:id', auth_token, contact_controller.delete_contact.bind(contact_controller))

export default router;