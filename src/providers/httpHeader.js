const  getStatus = require('./statusCode');

const PROTOCOL = 'HTTP';
const EOL = '\r\n';

/**
 * Creates a Http headers string
 * @param {number} status
 */
module.exports = status => (headers = {}) => Object
  .keys(headers)
  .reduce(
    (acc, header) => `${acc}${header}: ${headers[header]}${EOL}`,
    statusLine(status)
  ) + EOL;

const statusLine = (status = 200, version = 1.1, statusName = getStatus(status)) => `${PROTOCOL}/${version} ${status} ${statusName}${EOL}`;
