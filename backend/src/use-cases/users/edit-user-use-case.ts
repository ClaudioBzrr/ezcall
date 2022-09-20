import { UsersRepository } from '../../repositories/users-repository'

interface EditUsersUseCaseData{
    auth?:string,
    id:string,
    name ?: string,
    email ?: string,
    sector?: string,
    password ?: string,
    isActive ?:boolean
}


export class EditUsersUseCase{
    constructor(
        private usersRepository:UsersRepository
    ){}

    async execute({auth,id,sector,email,name,password, isActive}:EditUsersUseCaseData){

        if(!auth){
            throw new Error('Usuário Não credenciado')
        }

        await this.usersRepository.update({
            auth,
            id,
            sector,
            email,
            name,
            password,
            isActive
        })
    }
}


