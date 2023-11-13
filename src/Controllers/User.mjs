import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { models } from "../Models/init-models.mjs";
import { DEFAULT_TIMEOUT, JWT_SECRET } from "../Settings.mjs";
import cookie from "cookie";
import Role from "../Models/Role.mjs";

const UserController = {
  // create document for this login
  /**
   * Handle the login request of a user
   * @param req the request should contain email and password
   * @param res the response will contain a token and user information
   * @returns {Promise<void>} 200 if accepted, 400 if not
   */
  login: async (req, res) => {
    try {
      const { email, password } = req.body
      if (!(email && password)) throw new Error('Email and password are required.')

      const user = await models.User.findOne({ where: { email } })
      if (!user) throw new Error('User not found.')

      const isPasswordCorrect = await bcrypt.compare("" + password, user.password_hash)
      if (!isPasswordCorrect) throw new Error('Wrong email or password.')

      const token = jwt.sign({ userId: user.userId, role: user.role }, JWT_SECRET, { expiresIn: '15m' })
      await models.Token.update({
        token,
        expires: false
      }, {
        where: {
          id: user.userId
        }
      })

      res.status(200).json({
        status: 200,
        response: {
          token,
          user: {
            userId: user.userId,
            email: user.email,
            role: user.role
          }
        }
      })

    } catch (err) {
      console.log(err)
      res.status(400).json({
        status: 400,
        response: {
          message: 'Wrong email or password.',
          error: err.message
        }
      })
    }
  },
  /**
   * Handle the register request of a user
   * @param req the request should contain email, password and role
   * @param res the response will contain a token and user information
   * @returns {Promise<void>} 201 if accepted, 500 if not
   */
  register: async (req, res) => {
    try {
      const { email, password, role } = req.body
      console.log(req.body)
      const hashedPassword = await bcrypt.hash("" + password, parseInt(10))
      const user = await models.User.create({
        email,
        password_hash: hashedPassword,
        role
      })

      // create token
      const token = jwt.sign({ userId: user.userId, role: role }, JWT_SECRET, {
        expiresIn: DEFAULT_TIMEOUT.str
      })

      // save token in database
      await models.Token.create({
        id: user.userId,
        token,
        type: 'Bearer',
        expires: false
      })

      res.status(201).json({
        status: 201,
        response: {
          token,
          user: {
            userId: user.userId,
            email: user.email,
            role: user.role
          }
        }
      })

    } catch (err) {
      console.log(err)
      res.status(500).json({
        status: 500,
        response: {
          message: 'Something went wrong.',
          error: err.message
        }
      })
    }
  },
  logout: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1]

      await models.Token.destroy({ where: { token } })

      res.status(200).json({
        status: 200,
        response: {
          message: 'Logout successful.'
        }
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        status: 500,
        response: {
          message: 'Something went wrong.',
          error: err.message
        }
      })
    }
  },
  findAll: async (req, res) => {
    try {
      const role = req.user.role
      if (role) {
        const users = await models.User.findAll({
          where: {
            role: {
              [models.Sequelize.Op.eq]: role
            }
          }
        })

        res.status(200).json({
          status: 200,
          response: {
            users,
          }
        })
      } else {
        const users = await models.User.findAll()
        res.status(200).json({
          status: 200,
          response: {
            users,
          }
        })
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        response: {
          message: 'Something went wrong.',
          error: err.message
        }
      })
    }
  },
}

export default UserController
