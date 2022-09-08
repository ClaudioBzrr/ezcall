import express from "express";
import { PrismaAdminsRespository } from "./repositories/prisma/PrismaAdminsRepository";
import { ListAdminUseCase } from "./use-cases/admins/list-admin-use-case";
import { RegisterAdminUseCase } from "./use-cases/admins/register-admin-use-case";


export const routes =  express.Router()

const prismaAdminRepository =  new PrismaAdminsRespository()

const listAdminUseCase =  new ListAdminUseCase(
    prismaAdminRepository
)
const registerAdminUseCase =  new RegisterAdminUseCase(
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