export interface MailAdapterData{
    recipient:string,
    subject:string,
    body:string
}

export interface MailAdapter{
    sendmail:(data:MailAdapterData) => Promise<void>
}

