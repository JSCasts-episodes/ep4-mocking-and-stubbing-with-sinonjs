const Hapi = require('hapi')
const UsersRoute = require('./routes/users')
const SignUpRoute = require('./routes/sign-up')

const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost'
})

server.route(UsersRoute)
server.route(SignUpRoute)

const start = async () => {
  await server.start()
  console.info('server running')
}

module.exports = { start }
