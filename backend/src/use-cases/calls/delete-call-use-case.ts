import { CallsRepository } from "../../repositories/calls-repository";


interface DeleteCallUseCaseData{
    auth:string,
    id:number
}


export class DeleteCallUseCase{

    constructor(
        private callsrepository:CallsRepository
    ){}
    async execute(request:DeleteCallUseCaseData){
        const {
            auth,
            id
        } = request
        

        if(!auth){
            throw new Error('Ausência de credenciais')
        }

        if(!id){
            throw new Error('Registro não informado')
        }

        await this.callsrepository.delete({
            auth,
            id
        })
    }

}



