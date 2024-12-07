import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(userId) {
    const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
    
    this.socket = io(SOCKET_URL, {
      query: { userId },
      withCredentials: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });
  }

  subscribeToMessages(callback) {
    if (!this.socket) return;
    this.socket.on('new-message', callback);
  }

  sendMessage(recipientId, content) {
    if (!this.socket) return;
    this.socket.emit('send-message', {
      recipientId,
      content,
    });
  }

  joinRoom(roomId) {
    if (!this.socket) return;
    this.socket.emit('join-room', roomId);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new SocketService();