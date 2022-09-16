import { Router } from 'express'
import { callRoutes } from './entiites_routes/calls-routes'
import { usersRoutes } from './entiites_routes/users-routes'


export const routes =  Router()


routes.use(usersRoutes)
routes.use(callRoutes)