/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
class NotesHandler{
  constructor(service, validator){
    this._service = service;
    this._validator = validator;

    this.postNoteHandler = this.postNoteHandler.bind(this);
    this.getNotesHandler = this.getNotesHandler.bind(this);
    this.getNoteByIdHandler = this.getNoteByIdHandler.bind(this);
    this.putNoteByIdHandler = this.putNoteByIdHandler.bind(this);
    this.deleteNoteByIdHandler = this.deleteNoteByIdHandler.bind(this);
  }

  postNoteHandler(request, h){
    this._validator.validateNotePayload(request.payload);
    const { title = 'untitled', body, tags } = request.payload;

    const noteId = this._service.addNote({ title, body, tags });

    const response = h.response({
      status: 'success',
      message: 'Catatan Berhasil Dibuat',
      data: {
        noteId,
      }
    });

    response.code(201);
    return response;
  }

  getNotesHandler(){
    const notes = this._service.getNotes();

    return {
      status: 'success',
      data: {
        notes,
      }
    };
  }

  getNoteByIdHandler(request){
    const { id } = request.params;
    const note = this._service.getNoteById(id);

    return {
      status: 'success',
      data: {
        note,
      }
    };
  }

  putNoteByIdHandler(request){
    this._validator.validateNotePayload(request.payload);
    const { id } = request.params;
    this._service.editNoteById(id, request.payload);

    return {
      status: 'success',
      message: 'Catatan Berhasil Di Ubah',
    };
  }

  deleteNoteByIdHandler(request){
    const { id } = request.params;
    this._service.deleteNoteById(id);

    return {
      status: 'success',
      message: 'Catatan Berhasil Di Hapus',
    };
  }
}

module.exports = NotesHandler;