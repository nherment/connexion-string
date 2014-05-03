function ConnString(defaults) {
  this._defaults = defaults || {}
}

ConnString.prototype.parse = function(str) {

  var connexion = {}

  for(var attr in this._defaults) {
    if(this._defaults.hasOwnProperty(attr)) {
      connexion[attr] = this._defaults[attr]
    }
  }

  var credentialsHost = str.split('@')

  if(credentialsHost.length > 1) {
    var credentials = parseCredentials(credentialsHost[0])
    var fullHost = parseHost(credentialsHost[1])
  } else {
    var fullHost = parseHost(str)
  }

  if(credentials) {
    connexion.user = credentials.user
    if(credentials.password) {
      connexion.password = credentials.password
    }
  }

  connexion.host = fullHost.host
  if(fullHost.port) {
    connexion.port = fullHost.port
  }


  return connexion
}

function parseCredentials(credentials) {
  var userPassword = credentials.split(':')
  if(userPassword.length > 1) {
    return {
      user: userPassword[0],
      password: userPassword[1]
    }
  } else {
    return {
      user: credentials
    }
  }
}
function parseHost(host) {
  var hostPort = host.split(':')
  if(hostPort.length > 1) {
    return {
      host: hostPort[0],
      port: Number(hostPort[1])
    }
  } else {
    return {
      host: host
    }
  }
}

module.exports = ConnString
