import { AdminsRepository } from "../../repositories/admins-repository";

interface ListAdminUseCaseData{
    id:string,
    name:string,
    email:string,
    password:string,
    firstAccess:Date,
    createdAt:Date,
    updatedAt:Date
}


export class ListAdminUseCase{
    constructor(
        private adminRepository : AdminsRepository
    ){}

    async execute(){
        
    }

}
