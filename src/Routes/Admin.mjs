import { Router } from 'express'
import UserController from '../Controllers/User.mjs'
import { auth, isAdmin } from "../Middlewares/Authentication.mjs";

const AdminRoutes = Router()

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users or users by role
 *     description: Retrieve a list of users basic information from database.
 *     responses:
 *       200:
 *         description: A list of users.
 */
AdminRoutes.get('/users', auth, isAdmin, UserController.findAll)

export default AdminRoutes
