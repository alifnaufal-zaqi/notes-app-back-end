/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
const ClientError = require('./ClientError');

class InvariantError extends ClientError{
  constructor(message){
    super(message);
    this.name = 'InvariantError';
  }
}

module.exports = InvariantError;