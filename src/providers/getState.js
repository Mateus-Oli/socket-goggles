const { Socket } = require('net');

/**
 * State string of Socket
 * @param {Socket} socket
 * @returns {keyof STATES}
 */
module.exports = socket => Object.keys(STATES).find(state => STATES[state](socket));

const open = socket => !socket.connecting && !socket.destroyed;
const close = socket => socket.destroyed;
const connect = socket => socket.connecting;

const STATES = { open, connect, close };
