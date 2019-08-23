// https://hooks.slack.com/services/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
const axios = require('axios')

class Slack {
  constructor() {
    return this
  }

  getHookUrl(options) {
    const id = options.hookId || 'TGA6ME1SA/BG892PE7K/H6w79fmkePWA46oy7M3nVZ0j'
    return `https://hooks.slack.com/services/${id}`
  }

  send(payload) {
    const url = this.getHookUrl(payload)
    const data = {
      channel: '#general',
      username: 'DAPPUSH',
      text: 'Alert! You need to do something for this dapp! <https://gotchi.app|Click here>',
      // icon_emoji: ':warning:',
      // icon_emoji: ':dappush:'
      icon_url: 'https://emoji.slack-edge.com/TGA6ME1SA/dappush/4d87b4f4174510b3.png'
    }

    axios.post(url, JSON.stringify(data)).then(res => {
      console.log('res', res)
    }, err => {
      console.log('err', err)
    })
  }
}

module.exports = new Slack()
