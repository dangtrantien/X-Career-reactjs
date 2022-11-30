import io from 'socket.io-client';

// const socket = io.connect('https://x-career-06-team1-be.as.r.appspot.com');
const socket = io.connect('http://localhost:3002');

export default class SocketIo {
  contrustor() {}

  user = (data) => {
    socket.emit('user', data);
  };

  workspace = (data) => {
    socket.emit('workspace', data);
  };

  board = (data) => {
    socket.emit('board', data);
  };

  task = (data) => {
    socket.emit('task', data);
  };

  receiveComment = (data) => {
    socket.emit('receive_comment', data);
  };

  editComment = (data) => {
    socket.emit('edit_comment', data);
  };
}
