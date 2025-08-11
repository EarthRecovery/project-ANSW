const db = require('../utils/db');

const User = {
  async create({ username, password_hash, permission, points, level, is_disabled, avatar_url }) {
    const [result] = await db.execute(
      `INSERT INTO user (username, password_hash, permission, points, level, is_disabled, avatar_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [username, password_hash, permission, points, level, is_disabled, avatar_url]
    );
    return result.insertId;
  },

  async findById(id) {
    const [rows] = await db.execute(`SELECT * FROM user WHERE id = ?`, [id]);
    return rows[0];
  },

  async findByUsername(username) {
    const [rows] = await db.execute(`SELECT * FROM user WHERE username = ?`, [username]);
    return rows[0];
  },

  async updateById(id, fields) {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const setClause = keys.map(key => `${key} = ?`).join(', ');

    const [result] = await db.execute(
      `UPDATE user SET ${setClause} WHERE id = ?`,
      [...values, id]
    );
    return result.affectedRows;
  },

  async deleteById(id) {
    const [result] = await db.execute(`DELETE FROM user WHERE id = ?`, [id]);
    return result.affectedRows;
  },

  async findAll() {
    const [rows] = await db.execute(`SELECT * FROM user`);
    return rows;
  }
};

module.exports = User;
