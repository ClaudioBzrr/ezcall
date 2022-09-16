import { CallsRepository } from "../../repositories/calls-repository";


interface UserCallsUseCaseData{

    authorId?:string,

}

export class UserCallsUseCase{

    constructor(
        private callsRepository:CallsRepository
    ){}

    async execute({authorId}:UserCallsUseCaseData){

        if (!authorId){
            throw new Error("Ausência de credenciais")
        }

        
        const data  = await this.callsRepository.readUserCalls({
            authorId
        })


        return data


    }
}