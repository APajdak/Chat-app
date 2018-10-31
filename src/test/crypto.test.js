const expect = require('expect');
const Crypto = require('../server/utils/crypto');

describe('Crypto', () => {

  it('should encrypt and decrypt correctly', () => {
    var code = 123456;
    var crypto = new Crypto(code);
    var obj = {
      ID: 123456,
      USERNAME: 'endriu'
    }
    var token = crypto.encrypt(obj);
    var decrypted = crypto.decrypt(token);
    expect(obj).toEqual(decrypted);
  })

  it('should return null if code is invalid', () => {
    var encryptCode = 123456;
    var encryptor = new Crypto(encryptCode);
    var obj = {
      ID: 123456,
      USERNAME: 'endriu'
    };
    var token = encryptor.encrypt(obj);

    var decryptCode = 123457;
    var decryptor = new Crypto(decryptCode);
    var decrypted = decryptor.decrypt(token);
    expect(decrypted).toBeNull;
  })

})
