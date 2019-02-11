'use strict'

var chai = require('chai')
chai.use(require('sinon-chai'))
var sinon = require('sinon')

global.expect = chai.expect
global.sandbox = sinon.sandbox.create()

afterEach(function () {
  global.sandbox.restore()
})
