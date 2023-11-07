import { Router } from 'express'

import publicRouter from './Public.mjs'
import privateRouter from './Private.mjs'

import authMiddleware from '../Middlewares/Authentication.mjs'

const routes = Router()

routes.use(publicRouter)
routes.use(authMiddleware)
routes.use(privateRouter)

export default routes
