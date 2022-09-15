import express from 'express'
import 'dotenv/config'
import { routes } from './routes' 

const server =  express()
const port = process.env.SERVER_PORT || process.env.PORT

server.use(express.json())
server.use(routes)


server.listen(port, ()=>{
    console.log(`Server running on port ${port} or ${process.env.PORT}`)
})
