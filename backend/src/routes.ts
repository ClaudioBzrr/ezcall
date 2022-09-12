import express from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaUserRepository } from "./repositories/prisma/PrismaUsersRepository";
import { DeleteUserUseCase } from "./use-cases/users/delete-user-use-case";
import { EditUsersUseCase } from "./use-cases/users/edit-user-use-case";
import { ListUsersUseCase } from "./use-cases/users/list-user-use-case";
import { LoginUserUseCase } from "./use-cases/users/login-user-use-case";
import { RegisterUserUseCase } from "./use-cases/users/register-user-use-case";



export const routes =  express.Router()

const prismaUserRepository =  new PrismaUserRepository()
const nodemailerMailAdapter = new NodemailerMailAdapter()

const listUserUseCase =  new ListUsersUseCase(
    prismaUserRepository
)
const registerUserUseCase =  new RegisterUserUseCase(
    prismaUserRepository, nodemailerMailAdapter
)

const editUserUseCase =  new EditUsersUseCase(
    prismaUserRepository
)

const deleteUserUseCase =  new DeleteUserUseCase(
    prismaUserRepository
)

const loginUserUseCase =  new LoginUserUseCase(
    prismaUserRepository
)

routes.post('/register', async (req,res) =>{
    const {
        name,
        email,
        sector,
        role
    } = req.body


    try{
        await registerUserUseCase.execute({
            email,
            name,
            sector,
            role
        })

        return res.json(`Usuário ${name} criado com sucesso`)

    }catch(err){

        return res.status(404).json(`Error ao criar usuário : ${err}`)
    }
})


routes.post('/user/list', async(req,res)=>{

    try{
        const usersData =  await listUserUseCase.execute()
        return res.json(usersData)

    }catch(err){
        
        return res.status(404).json(err)
    }


})


routes.put('/user/:id',async(req, res) =>{

    const {
        sector,
        email,
        name,
        password,
        role
    } =  req.body

    const {id} =  req.params

    try{
        await editUserUseCase.execute({
            id,
            sector,
            email,
            name,
            password,
            role
        })

        return res.json('Usuário editado com sucesso')
    }catch(err){

        return res.status(404).json(`Erro ao editar usuário : ${err}`)
    }
})


routes.delete('/user/:id',async (req,res)=>{
    const {id} =  req.params

    try{

        await deleteUserUseCase.execute({
            id
        })

        return res.json('Usuário deletado com sucesso')

    }catch(err){

        return  res.status(404).json('Erro ao deletar usuário')

    }
})


routes.post('/user/login',async (req, res) =>{

        const {email, password} = req.body

        
    try{

        const id = await loginUserUseCase.execute({
            email,
            password
        })

        return res.json(id)
    }catch(err){
        return res.status(404).json(`Erro ao fazer login : ${String(err).replace("Error: ","")}`)
    }
})