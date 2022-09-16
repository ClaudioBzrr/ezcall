import { CallsRepository } from "../../repositories/calls-repository";

interface CreateCallUseCaseData{
    title:string,
    message:string,
    authorId?:string,
    screenshot:string
}



export class CreateCallUseCase{
    constructor(
        private callsRepository : CallsRepository
    ){}


    async execute(request:CreateCallUseCaseData){
        const {
            authorId,
            message,
            screenshot,
            title
        } = request

        if(!authorId){
            throw new Error('Usuário não informado')
        }
        
        if(!message){
            throw new Error('Mensagem não informada')
        }

        if(!title){
            throw new Error('Título não informado')
        }



        await this.callsRepository.create({
            authorId,
            message,
            screenshot,
            title
        })

    }
}