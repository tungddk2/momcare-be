import { Router } from 'express'

import UserRoutes from "./User.mjs";
import AdminRoutes from "./Admin.mjs";
import DoctorRoutes from "./Doctor.mjs";
import PatientRoutes from "./Patient.mjs";

const routes = Router()

routes.use(AdminRoutes)
routes.use(UserRoutes)
routes.use(DoctorRoutes)
routes.use(PatientRoutes)

export default routes
