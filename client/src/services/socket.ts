import { io, Socket } from 'socket.io-client';
import { API } from '../const/api';

let socket: Socket;

export const initSocket = (onMessage: (note: string) => void) => {
  socket = io(API.baseUrl); // Change if backend is deployed

  socket.on('connect', () => {
    console.log('Socket.IO connected');
  });

  socket.on('add', (note: string) => {
    onMessage(note);
  });

  socket.on('disconnect', () => {
    console.log('Socket.IO disconnected');
  });
};

export const sendTask = (note: string) => {
  if (socket && socket.connected) {
    socket.emit('add', note);
  }
};
