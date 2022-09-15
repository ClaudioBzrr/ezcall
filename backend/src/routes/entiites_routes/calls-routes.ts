import { Router } from 'express'
import { PrismaCallsRepository } from '../../repositories/prisma/PrismaCallsRepository'
import { CreateCallUseCase } from '../../use-cases/calls/create-call-use-case'
import { DeleteCallUseCase } from '../../use-cases/calls/delete-call-use-case'
import { AnswerCallUseCase } from '../../use-cases/calls/answer-call-user-case' 

export const callRoutes = Router()

const prismaCallsRepository =  new PrismaCallsRepository()


const createCall =  new CreateCallUseCase(
    prismaCallsRepository
)

const deleteCall =  new DeleteCallUseCase(
    prismaCallsRepository
)

const answerCall =  new AnswerCallUseCase(
    prismaCallsRepository
)


callRoutes.post('/call/create',async (req,res) =>{
    const {
        title,
        message,
        authorId,
        screenshot
    } =  req.body


    try{

        await createCall.execute({
            authorId,
            message,
            screenshot,
            title
        })

    }catch(err){
        return res.status(403).json(`Erro ao criar chamado : ${String(err).replace("Error: ","")}`)
    }
})


callRoutes.put('/call/:id',async (req,res) =>{
    const id = Number(req.params.id)
    const {
        severity,
        status,
        solverId,
        isFinished,
        solution
    } = req.body

    const auth = req.headers.authorization

    try{

        await answerCall.execute({
            auth,
            id,
            isFinished,
            severity,
            solution,
            solverId,
            status
        })

    }catch(err){
        return 
    }
})


