const mongoose = require('mongoose')

const connect = async () => {
  const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/ep2'
  const connection = await mongoose.connect(mongoURL)
  return connection
}

module.exports = { connect, mongoose }
