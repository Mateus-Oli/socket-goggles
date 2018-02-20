const { IncomingMessage } = require('http');
const { Socket } = require('net');

const manageListener = require('../utils/manageListener');

const isClose = require('../providers/isClose');
const getState = require('../providers/getState');
const transferable = require('../providers/transferable');
const getSocketKey  = require('../providers/getSocketKey');
const acceptHandshake = require('../providers/acceptHandshake');

const { decode, encode } = require('../providers/encodeDecode');

module.exports = class WebSocket {

  /**
   * State string of WebSocket
   */
  get state() { return getState(this.socket); }

  /**
   * Creates WebSocket
   * @param {Socket} socket
   * @param {IncomingMessage | string} res
   */
  constructor(socket, res) {
    this.key = getSocketKey(res);
    this.socket = socket;
  }

  /**
   * Emits data to client
   * @param {string} data
   */
  emit(data) {
    return this.socket.write(encode(transferable(data)));
  }

  /**
   * Listen for client data
   * @param {(data: string) => any} listener
   */
  onEmit(listener) {
    return manageListener(this.socket)('data', buffer => isClose(buffer) ? this.close() : listener(decode(buffer)));
  }

  /**
   * Listen for errors from client
   * @param {(error: Error) => any} listener
   */
  onError(listener) {
    return manageListener(this.socket)('error', listener);
  }

  /**
   * Closes client connection
   */
  close() {
    return this.socket.end();
  }

  /**
   * Listen for client closing connection
   * @param {() => any} listener
   */
  onClose(listener) {
    return manageListener(this.socket)('end', listener);
  }

  /**
   * Completes handshake with client
   * @param {string} key
   */
  handshake(key = this.key) {
    return this.hash = acceptHandshake(this.socket, this.key = getSocketKey(key));
  }
}
