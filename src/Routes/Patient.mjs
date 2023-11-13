import { Router } from 'express'
import { auth } from "../Middlewares/Authentication.mjs";
import PatientController from "../Controllers/Patient.mjs";

const PatientRoutes = Router()

PatientRoutes.post('/patient/register', auth, PatientController.register)
PatientRoutes.put('/patient/edit', auth, PatientController.edit)

export default PatientRoutes
