const express = require('express')
const publicRouter = express.Router()

// CONTROLLERS
const UserController = require('../Controllers/User')

// USERS
publicRouter.get('/users', UserController.index)
publicRouter.post('/user', UserController.create)

// a default route that will return a 404 error
publicRouter.get('*', (req, res) => {
  res.status(404).json({ success: false, error: 'Resource not found' })
})

module.exports = publicRouter
