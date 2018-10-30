const Crypto = require('./crypto');
const User = require('./user');

class Chat {
    constructor() {
        this.tokens = [];
        this.users = [];
    }

    addUser(ID, userName, roomID) {
        this.users.push(new User(...arguments));
    }
    getUserByID(ID) {
        return this.users.find(usr => usr.id == ID);
    }
    removeUserByID(ID) {
        this.users = this.users.filter(usr => usr.id != ID);
    }

    createToken(roomID, userName, code) {
        let crypto = new Crypto(code);
        let obj = {
            ID: roomID,
            USER: userName
        }
        let token = crypto.encrypt(obj)
        this.tokens.push(token);
        return token;
    }

    decodeToken(code, token){
        var decryptor = new Crypto(decryptCode);
        var decrypted = decryptor.decrypt(token);
        
    }

    getToken(hash) {
        let tkn = this.tokens.find(token => token == hash);
        if (tkn) {
            return tkn;
        } else {
            return false
        }
    }
}

module.exports = Chat;