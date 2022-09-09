import {prisma} from '../../prisma'
import { AdminsCreateData,AdminsUpdateData,AdminsRepository,AdminsDeleteData, AdminsReadData } from '../admins-repository'


export class PrismaAdminsRespository implements AdminsRepository{

    async create({email,name,password}: AdminsCreateData){
            await prisma.admin.create({
                data:{
                    email,
                    name,
                    password
                }
            })
    }
    async update({id, email,name,password}: AdminsUpdateData){
        await prisma.admin.update({
            where:{
                id
            },
            data:{
                name,
                email,
                password
            }
        })
    };

    async read():Promise<AdminsReadData[]>{
        const admins = await prisma.admin.findMany()

        return admins
    };

    async delete({id}: AdminsDeleteData){
        await prisma.admin.delete({
            where:{
                id
            }
        })
    };

}