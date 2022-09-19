import { CallsRepository } from "../../repositories/calls-repository";

interface FinishCallsUseCaseData{
    solverId?:string,
    id:number,
    solution:string,
}


export class FinishCallsUseCase{
    constructor(
        private callsRepository:CallsRepository
    ){}

    async execute(request:FinishCallsUseCaseData){
        const{
            id,
            solution,
            solverId,
        } = request

        await this.callsRepository.update({
            finishedAt:new Date(),
            id,
            isFinished:true,
            solution,
            solverId,
            status:'Finalizado'
        })
    }
}