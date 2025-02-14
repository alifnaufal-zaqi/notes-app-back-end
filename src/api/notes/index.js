/* eslint-disable linebreak-style */

const NotesHandler = require('./handler');
const routes = require('./routes');

// eslint-disable-next-line linebreak-style
module.exports = {
  name: 'notes',
  version: '1.0.0',
  register: async (server, { service }) => {
    const notesHandler = new NotesHandler(service);
    server.route(routes(notesHandler));
  }
};