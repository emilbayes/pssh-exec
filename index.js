'use strict'

var ssh = require('ssh-exec')
var eos = require('end-of-stream')
var objectAssign = require('object-assign')
var multiDuplexStream = require('multi-duplex-stream')

module.exports = function PsshExec (cmd, hosts, opts, cb) {
  if (!(this instanceof PsshExec)) return new PsshExec(cmd, hosts, opts, cb)
  if (cb == null) cb = function noop () {}
  if (opts == null) opts = {}

  var sshStreams = multiDuplexStream.obj(hosts.map(function (host) {
    var stream = ssh(cmd, objectAssign(opts, host))

    return stream
  }))

  eos(sshStreams, cb)

  return sshStreams
}
