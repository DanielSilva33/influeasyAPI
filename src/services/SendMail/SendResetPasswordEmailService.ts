import * as nodemailer from "nodemailer"
import { getRepository } from "typeorm";
import { Users } from "../../entity/Users";

export class SendResetPasswordEmailService {
    async sendMail({ id }) {

        const repo = getRepository(Users);

        const users = await repo.findOne({ id });

        if (!users) {
            return new Error("User not found!")
        }
        
        const password = users.password;
        const name = users.name;
        const email = users.email;
        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORDEMAIL
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: "Sua senha foi resetada",
            text: `Olá ${name}, sua senha foi resetada, acesse a plataforma utilizando a seguinte senha: 
            ${password}`
        });
    }
}