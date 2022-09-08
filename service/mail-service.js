const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: "test@gmail.com",
            pass: "password"
        }
        })
    }
    async sendActivationMail(rec, link) {
        await this.transporter.sendMail({
            from: "test@gmail.com",
            to: rec,
            subject: "Activation account " + process.env.API_URL,
            text: "",
            html:
                `
                    <div>
                        <h1>To activate use link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
        })
    } 
}

module.exports = new MailService();
