/**
 * masks(xor) provided string
 * @param {Buffer | } mask
 * @returns {(str: string) => string}
 */
module.exports = mask => str => String.fromCharCode(...xorArray(asCodes(mask))(asCodes(str)));

const xorArray = mask => data => data.map((c, i) => c ^ mask[i % mask.length]);

const asCodes = str => [...str].map(getCode);
const getCode = str => typeof str === 'string' ? str.charCodeAt(0) : str;
