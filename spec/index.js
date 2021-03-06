const chai = require('chai')
global.expect = chai.expect
global.sinon = require('sinon')

const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/test'

before(function () {
  mongoose.connect(MONGO_URL, { useNewUrlParser: true })
})

after(function () {
  mongoose.connection.close()
})

afterEach(function() {
  sinon.restore()
})

require('./decorators/user-decorator.spec.js')
require('./routes/sign-up.spec.js')