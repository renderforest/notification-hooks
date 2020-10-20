
const dgram = require('dgram')

function log_over_UDP (host, port, message, url, tag) {
  const client = dgram.createSocket('udp4')
  const logObject = url + ' ' + message + ' ' + tag
  const m = Buffer.from(JSON.stringify(logObject))
  client.send(m, 0, m.length, port, host, function (err, bytes) {
    console.log(err)
    client.close()
  })
}

exports = {
  log_over_UDP
}
