import jwt from 'jsonwebtoken'
const { verify } = jwt

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: 401,
        response: 'Authorization token is required'
      })
    }

    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({
        status: 401,
        response: 'Authorization token is required'
      })
    }

    const decoded = verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({
      status: 401,
      response: 'Some error occured while authenticating the user'
    })
  }
}

export default auth
