const redis = require('./redis')
const slack = require('./slack')

class Messages {
  constructor() {
    return this
  }

  async getAllById(req, res) {
    const { key } = req.query
    const data = await redis.get(key)
    res.json(data)
  }

  async getById(req, res) {
    const { key } = req.query
    const data = await redis.get(key)
    res.json(data)
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
