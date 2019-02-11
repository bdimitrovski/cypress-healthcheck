'use strict'

require('./helper')

var SlackWebhook = require('../')
var request = require('../lib/request')
var bluebird = require('bluebird')

describe('SlackWebhook', function () {
  beforeEach(function () {
    this.slackEndpoint = 'https://hooks.slack.com/services/id/id/id'
    sandbox.stub(request, 'post').returns(Promise.resolve('ok'))
  })

  describe('initialization', function () {
    it('initilializes with a url', function () {
      var slack = new SlackWebhook(this.slackEndpoint)

      expect(slack).to.exist
    })

    it('throws an error when url is not passed in', function () {
      expect(function () {
        var slack = new SlackWebhook() // eslint-disable-line no-unused-vars
      }).to.throw('Must include Slack webhook endpoint')
    })
  })

  describe('#send', function () {
    it('returns a promise', function () {
      var slack = new SlackWebhook(this.slackEndpoint)
      var promise = slack.send()

      expect(promise).to.be.an.instanceof(Promise)
    })

    context('string argument', function () {
      it('posts string to slack provided endpoint', function (done) {
        var slack = new SlackWebhook(this.slackEndpoint)

        slack.send('a message').then((res) => {
          expect(request.post).to.be.calledOnce
          expect(request.post).to.be.calledWith(this.slackEndpoint, {
            text: 'a message'
          })

          done()
        }).catch(done)
      })

      it('uses defaults for payload', function (done) {
        var slack = new SlackWebhook(this.slackEndpoint, {
          defaults: {
            username: 'a username',
            icon_emoji: ':cat:',
            channel: '#channel'
          }
        })

        slack.send('a message').then((res) => {
          expect(request.post).to.be.calledOnce
          expect(request.post).to.be.calledWith(this.slackEndpoint, {
            username: 'a username',
            icon_emoji: ':cat:',
            channel: '#channel',
            text: 'a message'
          })

          done()
        }).catch(done)
      })
    })

    context('payload argument', function () {
      it('posts payload to slack provided endpoint', function (done) {
        var payload = {
          text: 'a text message',
          icon_emoji: ':robot_face:',
          username: 'robot'
        }

        var slack = new SlackWebhook(this.slackEndpoint)

        slack.send(payload).then((res) => {
          expect(request.post).to.be.calledOnce
          expect(request.post).to.be.calledWith(this.slackEndpoint, payload)

          done()
        }).catch(done)
      })

      it('uses defaults for payload', function (done) {
        var slack = new SlackWebhook(this.slackEndpoint, {
          defaults: {
            username: 'a username',
            icon_emoji: ':cat:',
            channel: '#channel'
          }
        })

        var payload = {
          text: 'a text message',
          attachments: [{
            fallback: 'plain text summary of attachment',
            color: '#36a64f',
            title: 'attacment title',
            text: 'optional attachment text'
          }]
        }

        slack.send(payload).then((res) => {
          expect(request.post).to.be.calledOnce
          expect(request.post).to.be.calledWith(this.slackEndpoint, {
            username: 'a username',
            icon_emoji: ':cat:',
            channel: '#channel',
            text: 'a text message',
            attachments: payload.attachments
          })

          done()
        }).catch(done)
      })

      it('overrides defaults if provided', function (done) {
        var slack = new SlackWebhook(this.slackEndpoint, {
          defaults: {
            username: 'a username',
            icon_emoji: ':cat:',
            channel: '#channel'
          }
        })

        var payload = {
          text: 'a text message',
          username: 'another username',
          icon_emoji: ':scream:',
          attachments: [{
            fallback: 'plain text summary of attachment',
            color: '#36a64f',
            title: 'attacment title',
            text: 'optional attachment text'
          }]
        }

        slack.send(payload).then((res) => {
          expect(request.post).to.be.calledOnce
          expect(request.post).to.be.calledWith(this.slackEndpoint, {
            username: 'another username',
            icon_emoji: ':scream:',
            channel: '#channel',
            text: 'a text message',
            attachments: payload.attachments
          })

          done()
        }).catch(done)
      })
    })

    context('custom Promise library', function () {
      it('passes in configured Promise library', function (done) {
        var slack = new SlackWebhook(this.slackEndpoint, {
          Promise: bluebird
        })

        slack.send('a message').then((res) => {
          expect(request.post).to.be.calledWith(this.slackEndpoint, {
            text: 'a message'
          }, bluebird)

          done()
        }).catch(done)
      })

      it('can configure promise library after initialization', function (done) {
        var slack = new SlackWebhook(this.slackEndpoint)

        slack.Promise = bluebird

        slack.send('a message').then((res) => {
          expect(request.post).to.be.calledWith(this.slackEndpoint, {
            text: 'a message'
          }, bluebird)

          done()
        }).catch(done)
      })
    })
  })
})
