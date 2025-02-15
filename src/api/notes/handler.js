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

  async postNoteHandler(request, h){
    this._validator.validateNotePayload(request.payload);
    const { title = 'untitled', body, tags } = request.payload;

    const noteId = await this._service.addNote({ title, body, tags });

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

  async getNotesHandler(){
    const notes = await this._service.getNotes();

    return {
      status: 'success',
      data: {
        notes,
      }
    };
  }

  async getNoteByIdHandler(request){
    const { id } = request.params;
    const note = await this._service.getNoteById(id);

    return {
      status: 'success',
      data: {
        note,
      }
    };
  }

  async putNoteByIdHandler(request){
    this._validator.validateNotePayload(request.payload);
    const { id } = request.params;
    await this._service.editNoteById(id, request.payload);

    return {
      status: 'success',
      message: 'Catatan Berhasil Di Ubah',
    };
  }

  async deleteNoteByIdHandler(request){
    const { id } = request.params;
    await this._service.deleteNoteById(id);

    return {
      status: 'success',
      message: 'Catatan Berhasil Di Hapus',
    };
  }
}

module.exports = NotesHandler;