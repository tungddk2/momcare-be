import { Router } from 'express'
import auth from '../Middlewares/Authentication'
import UserController from '../Controllers/User.mjs'

const routes = Router()

// routes.post('/login', auth.login)

routes.get('/users/:id', auth, UserController.getUserById)

export default routes
