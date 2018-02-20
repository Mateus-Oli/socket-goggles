/**
 * Make data transferable (stringify)
 * @param {any} data
 */
module.exports = data => typeof data === 'string' ? data : JSON.stringify(data);
