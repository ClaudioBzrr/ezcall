import { UsersRepository } from '../../repositories/users-repository'

interface DeleteUserUseCaseData{
    auth?:string,
    id:string
}

export class DeleteUserUseCase{
    constructor(
        private userRespository:UsersRepository
    ){}

    async execute({auth,id}:DeleteUserUseCaseData){

        if(!auth){
            throw new Error('Usuário não credenciado')
        }
        await this.userRespository.delete({
            auth,
            id
        })
    }
}