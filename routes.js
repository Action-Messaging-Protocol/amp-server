const messages = require('./modules/messagesRouter')

module.exports = function routes(app) {
  app.use('/messages', messages)
}
