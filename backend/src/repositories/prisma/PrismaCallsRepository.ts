import {prisma} from '../../prisma'

import {
    CallsAuthorData,
    CallsCreateData,
    CallsDeleteData,
    CallsOperatorData,
    CallsRepository,
    CallsSolverData,
    CallsUpdateData,
    CallsUserData
} from '../calls-repository'



export class PrismaCallsRepository implements CallsRepository{

    async create({screenshot,authorId,message,title}: CallsCreateData):Promise<void>{

        await prisma.call.create({

            data:{
                message,
                title,
                authorId,
                screenshot
            }
        })
    }

    async update({auth,id,severity,solverId,status}: CallsUpdateData):Promise<void>{
        
        const creator =  await prisma.call.findUniqueOrThrow({
            where:{
                id
            },
            select:{
                solverId:true
            }
        })

        if(auth != creator.solverId){
            throw new Error('Usuário não autorizado a fazer alterações em chamados')
        }

        await prisma.call.update({
            
            where:{
                id
            },
            data:{
                severity,
                solverId,
                status
            }
        })

    }

    async delete({auth,id}: CallsDeleteData):Promise<void>{

        const creator =  await prisma.call.findUniqueOrThrow({
            where:{
                id
            },
            select:{
                solverId:true
            }
        })

        if(auth != creator.solverId){
            throw new Error('Usuário não autorizado a deletar chamados')
        }


        await prisma.call.delete({
            where:{
                id
            }
        })

    }

     async readUserCalls({authorId}: CallsAuthorData):Promise<CallsUserData[]>{

        const data = await prisma.call.findMany({
            where:{
                authorId
            }
        })

        return data


     }

     async readOperatorCall({solverId}: CallsSolverData):Promise<CallsOperatorData[]>{
        const data = await prisma.call.findMany({
            where:{
                solverId
            }
        })

        return data
     }
}