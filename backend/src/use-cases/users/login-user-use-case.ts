import { UsersID, UsersRepository } from "../../repositories/users-repository";


interface LoginUserUseCaseData{
    email:string,
    password:string
}




export class LoginUserUseCase{
    constructor(
        private usersRepository:UsersRepository
    ){}

    async execute(request:LoginUserUseCaseData):Promise<UsersID>{

        const {
            email,
            password
        } = request

        const id = await this.usersRepository.login({
            email,
            password
        })

        return id

    }
}