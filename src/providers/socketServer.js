
const { createServer } = require('http');
const { Socket } = require('net');

const error = require('../utils/error');

const WebSocket = require('../models/WebSocket');

/**
 * Creates WebSocket Server
 */
module.exports = (server = createServer()) => (listener = (webSocket = WebSocket.prototype, hash = webSocket.hash) => {}) => {

  /** @type {Socket[]} */
  const sockets = [];
  const listeners = [listener];

  const connection = (req, socket) => {
    const webSocket = new WebSocket(socket);

    const index = sockets.push(webSocket) - 1;
    webSocket.onClose(() => sockets.splice(index, 1));

    webSocket.handshake(req);
    listeners.forEach(listener => listener(webSocket));
  };

  server.on('upgrade', connection);

  return {
    server: () => server,
    sockets: () => sockets,
    remove: () => { server.removeListener('upgrade', connection); },
    broadcast: data => sockets.forEach(socket => socket.emit(data)),
    onConnect: (listener = (webSocket = WebSocket.prototype, hash = webSocket.hash) => { error(new Error('Provide Listener')) }) => listeners.push(listener),
    listen: server.listen.bind(server)
  };
};
