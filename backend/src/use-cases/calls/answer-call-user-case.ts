import { CallsRepository } from "../../repositories/calls-repository";


interface AnswerCallUseCaseData{
    id:number,
    severity?:number,
    solverId?:string,
}


export class AnswerCallUseCase{
    constructor(
        private callsRepository:CallsRepository
    ){}

    async execute(request:AnswerCallUseCaseData){
        const {
            id,
            severity,
            solverId,
        } = request

        if(!solverId){
            throw new Error('Usuário não autorizado')
        }
    
        if(!id){
            throw new Error('Registro não encontrado')
        }

        
        await this.callsRepository.update({
            id,
            severity,
            solverId,
            status:"Em andamento",
        })

    }
}