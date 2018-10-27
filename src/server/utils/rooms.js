const Room = require('./room');

class Rooms{
    constructor(){
        this.rooms = [];    
    }
    addRoom(id, code){
        if(!this.getRoomById(id)){
            this.rooms.push(new Room(id, code));
            return this.getRoomById(id)
        }else{
            return false;
        }
    }

    getRoomById(id){
        return this.rooms.find(room => room.id == id);
    }
    getRoomByCode(code){
        return this.rooms.find(room => room.code == code);
    }
    
    addUserToRoom(id, userName, hash){
        let room = this.getRoomById(id);
        if(room){
            let exist = room.users.find(user => user.userName == userName);
            if(!exist){
                room.users.push({userName, hash});
            }else{
                return false
            }
        }else{
            return false;
        }
    }
    getUserHash(id, userName){
        let room = this.getRoomById(id);
        if(room){
            let usr = room.users.find(user => user.userName == userName);
            if(usr){
                return usr.hash
            }
        }else{
            return false;
        }
    }
    checkIfHashExist(hash){
        let result = this.rooms.filter(elem => elem.users.find(user => user.hash == hash));
        if(result.length){
            return true;
        }else{
            return false;
        }
    }

    removeUserFromRoom(id, userName){
        let room = this.getRoomById(id);
        if(room){
            room.users = room.users.filter(user => user.userName !== userName);
        }else{
            return false;
        }
    }

}

module.exports = Rooms;