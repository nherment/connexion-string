


    var ConnStr = require('connexion-string')


    var connStr = new ConnStr({
      user: 'user', // default user
      port: 22 // default port
    })


    connStr.parse('myName:123456@127.0.0.1:2222')
    {
      host: '127.0.0.1'
      port: 2222,
      user: 'myName',
      password: '123456'
    }
