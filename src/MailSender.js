const nodemailer = require('nodemailer');
const config = require('./config'); // sesuaikan path

class MailSender {
    constructor() {
        this._transporter = nodemailer.createTransport({
            host: config.nodeMailer.host,
            port: config.nodeMailer.port,
            secure: false,
            auth: {
                user: config.nodeMailer.user,
                pass: config.nodeMailer.password,
            },
        });
    }

    async sendEmail(targetEmail, content, subject = 'Export Playlist') {
        const message = {
            user: config.nodeMailer.user,
            to: targetEmail,
            subject,
            text: 'Terlampir hasil dari ekspor playlist',
            attachments: [
                {
                    filename: 'open-music.json',
                    content,
                },
            ],
        };
        await this._transporter.sendMail(message);
    }
}

module.exports = MailSender;
