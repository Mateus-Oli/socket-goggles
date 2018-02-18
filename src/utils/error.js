let error;
/**
 * @template T
 * @param {T} error error to be thrown
 * @throws {T}
 * @returns {never}
 */
module.exports = error = error => { throw error; };
