const expect = require('expect');
const Rooms = require('./rooms');
const Crypto = require('./crypto');

describe('Rooms', () => {
  let rooms;

  beforeEach(() => {
    rooms = new Rooms();
    rooms.addRoom('1', '1111');
    rooms.addRoom('2', '1112');
    rooms.addRoom('3', '1113');

    rooms.addUserToRoom('1', 'Andrew', 'hash1')
    rooms.addUserToRoom('1', 'Adam', 'hash2')
    rooms.addUserToRoom('2', 'Aaron', 'hash3')
    rooms.addUserToRoom('2', 'Anthony', 'hash4')
    rooms.addUserToRoom('3', 'Arthur', 'hash5')

  });

  it('should find a room', () => {
    expect(rooms.getRoomById('2')).toBeDefined();
  });

  it('should  not find a room', () => {
    expect(rooms.getRoomById('4')).toBeUndefined();
  });

  it('should add user to the room', () => {
    rooms.addUserToRoom('1', 'Antonio', 'hash6');
    expect(rooms.rooms[0].users.length).toBe(3);
  });
  it('should not add user to the room', () => {
    rooms.addUserToRoom('1', 'Andrew', 'hash1')
    rooms.addUserToRoom('7', 'Andrew', 'hash1');
    expect(rooms.rooms[0].users.length).toBe(2);
    expect(rooms.addUserToRoom('1', 'Andrew', 'hash1')).toBeFalsy();
    expect(rooms.addUserToRoom('7', 'Andrew', 'hash1')).toBeFalsy();
  });

  it('should return user Hash', () => {
    expect(rooms.getUserHash('3', 'Arthur')).toEqual('hash5');
  })
  it('should not return user Hash', () => {
    expect(rooms.getUserHash('6', 'Arthur')).toBeFalsy();
  })
  it('should remove user', () => {
    rooms.removeUserFromRoom('1', 'Andrew');
    expect(rooms.rooms[0].users.length).toBe(1);
  })

})