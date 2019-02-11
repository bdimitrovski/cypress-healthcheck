'use strict'

require('./helper')

var merge = require('../lib/merge')

describe('merge', function () {
  beforeEach(function () {
    this.defaultObject = {
      a: 'foo',
      b: 'bar'
    }
    this.overrideObject = {
      b: 'baz',
      c: 'qux'
    }
  })

  it('does not modify the original objects', function () {
    Object.seal(this.defaultObject)
    Object.seal(this.overrideObject)

    expect(() => {
      merge(this.defaultObject, this.overrideObject)
    }).to.not.throw()
  })

  it('returns a new object with the properties from the default object overriden by the properties of the override object', function () {
    var newObject = merge(this.defaultObject, this.overrideObject)

    expect(newObject).to.eql({
      a: 'foo',
      b: 'baz',
      c: 'qux'
    })
  })
})
