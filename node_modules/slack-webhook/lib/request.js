'use strict'

var https = require('https')
var parseUrl = require('url').parse

function post (endpoint, body, PromiseWrapper) {
  var url = parseUrl(endpoint)
  var payload = JSON.stringify(body)

  return new PromiseWrapper(function (resolve, reject) {
    var responseData = ''
    var req = https.request({
      hostname: url.hostname,
      path: url.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }, function (response) {
      var code = response.statusCode

      response.on('data', function (chunk) {
        responseData += chunk
      })
      response.on('end', function () {
        if (code < 400) {
          resolve(responseData)
        } else {
          reject(responseData)
        }
      })
    })

    req.on('error', function (error) {
      reject(error.message)
    })

    req.write(payload)
    req.end()
  })
}

module.exports = {
  post: post
}
