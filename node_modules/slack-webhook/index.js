'use strict'

var request = require('./lib/request')
var merge = require('./lib/merge')

function SlackWebhook (url, options) {
  if (!url) throw new Error('Must include Slack webhook endpoint')

  options = options || {}
  var defaults = options.defaults || {}

  this._url = url
  this._defaults = {
    username: defaults.username,
    icon_emoji: defaults.icon_emoji,
    channel: defaults.channel
  }
  this.Promise = options.Promise || Promise
}

SlackWebhook.prototype._parsePayload = function parsePayload (payload) {
  var finalPayload

  if (typeof payload === 'string') {
    finalPayload = { text: payload }
  } else {
    finalPayload = payload
  }

  finalPayload = merge(this._defaults, finalPayload)

  return finalPayload
}

SlackWebhook.prototype.send = function send (payload) {
  var finalPayload = this._parsePayload(payload)

  return request.post(this._url, finalPayload, this.Promise)
}

module.exports = SlackWebhook
