import express from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaAdminsRespository } from "./repositories/prisma/PrismaAdminsRepository";
import { DeleteAdminUseCase } from "./use-cases/admins/delete-admin-use-case";
import { EditAdminUseCase } from "./use-cases/admins/edit-admin-use-case";
import { ListAdminUseCase } from "./use-cases/admins/list-admin-use-case";
import { RegisterAdminUseCase } from "./use-cases/admins/register-admin-use-case";


export const routes =  express.Router()

const prismaAdminRepository =  new PrismaAdminsRespository()
const nodemailerMailAdapter = new NodemailerMailAdapter()

const listAdminUseCase =  new ListAdminUseCase(
    prismaAdminRepository
)
const registerAdminUseCase =  new RegisterAdminUseCase(
    prismaAdminRepository, nodemailerMailAdapter
)

const editAdminUseCase =  new EditAdminUseCase(
    prismaAdminRepository
)

const deleteAdminUseCase =  new DeleteAdminUseCase(
    prismaAdminRepository
)

routes.post('/admin/register', async (req,res) =>{
    const {
        name,
        email,
        password
    } = req.body


    try{
        await registerAdminUseCase.execute({
            email,
            name,
            password
        })

        return res.json(`Administrador ${name} criado com sucesso`)

    }catch(err){
        console.log(err)
        return res.status(404).json(err)
    }
})


routes.post('/admin/list', async(req,res)=>{

    try{
        const admins =  await listAdminUseCase.execute()
        return res.json(admins)

    }catch(err){
        
        return res.status(404).json(err)
    }


})


routes.post('/admin/edit/:id',async(req, res) =>{

    const {name,email,password} =  req.body
    const {id} =  req.params
    try{
        editAdminUseCase.execute({
            id,
            name,
            email,
            password
        })

        return res.json('Usuário editado com sucesso')
    }catch(err){

        return res.status(404).json(`Erro ao editar usuário : ${err}`)
    }
})


routes.post('/admin/delete/:id',async (req,res)=>{
    const {id} =  req.params

    try{

        await prismaAdminRepository.delete({
            id
        })

        return res.json('Administrador Deletado com sucesso')

    }catch(err){

        return  res.json('Erro ao deletar Administrador')

    }
})