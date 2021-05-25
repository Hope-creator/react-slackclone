import {Server} from 'socket.io';
import http from 'http';

export default (http: http.Server) => {
  const io = new Server(http, {
    cors: {
      origin: "*"
    }
  });

  io.on('connection', function(socket: any) {
    socket.on('CONVERSATION:JOIN', (conversationId: string) => {
      socket.conversationId = conversationId;
      socket.join(conversationId);
    });
    socket.on('CONVERSATION:LEAVE', () => {
      socket.leave(socket.conversationId);
    });
    socket.on('DIALOGS:TYPING', (obj: any) => {
      socket.broadcast.emit('DIALOGS:TYPING', obj);
    });
  });

  return io;
};