import { UsersRepository } from '../../repositories/users-repository'

interface EditUsersUseCaseData{
    auth:string,
    id:string,
    name ?: string,
    email ?: string,
    role ?:string,
    sector: string,
    password ?: string
}


export class EditUsersUseCase{
    constructor(
        private usersRepository:UsersRepository
    ){}

    async execute({auth,id,sector,email,name,password,role}:EditUsersUseCaseData){
        await this.usersRepository.update({
            auth,
            id,
            sector,
            email,
            name,
            password,
            role

        })
    }
}


