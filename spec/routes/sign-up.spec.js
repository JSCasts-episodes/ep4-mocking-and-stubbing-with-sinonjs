const SignUp = require('../../src/routes/sign-up')
const User = require('../../src/models/user')
const Bcrypt = require('bcrypt')

describe('SignUp', function () {
  describe('#handler', function () {
    beforeEach(async function () {
      this.user = {
        email: 'john@doe.com',
        firstName: 'john',
        lastName: 'doe',
        password: 'secretPassword',
      }
      this.expectedPassword = 'hashed-password'
      this.mockedBcrypt = sinon.mock(Bcrypt)
      this.mockedBcrypt.expects('hash').once().resolves(this.expectedPassword)
      this.ret = await SignUp.handler({ payload: this.user })
    })

    afterEach(async function () {
      await User.deleteMany({})
      this.mockedBcrypt.verify()
    })

    it('creates the user in the database', async function() {
      expect(await User.countDocuments()).to.equal(1)
    })

    it('returns user object', function() {
      expect(this.ret).to.deep.include({
        email: this.user.email,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
      })
    })

    it('creates password hash', async function() {
      expect(
        await User.findOne()
        ).to.have.property('encryptedPassword', this.expectedPassword)
    })

    it('throws an error when the user already exists')
  })
})