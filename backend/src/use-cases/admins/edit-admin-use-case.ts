import { AdminsRepository } from "../../repositories/admins-repository";

interface EditAdminUseCaseData{
    id:string
    name:string,
    email:string,
    password:string,
}


export class EditAdminUseCase{
    constructor(
        private adminsRepository:AdminsRepository
    ){}

    async execute({id,email,name,password}:EditAdminUseCaseData){
        await this.adminsRepository.update({
            id,
            email,
            name,
            password
        })
    }
}


