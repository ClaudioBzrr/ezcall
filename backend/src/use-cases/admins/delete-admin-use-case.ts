import { AdminsRepository } from "../../repositories/admins-repository";

interface DeleteAdminUseCaseData{
    id:string
}

export class DeleteAdminUseCase{
    constructor(
        private adminRepository:AdminsRepository
    ){}

    async execute({id}:DeleteAdminUseCaseData){
        await this.adminRepository.delete({
            id
        })
    }
}