const redis = require('./redis')
const slack = require('./slack')
// const twilio = require('./twilio')

class InfoController {
  constructor() {
    return this
  }

  async setRedis(req, res) {
    const { key, value } = req.body
    const data = await redis.set(key, value)
    res.json(data)
  }

  async getRedis(req, res) {
    const { key } = req.query
    const data = await redis.get(key)
    res.json(data)
  }

  async pushRedis(req, res) {
    const { key, value } = req.body
    const data = await redis.push(key, value)
    res.json(data)
  }

  async popRedis(req, res) {
    const { key } = req.query
    const data = await redis.pop(key)
    res.json(data)
  }

  slack(req, res) {
    slack.send({})
    res.json({ status: 200 })
  }

  // twilio(req, res) {
  //   twilio.send({})
  //   res.json({ status: 200 })
  // }
}

module.exports = new InfoController()
