import { Request, Response } from "express";
import { JwtUserType } from "@middlewares/auth_token.mid";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "@models/User.model";
import { HydratedDocument } from "mongoose";
import { UserType } from "@types-my/user.type";


class MainController {
    private readonly jwt_key: string | undefined = process.env.JWT_KEY;
    private token: string = "";
    private new_user: HydratedDocument<UserType> | null = null;

    public async auth(req: Request, res: Response) {
        try {
            const user = res.locals.user as JwtUserType;
           
           res.status(200).json({message: "Вы успешно авторизованы", data: { user, isAuth: true }});
        } catch (error) {
            res.status(500).json({message: 'Ошибка сервера'})
            console.error(error);
        }
    }

    public async login (req: Request, res: Response): Promise<any> {
        try {
            const { email, password } = req.body;

            const candidate = await User.findOne({ email })
            if(!candidate) return res.status(400).json({message: "Неверный логин или пароль"})

            const isMatch = await bcrypt.compare(password, candidate.password)
            if(!isMatch) return res.status(400).json({message: "Неверный логин или пароль"})

            if(!this.jwt_key) return res.status(500).json({message: 'Ошибка сервера'})

            this.token = jwt.sign({
                    userId: candidate._id,
                    name: candidate.name,
                    gender: candidate.gender,
                    email: candidate.email
            },
            this.jwt_key,
            {expiresIn: "12h"}
        );

        res.status(200).json({message: "Вы успешно авторизованы!", data: {jwt: this.token}});

        } catch (error) {
            res.status(500).json({message: 'Ошибка сервера'})
            console.error(error);       
        }
    }
    public async register(req: Request, res: Response): Promise<any> {
        try {
           const { email, password, name, gender } = req.body;

            const candidate = await User.findOne({ email });
            if(candidate) return res.status(400).json({message: "Пользователь с таким email существует"})

            const hashed_password = await bcrypt.hash(password, 8);

            this.new_user = new User({email, password: hashed_password, name, gender})

            if(!this.jwt_key) return res.status(500).json({message: 'Ошибка сервера'})

            await this.new_user.save();

                this.token = jwt.sign({
                    userId: this.new_user._id,
                    name: this.new_user.name,
                    gender: this.new_user.gender,
                    email: this.new_user.email
            },
            this.jwt_key,
            {expiresIn: "12h"}
        );

            res.status(200).json({message: "Вы успешно зарегистрировались", data: {jwt: this.token}})

        } catch (error) {
            res.status(500).json({message: 'Ошибка сервера'})
            console.error(error);         
        }
    }
}

export const auth_controller = new MainController();