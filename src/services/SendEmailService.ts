import * as nodemailer from "nodemailer"

export class SendEmailService {
    async sendMail({ name, email }) {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "danieldev3320@gmail.com",
                pass: "123456Qwert"
            }
        });

        await transporter.sendMail({
            from: "danieldev3320@gmail.com",
            to: email,
            subject: "Obrigado por utilizar nossa plataforma!",
            text: `${name} Muito obrigado por utilizar o nosso sistema, equipe Influeasy!`
        });
    }
}