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

    async create({ auth, email, name, sector, role }: UsersCreateData): Promise<string> {

        const adminCount = await prisma.user.count({
            where: {
                role: 'admin'
            }
        })

        if (adminCount > 0 && auth) {
            const idRole = await prisma.user.findUniqueOrThrow({
                where: {
                    id:auth
                },
                select: {
                    role: true,
                    isActive:true
                }
            })

            if(idRole.isActive == false){
                throw new Error('Usuário inativo')
            }
            if (idRole.role != 'admin') {
                throw new Error('Usuário não autorizado a fazer cadastros')
            }

        }

        if(adminCount >0 && !auth){
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
    async update({auth, id, email,name,password,sector, isActive}: UsersUpdateData){


        const authRole = await prisma.user.findUniqueOrThrow({
            where:{
                id:auth
            },
            select:{
                role:true,
                isActive:true
            }
        }).catch(() =>{
            throw new Error('Usuário invalido')
        })

        if(authRole.isActive == false){
            throw new Error('Usuário inativo.')
        }
    
        if(authRole.role != 'admin'){
            throw new Error('Usuário não autorizado a editar informações.')
        }


        await prisma.user.update({
            where:{
                id
            },
            data:{
                name,
                email,
                password,
                sector,
                isActive
            }
        })
    };

    async readAll():Promise<UsersReadData[]>{
        const allUsers =  await prisma.user.findMany()

        return allUsers
    }

    async readOne({id}: UsersID):Promise<UsersReadData>{
        const user = await prisma.user.findUniqueOrThrow({
            where:{
                id
            },
        })

        return user

    }

    async login({email,password}: UsersLoginData):Promise<UsersID>{


        
        const logUser =  await prisma.user.findUniqueOrThrow({
            where:{
                email:email
            },
            select:{
                id:true,
                email:true,
                password:true,
                isActive:true
            }
        }).catch(() =>{
            throw new Error('Usuário não cadastrado')
        })

        if(logUser.isActive ==false){
            throw new Error("Usuário inativo")
        }
        const {id} = logUser

        if(logUser.email == email && logUser.password == password){

            return {id}

        }else{
            throw new Error('Usuário inválido')
        }

        
    }

}