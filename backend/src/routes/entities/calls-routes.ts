import { Router } from 'express'
import { PrismaCallsRepository } from '../../repositories/prisma/PrismaCallsRepository'
import { CreateCallUseCase } from '../../use-cases/calls/create-call-use-case'
import { DeleteCallUseCase } from '../../use-cases/calls/delete-call-use-case'
import { AnswerCallUseCase } from '../../use-cases/calls/answer-call-user-case' 
import { UserCallsUseCase } from '../../use-cases/calls/user-calls-use-case'
import { OperatorCallsUseCase } from '../../use-cases/calls/operator-calls-use-case'
import { AllCallsUseCase } from '../../use-cases/calls/all-calls-use-case'
import { FinishCallsUseCase } from '../../use-cases/calls/finish-calls-use-case'

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

const finishCall =  new FinishCallsUseCase(
    prismaCallsRepository
)

const userCalls = new UserCallsUseCase(
    prismaCallsRepository
)

const operatorCalls = new OperatorCallsUseCase(
    prismaCallsRepository
)

const allCallsUseCase =  new AllCallsUseCase(
    prismaCallsRepository
)




callRoutes.post('/call/create',async (req,res) =>{
    const {
        title,
        message,
        screenshot
    } =  req.body

    const authorId = req.headers.authorization
    try{

        await createCall.execute({
            authorId,
            message,
            screenshot,
            title
        })

        return res.json('Chamado criado com sucesso')
    }catch(err){
        return res.status(403).json(`Erro ao criar chamado : ${String(err).replace("Error: ","")}`)
    }
})


callRoutes.put('/call/:id',async (req,res) =>{

    const id = Number(req.params.id)
    const {severity} = req.body
    const solverId = req.headers.authorization

    try{

        await answerCall.execute({
            id,
            severity,
            solverId,
        })

        return  res.json('Chamado atualizado com sucesso!')

    }catch(err){
        return  res.status(403).json(`Erro ao editar chamado : ${String(err).replace("Error: ","")}`)
    }
})


callRoutes.put('/finish/call/:id', async(req,res) =>{
    const id =  Number(req.params.id)
    const solverId =  req.headers.authorization
    const { solution } = req.body

    try{

        await finishCall.execute({
            id,
            solution,
            solverId
        })


        return res.json("Chamado finalizado com sucesso")

    }catch(err){
        return res.json(`Erro : ${String(err).replace("Error: ","")}`)
    }
})


callRoutes.delete('/call/:id',async (req,res) =>{
    const id =  Number(req.params.id)
    const auth =  req.headers.authorization

    try{
        await deleteCall.execute({
            id,
            auth
        })

        return res.json('Chamado deletado com sucesso')
    }catch(err){

        return res.status(403).json(`Erro ao deletar chamado : ${String(err).replace('Error: ','')}`)
    }
})

callRoutes.post('/operator/calls',async (req, res) =>{
    const solverId =  req.headers.authorization


    try{
        const data = await operatorCalls.execute({
            solverId
        })

        return res.json(data)

    }catch(err){
        
        return res.status(403).json(`Erro : ${String(err).replace("Error: ","")}`)

    }
})

callRoutes.post('/user/calls', async(req,res)=>{
    const authorId =  req.headers.authorization

    try{
        
        const data = await userCalls.execute({
            authorId
        })

        return res.json(data)

    }catch(err){
        return res.status(403).json(`Erro : ${String(err).replace("Error: ","")}`)
    }
})


callRoutes.post('/allcalls',async(req,res)=>{
    const solverId =  req.headers.authorization

    try{
        const data =  await allCallsUseCase.execute({
            solverId
        })

        return res.json(data)
    }catch(err){

        return res.status(403).json(`Erro : ${String(err).replace("Error: ","")}`)

    }
})


