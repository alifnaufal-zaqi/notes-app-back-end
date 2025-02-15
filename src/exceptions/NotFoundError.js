/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
const ClientError = require('./ClientError');

class NotFoundError extends ClientError{
  constructor(message){
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;