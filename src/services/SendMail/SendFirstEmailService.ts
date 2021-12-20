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
            text: `Olá ${name}, Bem-vindo ao Influeasy! Seu teste gratuito de 15 dias começa hoje.
            O que acontece depois? Fique de olho em sua caixa de entrada, pois enviaremos as melhores oportunidades para garantir que você aproveite ao máximo.
            Quer fazer as coisas mais rápido? Escolha um plano, se você estiver interessado em saber mais sobre os nossos produtos e serviços ou precisar de ajuda para decidir o melhor plano para o seu negócio, sinta-se à vontade para entrar em contato com nossa equipe de suporte a qualquer momento. Estamos sempre aqui para ajudá-lo no que for possível.
            Tenha um excelente dia, equipe Influeasy`
        });
    }
}