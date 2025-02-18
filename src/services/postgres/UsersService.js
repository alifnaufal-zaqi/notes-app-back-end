const { Pool } = require("pg");
const { user } = require("pg/lib/defaults");
const InvariantError = require("../../exceptions/InvariantError");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const NotFoundError = require("../../exceptions/NotFoundError");

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username);
    const userId = `user-${nanoid(16)}`;

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3,  $4) RETURNING id",
      values: [userId, username, hashedPassword, fullname],
    };

    const resutl = await this._pool.query(query);

    if (!resutl.rows.length) {
      throw new InvariantError("User gagal ditambahkan");
    }

    return resutl.rows[0].id;
  }

  async verifyNewUsername(username) {
    const query = {
      text: "SELECT username FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvariantError(
        "Gagal menambahkan user. Username sudah digunakan."
      );
    }
  }

  async getUserById(userId) {
    const query = {
      text: "SELECT id, username, fullname FROM users WHERE id = $1",
      values: [userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError("User tidak ditemukan");
    }

    return result.rows[0];
  }
}

module.exports = UsersService;
