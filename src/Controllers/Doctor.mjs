import { models } from "../Models/init-models.mjs";

const DoctorController = {
  register: async (req, res) => {
    try {
      const { user } = req
      const { name, age, sex, phone, medicalSpecialty, hospital, degree, consultingPriceViaMessage, consultingPriceViaCall } = req.body
      console.log(user, name, age, sex, phone, medicalSpecialty, hospital, degree, consultingPriceViaMessage, consultingPriceViaCall)
      const doctor = await models.Doctor.create({
        doctorId: user.userId,
        name,
        age,
        sex,
        phone,
        medicalSpecialty,
        hospital,
        degree,
        consultingPriceViaMessage,
        consultingPriceViaCall
      })

      res.status(201).json({
        status: 201,
        response: {
          message: 'Doctor created successfully.',
          doctor
        }
      })

    } catch (err) {
      console.log(err)
      res.status(500).json({
        status: 500,
        response: {
          message: 'Doctor already exists.',
          error: err.message
        }
      })
    }
  },
  editInfo: async (req, res) => {
    try {
      const { name, address, workingTime, point, commentary } = req.body
      const doctor = await models.Doctor.update({
        name,
        address,
        workingTime,
        point,
        commentary
      }, {
        where: {
          doctorId: req.user.userId
        }
      })

      res.status(200).json({
        status: 200,
        response: {
          doctor
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

export default DoctorController
