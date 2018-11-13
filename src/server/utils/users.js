const Crypto = require('./crypto');
const User = require('./user');

class Users {
    constructor() {
        this.users = [];
    }

    addUser(ID, userName, roomID) {
        this.users.push(new User(...arguments, this.getRandomColor()));
    }
    getUserByID(ID) {
        return this.users.find(usr => usr.id == ID);
    }
    removeUserByID(ID) {
        this.users = this.users.filter(usr => usr.id != ID);
    }
    createToken(roomID, userName, code) {
        let crypto = new Crypto(code);
        let token = crypto.encrypt({ roomID, userName })
        return token;
    }
    decodeToken(code, token) {
        let decryptor = new Crypto(code);
        let decrypted = decryptor.decrypt(token);
        return decrypted;
    }
    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getUsersListByRoomID(roomid) {
        let list = this.users.filter(user => user.roomID == roomid);
        return list;
    }

}

module.exports = Users;