import express from "express";


export const routes =  express.Router()


routes.post('/home',(req,res) =>res.send('Rota acessada'))