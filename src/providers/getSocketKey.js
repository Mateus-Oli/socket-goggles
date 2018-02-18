const { IncomingMessage } = require('http');

const WEBSOCKET_KEY = 'Sec-WebSocket-Key';
const VALUE = 1;

/**
 * Get key provided by client
 * @param {IncomingMessage} req
 * @returns {string}
 */
module.exports = req => typeof req === 'string' ? req : getHeader(req);

const getHeader = (req, header = WEBSOCKET_KEY) => req && req.rawHeaders[req.rawHeaders.indexOf(header) + VALUE];
