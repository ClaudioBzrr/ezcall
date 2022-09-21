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
                role:true,
                isActive:true
            }
        }).catch(() =>{
            throw new Error("Usuário inválido")
        })

        if(authRole.isActive == false){

            throw new Error("Usuário inativo")
        }
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
                        role:true,
                    }
                }
            }
        })

        const {isActive} = await prisma.user.findUniqueOrThrow({
            where:{
                id:solverId
            },
            select:{
                isActive:true
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

        if(isActive == false){
            throw new Error('Usuário inativo')
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

        const {role,isActive} =  await prisma.user.findUniqueOrThrow({
            where:{
                id:auth
            },
            select:{
                role:true,
                isActive:true
            }
        }).catch(() =>{
            throw new Error('Credenciais inválidas')
        })

        if(isActive == true){
            throw new Error('Usuário inativo')
        }

        if(role != 'admin'){
            
            throw new Error('Usuário sem permissão para deletar chamados')

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
                role:true,
                isActive:true
            }
        }).catch(()=>{

            throw new Error('Credenciais inválidas')

        })

        if(authAuthorId.isActive == false){
            throw new Error("Usuário inativo")
        }

        if(authAuthorId.role != 'user'){
            throw new Error('Credenciais inválidas')
        }

        const data = await prisma.call.findMany({
            where:{
                authorId
            },
            select:{
                id:true,
                title:true,
                message:true,
                screenshot:true,
                status:true,
                createdAt:true,
                updatedAt:true,
                finishedAt:true,
                authorId:true,
                solverId:false,
                isFinished:true,
                severity:false,
                solution:false,
                solver:{
                    select:{
                        name:true
                    }
                },
                author:{
                    select:{
                        name:true
                    }
                }
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
                role:true,
                isActive:true
            }
        }).catch(()=>{

            throw new Error('Credenciais inválidas')

        })

        if(authSolverId.isActive == false){
            throw new Error('Usuário inativo')
        }

        if(authSolverId.role != 'operator'){
            throw new Error('Credenciais inválidas')
        }

        const data = await prisma.call.findMany({
            where:{
                solverId
            },
            include:{
                author:{
                    select:{
                        name:true
                    }
                },
                solver:{
                    select:{
                        name:true
                    }
                }
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
                role:true,
                isActive:true
            }
        })

        if(roleSolverId.isActive == false){
            throw new Error('Usuário inativo')
        }

        if(roleSolverId.role !='operator' && roleSolverId.role !='admin'){
            throw new Error('Credenciais Inválidas')
        }

        const data = await prisma.call.findMany({
            include:{
                solver:{
                    select:{
                        name:true
                    }
                },
                author:{
                    select:{
                        name:true
                    }
                }
            }
        })

        return data

     }
}