import { CallsRepository } from "../../repositories/calls-repository"; 

interface OperatorCallsUseCaseData{
    solverId?:string
}



export class OperatorCallsUseCase{
    constructor(
        private callsRepository:CallsRepository
    ){}

    async execute({solverId}:OperatorCallsUseCaseData){

        if(!solverId){
            throw new Error('Ausência de credenciais')
        }

        const data = await this.callsRepository.readOperatorCalls({
            solverId
        })

        return data
    }
}