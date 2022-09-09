import { UsersRepository } from '../../repositories/users-repository'

interface ListUsersUseCaseData{
    id: string;
    email: string;
    name: string;
    password: string;
    role: string;
    sector: string;
    firstAccess: boolean;
    createdAt: Date;
    updatedAt: Date;
}


export class ListUsersUseCase{
    constructor(
        private usersRepository : UsersRepository
    ){}

    async execute():Promise<ListUsersUseCaseData[]>{
        const data = await this.usersRepository.readAll()

        return data
    }

}
