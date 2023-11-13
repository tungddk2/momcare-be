import { Router } from 'express'
import DoctorController from '../Controllers/Doctor.mjs'
import { auth } from "../Middlewares/Authentication.mjs";

const DoctorRoutes = Router()

DoctorRoutes.post('/doctor/register', auth, DoctorController.register)
DoctorRoutes.put('/doctor/edit', auth, DoctorController.editInfo)

export default DoctorRoutes
