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

    getToken(hash) {
        return this.tokens.find(token => token == hash);
    }
}
module.exports = Chat;