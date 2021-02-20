import mongoose from 'mongoose'
import createLogger from '../logger'

const {
  MONGOURI
} = process.env

const logger = createLogger('database')

export const createConnection = async () => {
  logger.info('connect to database')
  const connection = await mongoose.connect(
    MONGOURI || '', 
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      reconnectTries: 5, 
      reconnectInterval: 1000,
      autoReconnect: true,
      minPoolSize: 1,
      maxPoolSize: 50
    }
  )
  logger.info('connect to database successful')

  return connection
}