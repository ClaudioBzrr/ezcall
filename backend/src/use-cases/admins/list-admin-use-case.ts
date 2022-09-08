import { AdminsRepository } from "../../repositories/admins-repository";

interface ListAdminUseCaseData{
    id:string,
    name:string,
    email:string,
    password:string,
    firstAccess:boolean,
    createdAt:Date,
    updatedAt:Date
}


export class ListAdminUseCase{
    constructor(
        private adminRepository : AdminsRepository
    ){}

    async execute(){
        const data = await this.adminRepository.read()

        return data
    }

}
