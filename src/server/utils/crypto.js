class Crypto {
  constructor(code) {
    this.encryptor = require('simple-encryptor')('some-uber-secure-key' + code)
  }

  encrypt(o) {
    return encodeURIComponent(this.encryptor.encrypt(o));
  }

  decrypt(o) {
    return this.encryptor.decrypt(decodeURIComponent(o));
  }
}

module.exports = Crypto