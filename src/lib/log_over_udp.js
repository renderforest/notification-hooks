
const dgram = require('dgram')

function log_over_UDP (host, port, message, url, tag) {
  const client = dgram.createSocket('udp4')
  const logObject = tag + ': ' + url + ' | ' + message
  const m = Buffer.from(JSON.stringify(logObject))
  client.send(m, 0, m.length, port, host, function (err, bytes) {
    if (err) {
      console.log('UDP SEND ERROR', err)
    }
    client.close()
  })
}

module.exports = log_over_UDP
