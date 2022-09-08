import { AdminsRepository } from "../../repositories/admins-repository";

interface RegisterAdminsUseCaseRequest{
    name:string,
    email:string,
    password:string
}


export class RegisterAdminUseCase{
    constructor(
        private adminRepository : AdminsRepository
    ){}

    async execute(request:RegisterAdminsUseCaseRequest){
        const {email,name,password} = request

        if(!email){
            throw new Error('email is required')
        }
        if(!name){
            throw new Error('name is required')
        }
        if(!password){
            throw new Error('password is required')
        }
        
        await this.adminRepository.create({
            email,
            name,
            password
        })
    }
}