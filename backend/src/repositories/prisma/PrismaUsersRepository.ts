import { User } from '@prisma/client'
import {prisma} from '../../prisma'
import { 
    UsersCreateData,
    UsersID,
    UsersLoginData,
    UsersReadData,
    UsersRepository,
    UsersUpdateData
} from '../users-repository'


export class PrismaUserRepository implements UsersRepository{

    async create({ id, email, name, sector, role }: UsersCreateData): Promise<string> {

        const adminCount = await prisma.user.count({
            where: {
                role: 'admin'
            }
        })

        if (adminCount > 0 && id) {
            const idRole = await prisma.user.findUniqueOrThrow({
                where: {
                    id
                },
                select: {
                    role: true
                }
            })

            if (idRole.role != 'admin') {
                throw new Error('Usuário não autorizado a fazer cadastros')
            }

        }

        if(adminCount >0 && !id){
            throw new Error('Usuário não autorizado a fazer cadastros')
        }

        
        await prisma.user.create({
            data: {
                email,
                name,
                role,
                sector

            }
        })

        const { password } = await prisma.user.findUniqueOrThrow({
            where: {
                email
            },
            select: {
                password: true
            }
        })

        return password
    }
    async update({id, email,name,password}: UsersUpdateData){
        await prisma.user.update({
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

    async readAll():Promise<User[]>{
        const allUsers =  await prisma.user.findMany()

        return allUsers
    }

    async readOne({id}: UsersID):Promise<User>{
        const user = await prisma.user.findUniqueOrThrow({
            where:{
                id
            },
        })

        return user

    }

    async delete({id}: UsersID){
        await prisma.user.delete({
            where:{
                id
            }
        })
    };

    async login({email,password}: UsersLoginData):Promise<UsersID>{


        
        const logUser =  await prisma.user.findUniqueOrThrow({
            where:{
                email:email
            },
            select:{
                id:true,
                email:true,
                password:true
            }
        }).catch(() =>{
            throw new Error('Usuário não cadastrado')
        })


        const {id} = logUser

        if(logUser.email == email && logUser.password == password){

            return {id}

        }else{
            throw new Error('Usuário inválido')
        }

        
    }

}