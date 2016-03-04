`pssh-exec`
===========

Execute a script over ssh in parallel using Node.js and pipe to and/or from all
sessions at once, or individual sessions. Inspired by `pssh(1)`

Installation
------------

```sh
npm install pssh-exec
```

Example
-------

```js
var pssh = require('pssh-exec')

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
```

Documentation
-------------

This is a high-level wrapper around [`ssh-exec`](https://github.com/mafintosh/ssh-exec)
and [`multi-duplex-stream`](https://github.com/emilbayes/multi-duplex-stream).

Of notice is `.add(stream)`, `.remove(stream)`, `.destroy([err])` and
the constructor:

#### `psshExec(cmd, hosts, [options], [cb])`

* `cmd` - The command to execute on each machine
* `hosts` - An array of hosts objects like the ones defined by `ssh-exec`.
  Can be as specific or general as needed to override the defaults defined by
  `ssh-exec`, and can override the `options` object
* `options` - *Optional*, defines the commonalities between the hosts.
  The `hosts` objects have [higher specificity](index.js#L14)
* `cb` - *Optional*, `callback(err)` called when the `multi-duplex-stream`
  completes or fails.

License
-------

[MIT](LICENSE)
