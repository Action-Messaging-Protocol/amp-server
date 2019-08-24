const axios = require('axios')

class Slack {
  constructor() {
    return this
  }

  getHookUrl(options) {
    const id = options.hookId || 'TMNCQPUH2/BMNU1QX1T/J7vJD5yc4dFfCyvR3PY0Uxa4'
    return `https://hooks.slack.com/services/${id}`
  }

  send(payload) {
    const url = this.getHookUrl(payload)
    const data = {
      channel: '#general',
      username: 'Alice',
      text: 'Take action on Alice! Click this link to get started <alice://|Click here>',
      icon_emoji: ':tophat:',
    }

    axios.post(url, JSON.stringify(data)).then(res => {
      console.log('res', res)
    }, err => {
      console.log('err', err)
    })
  }
}

module.exports = new Slack()
