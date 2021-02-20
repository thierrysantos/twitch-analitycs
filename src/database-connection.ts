import mongoose from 'mongoose'

const {
  MONGOURI
} = process.env

export const createConnection = async () => {
  await mongoose.connect(
    MONGOURI || '', 
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
}