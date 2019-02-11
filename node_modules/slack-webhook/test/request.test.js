'use strict'

require('./helper')

var request = require('../lib/request')
var nock = require('nock')

describe('request', function () {
  beforeEach(function () {
    this.url = 'https://hooks.slack.com/services/foo/bar/baz'
    this.body = {
      text: 'a message'
    }
  })

  describe('#post', function () {
    it('returns a promise', function () {
      var promise = request.post(this.url, this.body, Promise)

      expect(promise).to.be.an.instanceOf(Promise)
    })

    context('Success', function () {
      beforeEach(function () {
        this.slackMock = nock('https://hooks.slack.com')
        .post('/services/foo/bar/baz', this.body)
        .reply(200, 'ok')
      })

      it('sends a post request', function (done) {
        request.post(this.url, this.body, Promise).then((res) => {
          expect(this.slackMock.isDone()).to.eql(true)

          done()
        }).catch(done)
      })

      it('resolves with response data', function (done) {
        request.post(this.url, this.body, Promise).then((res) => {
          expect(res).to.eql('ok')

          done()
        }).catch(done)
      })
    })

    context('request failure', function () {
      beforeEach(function () {
        this.slackMock = nock('https://hooks.slack.com')
        .post('/services/foo/bar/baz', this.body)
        .reply(400, 'error')
      })

      it('rejects with response data when a response code of 400 or higher is given', function (done) {
        request.post(this.url, this.body, Promise).catch((err) => {
          expect(err).to.eql('error')
          done()
        })
      })
    })
  })
})
