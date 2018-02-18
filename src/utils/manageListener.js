const { EventEmitter } = require('events');

/**
 * Creates listener for emitter and return a function to remove listener
 * @template T
 * @param {EventEmitter} emitter
 * @return {(event: string, listener: (data: T) => any) => () => EventEmitter}
 */
module.exports = emitter => (event, listener) => {
  emitter.addListener(event, listener);
  return () => emitter.removeListener(event, listener);
};
