import { Router } from 'express'
import UserController from '../Controllers/User.mjs'

const UserRoutes = Router()

/**
 * @swagger
 * /users/login:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
UserRoutes.post('/user/login', UserController.login)

UserRoutes.post('/user/register', UserController.register)

/**
 * @swagger
 * /users/logout:
 *   post:
 *
 */
UserRoutes.post('/user/logout', UserController.logout)

export default UserRoutes
