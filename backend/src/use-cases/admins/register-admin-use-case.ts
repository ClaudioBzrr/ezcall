import { MailAdapter } from "../../adapters/mail-adapter";
import { AdminsRepository } from "../../repositories/admins-repository";

interface RegisterAdminsUseCaseRequest{
    name:string,
    email:string,
    password:string
}


export class RegisterAdminUseCase{
    constructor(
        private adminRepository : AdminsRepository,
        private mailAdapter: MailAdapter
    ){}

    async execute(request:RegisterAdminsUseCaseRequest){
        const {email,name,password} = request

        if(!email){
            throw new Error('email is required')
        }
        if(!name){
            throw new Error('name is required')
        }
        if(!password){
            throw new Error('password is required')
        }
        
        await this.adminRepository.create({
            email,
            name,
            password
        })

        await this.mailAdapter.sendmail({
            subject:"Novo cadastro",
            recipient:email,
            body:[
                '<div style="font-family: sans-serif; font-size:16px; color:#111">',
                `<p>Olá ${name}</p>`,
                '<p>Informamos que seu novo cadastro na plataforma Ezcall foi concluído com sucesso</p>',
                `<p> Sua senha de acesso é  : <b style="color:red">${password}</b></p>`
            ].join('\n')

        })
    }
}