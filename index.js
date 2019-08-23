const server = require('./server')
const routes = require('./routes')
const args = require('args')

args.option('port', 'The port on which the app will be running')

const flags = args.parse(process.argv)
const activePort = flags.port || parseInt(process.env.PORT, 10) || 1337

const s = new server()

s.router(routes).listen(activePort)
