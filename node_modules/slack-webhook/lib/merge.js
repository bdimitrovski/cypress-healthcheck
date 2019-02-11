'use strict'

function merge (defaultObject, overrideObject) {
  var newObject = JSON.parse(JSON.stringify(defaultObject))

  for (var key in overrideObject) {
    if (overrideObject.hasOwnProperty(key)) {
      newObject[key] = overrideObject[key]
    }
  }

  return newObject
}

module.exports = merge
