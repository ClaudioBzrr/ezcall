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

    async update({auth,id,severity,solverId,status,isFinished,solution}: CallsUpdateData):Promise<void>{
        
        const creator =  await prisma.call.findUnique({
            where:{
                id
            },
            select:{
                solverId:true
            }
        })

        const callStatus =  await prisma.call.findFirstOrThrow({
            where:{
                id
            },
            select:{
                isFinished:true
            }
        })

        if(callStatus.isFinished == true){
            throw new Error('Impossível editar um chamado finalizado')
        }

        if(creator){

            if(auth != creator.solverId){
                throw new Error('Usuário não autorizado a fazer alterações em chamados')
            }
        }else{
            const op =  await prisma.user.findUniqueOrThrow({
                where:{
                    id:auth
                },
                select:{
                    role:true
                }
            })

            if(op.role !='operator'){
                
                throw new Error('Usuário não é um operador')
            }
        }

        await prisma.call.update({
            
            where:{
                id
            },
            data:{
                severity,
                solverId,
                status,
                isFinished,
                solution
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