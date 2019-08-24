const redis = require('./redis')
const slack = require('./slack')

class Messages {
  constructor() {
    return this
  }

  async getAllById(channelId) {
    const data = await redis.get(key)
    return data
  }

  async getById(channelId, key) {
    const data = await redis.get(key)
    return data
  }

  async addMessage(key, value) {
    console.log('addMessage', key, value)
    const data = await redis.push(key, value)
    console.log('data', data)
    return data
  }

  slack(req, res) {
    return slack.send({})
  }
}

module.exports = new Messages()
