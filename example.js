var pssh = require('.')

var hosts = [{host: '127.0.0.1'}, {host: '192.168.1.1'}]

// Will default to the ~/.ssh/id_rsa.pem as per `ssh-exec`
var opts = {username: 'root'}

var sessions = pssh('cat -', hosts, opts, function (err) {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  process.exit(0)
})

process.stdin.pipe(sessions).pipe(process.stdout)
