const db = require('../db/index.js');

function getAllTests(callback) {
  const sql = 'SELECT * FROM answ_test';
  db.query(sql, (err, results) => {
    callback(err, results);
  });
}

module.exports = {
  getAllTests
};