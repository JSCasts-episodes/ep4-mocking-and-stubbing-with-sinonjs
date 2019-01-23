const Joi = require('joi')
const User = require('../models/user')
const UserDecorator = require('../decorators/user-decorator')

module.exports = {
  path: '/users',
  method: 'GET',
  options: {
    validate: {
      query: {
        page: Joi.number().integer().min(1).max(100).default(1),
        perPage: Joi.number().integer().min(1).max(100).default(20),
      }
    }
  },
  handler: async (request, h) => {
    const { page, perPage } = request.query
    const users = await User.find({})
      .sort({ firstName: 1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
    return {
      records: users.map(user => new UserDecorator(user).serialize()),
      meta: {
        page,
        perPage,
        total: await User.countDocuments()
      }
    }
  }
}