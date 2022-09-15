import { CallsRepository } from "../../repositories/calls-repository";


interface AnswerCallUseCaseData{
    auth:string,
    id:number,
    severity?:number,
    status?:string,
    solverId?:string
}


export class AnswerCallUseCase{
    constructor(
        private callsRepository:CallsRepository
    ){}

    async execute(request:AnswerCallUseCaseData){
        const {
            auth,
            id,
            severity,
            solverId,
            status
        } = request

        if(!auth){
            throw new Error('Usuário não autorizado')
        }

        if(!id){
            throw new Error('Registro não encontrado')
        }
        
        if(!status){
            throw new Error('Status não informado')
        }

    }
}