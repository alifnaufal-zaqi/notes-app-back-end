/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
const InvariantError = require('../../exceptions/InvariantError');
const { NotePayloadSchema } = require('./schema');

const NotesValidator = {
  validateNotePayload: (payload) => {
    const validationResult = NotePayloadSchema.validate(payload);

    if (validationResult.error){
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = NotesValidator;