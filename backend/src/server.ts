import Express from 'express'
import 'dotenv/config'

const server =  Express()
const port = process.env.SERVER_PORT

server.listen(port, ()=>{
    console.log(`Server running on port ${port} or ${process.env.PORT}`)
})
