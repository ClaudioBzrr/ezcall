import { UsersRepository } from '../../repositories/users-repository'

interface DeleteUserUseCaseData{
    id:string
}

export class DeleteUserUseCase{
    constructor(
        private userRespository:UsersRepository
    ){}

    async execute({id}:DeleteUserUseCaseData){
        await this.userRespository.delete({
            id
        })
    }
}