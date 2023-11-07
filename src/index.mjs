import express, { json } from 'express'
import { Server } from 'http'
import cors from 'cors'
import moment from 'moment'

// LOAD .ENV SETTINGS

// const database = require('./Services/Database')
import { PORT } from './Settings.mjs'
import routes from './Routes/index.mjs'
import db from './Models/init-models.mjs'

const app = express()
const server = Server(app)

function log (msg) {
  console.log(`[${moment().format('HH:mm:ss')}] ${msg}`)
}

// START DATABASE SERVICE
// database.connect()

(async () => {
  await db.sequelize.sync()
})()

app.use((req, _res, next) => {
  log(`${req.method} ${req.path}`)

  next()
})

// ADDS CORS HEADER
app.use(cors())

// HANDLES JSON REQUEST BODY
app.use(json())

// USES DEFINED ROUTES
app.use(routes)

server.listen(PORT, () => {
  console.log(`[ SERVER INFO ] RUNNING ON PORT ${PORT}`)
})

export default app
