import { CallsRepository } from "../../repositories/calls-repository";


interface AnswerCallUseCaseData{
    auth?:string,
    id:number,
    severity?:number,
    status?:string,
    solverId?:string,
    isFinished?:boolean,
    solution?:string
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
            status,
            isFinished,
            solution
        } = request

        if(!auth){
            throw new Error('Usuário não autorizado')
        }
    
        if(!id){
            throw new Error('Registro não encontrado')
        }

        

        await this.callsRepository.update({
            auth,
            id,
            severity,
            solverId,
            status,
            isFinished,
            solution
        })

    }
}