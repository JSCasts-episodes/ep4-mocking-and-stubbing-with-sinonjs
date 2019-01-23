const moment = require('moment')

class UserDecorator {
  constructor(user) {
    this.user = user
  }

  name() {
    return [this.user.firstName, this.user.lastName].join(' ')
  }

  dateOfBirth() {
    return moment(this.user.dateOfBirth).format('YYYY-MM-DD')
  }

  serialize() {
    return {
      id: this.user._id,
      name: this.name(),
    }
  }
}

module.exports = UserDecorator
