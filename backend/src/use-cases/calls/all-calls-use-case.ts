import { CallsRepository } from "../../repositories/calls-repository";


interface AllCallsUseCaseData{
    solverId?:string
}


export class AllCallsUseCase{
    constructor(
        private callsRepository:CallsRepository
    ){}

    async execute({solverId}:AllCallsUseCaseData){

        if(!solverId){
            throw new Error('Credenciais Inválidas')
        }

        const data = await this.callsRepository.readAllcalls({
            solverId
        })


        return data

    }
}