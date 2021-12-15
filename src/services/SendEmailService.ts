import * as nodemailer from "nodemailer"

export class SendEmailService {
    async sendMail({ name, email }) {
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
            subject: "Obrigado por utilizar nossa plataforma!",
            text: `${name} Muito obrigado por utilizar o nosso sistema, equipe Influeasy!`
        });
    }
}