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

        const authRole =  await prisma.user.findUniqueOrThrow({
            where:{
                id:authorId
            },
            select:{
                role:true
            }
        }).catch(() =>{
            throw new Error("Usuário inválido")
        })


        if(authRole.role != 'user'){
            throw new Error('Usuário não autorizado a criar chamados')
        }
        await prisma.call.create({

            data:{
                message,
                title,
                authorId,
                screenshot
            }
        })
    }

    async update({id,severity,solverId,status,isFinished,solution,finishedAt}: CallsUpdateData):Promise<void>{
        
        const creator =  await prisma.call.findUniqueOrThrow({
            where:{
                id
            },
            include:{
                solver:{
                    select:{
                        id:true,
                        role:true
                    }
                }
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

        if(creator.solver){

            if(creator.solverId){

                if(creator.solver.role !='operator'){
                    throw new Error('Usuário não é um operador')
                }

                if(solverId != creator.solverId){
                    throw new Error('Usuário não autorizado a fazer alterações nesse chamado')
                }

            }
        }else{
            const op =  await prisma.user.findUniqueOrThrow({
                where:{
                    id:solverId
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
                solverId:solverId,
                status,
                isFinished,
                solution,
                finishedAt
            }
        })

    }

    async delete({auth,id}: CallsDeleteData):Promise<void>{

        const callData =  await prisma.call.findUniqueOrThrow({
            where:{
                id
            },
            select:{
                isFinished:true,
                authorId:true
            }
        })

        
        const authRole =  await prisma.user.findUniqueOrThrow({
            where:{
                id:auth
            },
            select:{
                role:true
            }
        }).catch(()=>{
            throw new Error("Usuário inválido")
        })



        if(callData.isFinished==true && authRole.role !='admin'){
            throw new Error('Usuário não autorizado a deletar chamados finalizados')
        }

        if(auth != callData.authorId && authRole.role !='admin'){
            throw new Error('Usuário não autorizado a deletar chamados')
        }


        await prisma.call.delete({
            where:{
                id
            }
        })

    }

     async readUserCalls({authorId}: CallsAuthorData):Promise<CallsUserData[]>{

        const authAuthorId =  await prisma.user.findUniqueOrThrow({
            where:{
                id:authorId
            },
            select:{
                role:true
            }
        }).catch(()=>{

            throw new Error('Credenciais inválidas')

        })

        

        if(authAuthorId.role != 'user'){
            throw new Error('Credenciais inválidas')
        }

        const data = await prisma.call.findMany({
            where:{
                authorId
            }
        })

        return data


     }

     async readOperatorCalls({solverId}: CallsSolverData):Promise<CallsOperatorData[]>{

        const authSolverId =  await prisma.user.findUniqueOrThrow({
            where:{
                id:solverId
            },
            select:{
                role:true
            }
        }).catch(()=>{

            throw new Error('Credenciais inválidas')

        })

        if(authSolverId.role != 'operator'){
            throw new Error('Credenciais inválidas')
        }

        const data = await prisma.call.findMany({
            where:{
                solverId
            }
        })

        return data
     }

     async readAllcalls({solverId}: CallsSolverData):Promise<CallsOperatorData[]>{

        const roleSolverId = await prisma.user.findUniqueOrThrow({
            where:{
                id:solverId
            },
            select:{
                role:true
            }
        })

        if(roleSolverId.role !='operator' && roleSolverId.role !='admin'){
            throw new Error('Credenciais Inválidas')
        }

        const data = await prisma.call.findMany()

        return data

     }
}