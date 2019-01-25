const User = require('../models/user')
const Bcrypt = require('bcrypt')

module.exports = {
  method: 'POST',
  path: '/sign-up',
  handler: async ({ payload }, h) => {
    const encryptedPassword = await Bcrypt.hash(payload.password, 10)
    const user = await User.create({
      ...payload,
      encryptedPassword,
    })
    return user
  }
}
