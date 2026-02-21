import { JwtUserType } from "@middlewares/auth_token.mid";
import { Request, Response } from "express";
import { nanoid } from "nanoid";
import Contact from "@models/Contacts.model";
import User from "@models/User.model";

class ContactController {

    public async get_contacts(req: Request, res: Response): Promise<any> {
      try {
        
        const user = res.locals.user;

        if(!user) return res.status(401).json({message: "Вы не авторизованы"})
        
        const contacts = await Contact.find({ my_userId: user.userId })
        if(!contacts) res.status(404).json({message: "Контакты не найдены"})

        res.status(200).json({message: "Контакты успешно найдены", data: {contacts}})
      } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Ошибка сервера'})
      }
    }

    public async get_contact(req: Request, res: Response): Promise<any> {
      try {
        
        const id = req.params.id;

        const contact = await Contact.findById(id)
        if(!contact) return res.status(404).json({message: "Контакт не найден"})

        res.status(200).json({message: "Контакт найден", data: {contact}})

      } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Ошибка сервера'})
      }
    }

    public async add_contact(req: Request, res: Response): Promise<any> {
      try {
            const user = res.locals.user as JwtUserType;
            if(!user) return res.status(401).json({message: "Вы не авторизованы"})
 

            const { userId, participant_2 } = req.body;

            
            const isHas = await User.findOne({ _id: userId })
            if(!isHas) return res.status(404).json({message: "Контакта с таким user ID не существует"})

            const candidate = await Contact.findOne({ userId, my_userId: user.userId })
            if(candidate) return res.status(400).json({message: "Контакт уже добавлен"})


            const unique_id = await nanoid();

            const my_contact = new Contact({ my_userId: user.userId, userId, participant_1: user.name, participant_2, chat_id: unique_id })

            await my_contact.save();

            const contact = new Contact({ my_userId: userId, userId: user.userId, participant_1: participant_2, participant_2: user.name, chat_id: unique_id })
            await contact.save();

            res.status(200).json({message: "Контакт успешно добавлен", data: { userId }})
      } catch (error) {
        res.status(500).json({message: 'Ошибка сервера'})
        console.error(error);
      }
    }
    public async delete_contact(req: Request, res: Response): Promise<any> {
      try {
        const id = req.params.id;

        const user = res.locals.user;

        const deletedContact = await Contact.deleteOne({ _id: id, my_userId: user?.userId })
        if(!deletedContact) return res.status(400).json({message: "Ошибка при удалении контакта"})

        res.status(200).json({message: "Контакт удалён", data: { contactId: id }})
      } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Ошибка сервера'})
      }
    }
}

export const contact_controller = new ContactController();