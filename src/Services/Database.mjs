import { connect as _connect } from 'mongoose'

import { DB_NAME } from '../Settings.mjs'

export function connect () {
  _connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
    .then(() => {
      console.log('[ SERVER INFO ] DATABASE CONNECTED')
    })
    .catch((error) => {
      console.log('[ SERVER INFO ] DATABASE CONNECTION ERROR')
      console.log(error)
    })
}
