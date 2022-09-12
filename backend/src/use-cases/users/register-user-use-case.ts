import { MailAdapter } from "../../adapters/mail-adapter";
import { UsersRepository } from "../../repositories/users-repository";

interface RegisterUsersUseCaseRequest{
    id?:string,
    name:string,
    email:string,
    role:string,
    sector:string
}


export class RegisterUserUseCase{
    constructor(
        private userRepository : UsersRepository,
        private mailAdapter: MailAdapter
    ){}

    async execute(request:RegisterUsersUseCaseRequest){
        const {id,email,name,sector,role} = request

        if(!email){
            throw new Error('email is required')
        }
        if(!name){
            throw new Error('name is required')
        }
        if(!sector){
            throw new Error('sector is required')
        }
        
        const pass = await this.userRepository.create({
            id,
            email,
            name,
            sector,
            role
        })

        await this.mailAdapter.sendmail({
            subject:"Novo cadastro",
            recipient:email,
            body:[
                '<div style="font-family: sans-serif; font-size:16px; color:#111">',
                `<p>Olá ${name}</p>`,
                '<p>Informamos que seu novo cadastro na plataforma Ezcall foi concluído com sucesso</p>',
                `<p> Sua senha de acesso é  : <b style="color:red"> ${pass} </b></p>`
            ].join('\n')

        })
    }
}