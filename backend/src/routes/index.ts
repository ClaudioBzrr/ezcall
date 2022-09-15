import { Router } from 'express'
import { usersRoutes } from './entiites_routes/users-routes'


export const routes =  Router()


routes.use(usersRoutes)