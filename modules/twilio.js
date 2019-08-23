const twilio = require('twilio')

class Twilio {
  constructor() {
    const accountSid = process.env.ACCOUNTSID
    const authToken = process.env.AUTHTOKEN

    this.client = twilio(accountSid, authToken)

    return this
  }

  send(payload) {
    this.client.messages
      .create({
        body: 'Alert! You need to do something for this dapp!',
        to: `+${payload.to}`,
        from: `+${process.env.FROMPHONE}`
      })
      .then(res => console.log(res.sid), err => {
        console.log('err', err)
      })
  }
}

module.exports = new Twilio()
