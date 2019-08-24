const axios = require('axios')
require('dotenv').config()

class Push {
  constructor() {
    return this
  }

  getHeaders(options) {
    return {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: process.env.ONE_SIGNAL_API_KEY || ''
      }
    }
  }

  getHookUrl(options) {
    return `https://onesignal.com/api/v1/notifications`
  }

  async send({ title, message, push_ids }) {
    const options = this.getHeaders()
    const url = this.getHookUrl()
    const data = {
      app_id: process.env.ONE_SIGNAL_APP_ID || '',
      contents: {'en': title},
      headings: {'en': message},
      include_player_ids: push_ids || [],
      buttons: [{'id': 'id1', 'text': 'View', 'icon': 'ic_menu_share'}, {'id': 'id2', 'text': 'Dismiss', 'icon': 'ic_menu_send'}]
    }

    try {
      await axios.post(url, data, options)
    } catch (e) {
      console.log('send push error', e)
    }
  }
}

module.exports = new Push()
