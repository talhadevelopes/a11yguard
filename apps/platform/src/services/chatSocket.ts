import { io, Socket } from 'socket.io-client';
import { API_BASE_URL } from './api';
import { useAuthStore } from '../stores/authStore';

let socket: Socket | null = null;

export const getChatSocket = (): Socket => {
  const token = useAuthStore.getState().token;
  if (!socket) {
    socket = io(API_BASE_URL, {
      transports: ['websocket'],
      auth: { token },
    });
  }
  return socket;
};

export const disconnectChatSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
