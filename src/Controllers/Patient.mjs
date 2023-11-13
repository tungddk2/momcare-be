import { models } from "../Models/init-models.mjs";

const PatientController = {
  register: async (req, res) => {
    try {
      const { user, name, age, sex, phone, address } = req.body
      const patient = await models.Patient.create({
        patientId: user.userId,
        name,
        age,
        sex,
        phone,
        address
      })

      res.status(201).json({
        status: 201,
        response: {
          message: 'Patient created successfully.',
          patient
        }
      })

    } catch (err) {
      res.status(500).json({
        status: 500,
        response: {
          message: 'Something went wrong.',
          error: err
        }
      })
    }
  },
  edit: async (req, res) => {
    try {
      const { user, name, age, sex, phone, address } = req.body
      await models.Patient.update({
        name,
        age,
        sex,
        phone,
        address
      }, {
        where: {
          patientId: user.userId
        }
      })

    } catch (err) {
      res.status(500).json({
        status: 500,
        response: {
          message: 'Something went wrong.',
          error: err.message
        }
      })
    }
  }
}

export default PatientController
