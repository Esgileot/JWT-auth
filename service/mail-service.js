const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: "jaroslavlegends@gmail.com",
            pass: "sgwnjrhepkjytlhx"
        }
        })
    }
    async sendActivationMail(rec, link) {
        await this.transporter.sendMail({
            from: "jaroslavlegends@gmail.com",
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
async function main() {
let transporter = nodemailer.createTransport({
        host: "jaroslavlegends@gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: "jaroslavlegends@gmail.com",
            pass: "sgwnjrhepkjytlhx"
        }   
    })

        await transporter.sendMail({
            from: "jaroslavlegends@gmail.com",
            to: "jaroslavlegendsjs@gmail.com",
            subject: "Activation account ",
            text: "Hellow",
            html: "<h1>To activate use link</h1>",
        })
}
