import { Injectable } from "@nestjs/common";
import { Resend } from "resend";

interface MailOptions {
    username: string
    subject: string
    html: string
}

@Injectable()
export class MailService {
    private mailer!: Resend

    constructor() {
        this.mailer = new Resend(process.env.RESEND_API_KEY!)
    }
    async sendMail(option: MailOptions) {
        return await this.mailer.sendEmail({
            from: "Psyhope Universitas Indonesia <psyhope@box.empoweruni.com>",
            to: `${option.username}@ui.ac.id`,
            ...option
        })
    }
}