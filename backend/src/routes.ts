import express from "express";
import { PrismaAdminsRespository } from "./repositories/prisma/PrismaAdminsRepository";
import { RegisterAdminUseCase } from "./use-cases/admins/register-admin-use-case";


export const routes =  express.Router()

const prismaAdminRepository =  new PrismaAdminsRespository()
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
        return res.json(err)
    }
})


routes.post('/admin/list', async(req,resp)=>{

    await 
})