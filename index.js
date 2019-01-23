const server = require('./src/server')
const database = require('./src/database')

const start = async () => {
  await database.connect()
  return server.start()
}

start()
