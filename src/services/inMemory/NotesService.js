/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style

const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

// eslint-disable-next-line no-unused-vars
class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString;
    const updatedAt = createdAt;

    const newNote = {
      id,
      title,
      body,
      tags,
      createdAt,
      updatedAt,
    };

    this._notes.push(newNote);

    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess){
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return id;
  }

  getNotes(){
    return this._notes;
  }

  getNoteById(id){
    const note = this._notes.filter((n) => n.id === id)[0];

    if (!note){
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    return note;
  }

  editNoteById(id, { title, body, tags }){
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1){
      throw new NotFoundError('Gagal memperbarui data catatan');
    }

    const updatedAt = new Date().toISOString;

    this._notes[index] = {
      ...this._notes[index],
      title,
      body,
      tags,
      updatedAt,
    };
  }

  deleteNoteById(id){
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1){
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;