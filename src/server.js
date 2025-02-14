/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
const NotesService = require('./services/inMemory/NotesService');

const init = async () => {
  const notesService = new NotesService();

  const server = Hapi.Server({
    port: '5000',
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      }
    }
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
    }
  });

  await server.start();
  console.log(`Server bejalan pada ${server.info.uri}`);
};

init();