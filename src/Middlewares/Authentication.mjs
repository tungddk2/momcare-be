import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../Settings.mjs";
import { models } from "../Models/init-models.mjs";
const { verify } = jwt

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token)
      res.status(401).json({
        status: 401,
        response: {
          message: 'Token not found'
        }
      })

    const decoded = jwt.verify(token, JWT_SECRET)
    // token expired
    if (!decoded) {
      await models.Token.destroy({ where: { token } })
      res.status(401).json({
        status: 401,
        response: {
          message: 'Token expired'
        }
      })
    } else {
      const tokenInDB = await models.Token.findOne({ where: { token  } })
      if (!tokenInDB)
        res.status(401).json({
          status: 401,
          response: {
            message: 'Token has been revoked'
          }
        })
      else {
        console.log(decoded)
        const user = await models.User.findOne({ where: { userId: decoded.userId } })
        if (!user)
          res.status(401).json({
            status: 401,
            response: {
              message: 'User not found'
            }
          })
        else {
          req.user = user
          next()
        }
      }
    }

  } catch (err) {
    res.status(500).json({
      status: 500,
      response: 'Some error occurred while authenticating the user'
    })
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const { role } = req.user
    if (parseInt(role) !== 0)
      res.status(403).json({
        status: 403,
        response: {
          message: 'Admin access required'
        }
      })

    next()

  } catch (err) {
    res.status(401).json({
      status: 401,
      response: 'Some error occurred while authenticating the user'
    })
  }
}
