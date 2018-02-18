const CLOSING = 0x88;

/**
 * Identify closing message
 * @param {Buffer} data
 */
module.exports = data => data[0] === CLOSING;
