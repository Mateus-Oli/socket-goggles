/**
 * Http Status Text
 * @param {number} status
 * @returns {string}
 */
module.exports = status => STATUS[status] || 'Unknown';

const STATUS = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  103: 'Early Hints',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  300:  'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  418: 'I\'m a teapot',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout'
};
