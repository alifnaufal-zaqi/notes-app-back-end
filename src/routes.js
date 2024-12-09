/* eslint-disable linebreak-style */

const { addNotesHandler, getAllNotesHandler, getNoteById, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handler');

// eslint-disable-next-line no-unused-vars, linebreak-style
const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNotesHandler
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteById,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  }
];

module.exports = routes;