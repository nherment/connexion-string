
var assert = require('assert')

var ConnStr = require('../index.js')

var connStr = new ConnStr({
  user: 'user', // default user
  port: 22 // default port
})

describe('connexion-string', function() {

  describe('deserialize', function() {

    it('host', function() {
      var server = connStr.parse('127.0.0.1')

      assert.ok(server)
      assert.equal(server.host, '127.0.0.1')
      assert.equal(server.port, 22)
      assert.equal(server.user, 'user')
      assert.equal(server.password, undefined)
    })

    it('user@host', function() {
      var server = connStr.parse('myName@127.0.0.1')

      assert.ok(server)
      assert.equal(server.host, '127.0.0.1')
      assert.equal(server.port, 22)
      assert.equal(server.user, 'myName')
      assert.equal(server.password, undefined)
    })

    it('user@host:port', function() {
      var server = connStr.parse('myName@127.0.0.1:2222')

      assert.ok(server)
      assert.equal(server.host, '127.0.0.1')
      assert.equal(server.port, 2222)
      assert.equal(server.user, 'myName')
      assert.equal(server.password, undefined)
    })

    it('user:pwd@host:port', function() {
      var server = connStr.parse('myName:123456@127.0.0.1:2222')

      assert.ok(server)
      assert.equal(server.host, '127.0.0.1')
      assert.equal(server.port, 2222)
      assert.equal(server.user, 'myName')
      assert.equal(server.password, '123456')
    })

  })


  describe('serialize', function() {

    it('host', function() {
      var expectedStr = '127.0.0.1'
      var server = connStr.parse(expectedStr)
      var actualStr = connStr.stringify(server)

      assert.ok(actualStr)
      assert.equal(actualStr, 'user@127.0.0.1:22')
    })

    it('user@host', function() {

      var expectedStr = 'myName@127.0.0.1'
      var server = connStr.parse(expectedStr)
      var actualStr = connStr.stringify(server)

      assert.ok(actualStr)
      assert.equal(actualStr, 'myName@127.0.0.1:22')
    })

    it('user@host:port', function() {

      var expectedStr = 'myName@127.0.0.1:2222'
      var server = connStr.parse(expectedStr)
      var actualStr = connStr.stringify(server)

      assert.ok(actualStr)
      assert.equal(actualStr, expectedStr)
    })

    it('user:pwd@host:port', function() {

      var expectedStr = 'myName:123456@127.0.0.1:2222'
      var server = connStr.parse(expectedStr)
      var actualStr = connStr.stringify(server)

      assert.ok(actualStr)
      assert.equal(actualStr, expectedStr)
    })

  })
})
