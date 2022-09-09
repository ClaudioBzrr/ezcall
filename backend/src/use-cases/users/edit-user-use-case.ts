import { UsersRepository } from '../../repositories/users-repository'

interface EditUsersUseCaseData{
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

    async execute({id,sector,email,name,password,role}:EditUsersUseCaseData){
        await this.usersRepository.update({
            id,
            sector,
            email,
            name,
            password,
            role

        })
    }
}


