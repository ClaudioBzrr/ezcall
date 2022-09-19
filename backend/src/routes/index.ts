import { Router } from 'express'
import { callRoutes } from './entities/calls-routes'
import { usersRoutes } from './entities/users-routes'


export const routes =  Router()


routes.use(usersRoutes)
routes.use(callRoutes)