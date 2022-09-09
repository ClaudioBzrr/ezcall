import { MailAdapter, MailAdapterData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transporter =  nodemailer.createTransport({
    service:process.env.EMAIL_SERVICE,
    host:process.env.EMAIL_HOST,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
})

export class NodemailerMailAdapter implements MailAdapter{
    async sendmail({body,recipient,subject}: MailAdapterData){
        await transporter.sendMail({
            from:`Equipe Ezcall <${process.env.EMAIL_USER}>`,
            to:recipient,
            subject,
            html:body
        })
    }
}