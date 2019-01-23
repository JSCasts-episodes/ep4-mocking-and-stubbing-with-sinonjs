const User = require('../models/user')

module.exports = {
  method: 'POST',
  path: '/sign-up',
  handler: async (request, h) => {
    const user = await User.create(request.payload)
    return user
  }
}
