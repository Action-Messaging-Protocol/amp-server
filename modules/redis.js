const redis = require('redis')

class RedisProvider {
  constructor() {
    this.client = null
    this.status = null

    return this
  }

  disconnect() {
    this.client.quit()
  }

  connect() {
    if (!this.client) this.client = redis.createClient()

    // errors? sure, lets see em
    this.client.on('error', err => {
      this.status = 'error'
      console.log(err)
    })

    this.client.on('ready', () => {
      this.status = 'ready'
      console.log('REDIS: ready')
    })

    return this.client
  }

  set(key, value) {
    if (!this.client) return Promise.resolve(null)
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err, reply) => {
        // callback
        console.log('SET redis:', reply)
        resolve(reply)
      })
    })
  }

  get(key) {
    if (!this.client) return Promise.resolve(null)
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err)
          return
        }

        // reply is null when the key is missing
        console.log('GET redis:', reply)
        resolve(reply)
      })
    })
  }

  // NOTE: TBD if I hash the data?
  push(key, value) {
    if (!this.client) return Promise.resolve(null)
    return new Promise((resolve, reject) => {
      this.client.rpush(key, value, (err, reply) => {
        // callback
        console.log('PUSH redis:', reply)
        resolve(reply)
      })
    })
  }

  pop(key) {
    if (!this.client) return Promise.resolve(null)
    return new Promise((resolve, reject) => {
      this.client.lpop(key, (err, reply) => {
        // callback
        console.log('POP redis:', reply)
        resolve(reply)
      })
    })
  }

  sync() {
    // TODO:
    // replicate entirety of redis data to this node
  }
}

const r = new RedisProvider()
r.connect()

module.exports = r
