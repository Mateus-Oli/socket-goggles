const{ Socket } = require('net');
const { createHash } = require('crypto');

const headers = require('./httpHeader');

const GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const WEBSOCKET_ACCEPT = 'Sec-Websocket-Accept';
const STATUS = 101;

/**
 * Writes a response to accept the handshake
 * @param {Socket} socket
 * @param {string} key
 */
module.exports = (socket, key) => {
  const hash = socketAccept(key);
  socket.write(webSocketHeaders(hash));

  return hash;
};

const webSocketHeaders = key => headers(STATUS)({
  Connection: 'Upgrade',
  Upgrade: 'WebSocket',
  [WEBSOCKET_ACCEPT]: key
});
const socketAccept = key => createHash('sha1').update(`${key}${GUID}`).digest('base64');
