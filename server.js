const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const http = require('http')
const ExpressPeerServer = require('peer').ExpressPeerServer

const app = new express()

const options = {
  debug: true
}

// REDIS: Every node needs it to sync the queue
const sys = require('util')
const exec = require('child_process').exec

function puts(error, stdout, stderr) {
  if (error) console.log('redis error', error)
  sys.puts(stdout)
}

// start redis immediately, because we always need it, and dont like boot errors
exec('redis-cli shutdown')
exec('redis-server', puts)

class Server {
  constructor() {
    app.use(bodyParser.json())
    app.disable('x-powered-by')
  }

  // initialize routes!
  router(routes) {
    routes(app)
    return this
  }

  listen(port = parseInt(process.env.PORT, 10)) {
    const server = http.createServer(app)
    server.listen(port, () => {
      console.log(`Bootnode running - ${process.env.NODE_ENV || 'development'} http://localhost:${port}`)
    })

    return app
  }
}

module.exports = Server
