const mask = require('../utils/mask');

// PAYLOAD = BUFFER - MASK - FIRST
const PAYLOAD126 = 132;

const MASK_START = 2;
const PAYLOAD_START = 6;

const MASK_START_PAYLOAD126 = 4;
const PAYLOAD_START_PAYLOAD126 = 8;

const MASK = (buffer = { length: 0 }) => buffer.length >= PAYLOAD126 ? MASK_START_PAYLOAD126 : MASK_START;
const PAYLOAD = (buffer = { length: 0 }) => buffer.length >= PAYLOAD126 ? PAYLOAD_START_PAYLOAD126 : PAYLOAD_START;

/**
 * Decode message buffer to string
 * @param {Buffer} buffer
 */
const decode = buffer => mask(getMask(buffer))(getPayload(buffer));

/**
 * Encode message to buffer
 * @param {string} str
 */
const encode = str => Buffer.concat([ Buffer.from([0x81, str.length]), Buffer.from(str) ]);

module.exports = { encode, decode };

const getPayload = buffer => buffer.slice(PAYLOAD(buffer));
const getMask = buffer => buffer.slice(MASK(buffer), PAYLOAD(buffer));
