const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(process.env.DB_PATH);

// GET ALL
exports.findAll = () =>
  new Promise((resolve, reject) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });

// GET BY ID
exports.findById = (id) =>
  new Promise((resolve, reject) => {
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });

// CREATE
exports.create = (task) =>
  new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO tasks (title, description, status, priority)
       VALUES (?, ?, ?, ?)`,
      [task.title, task.description, task.status, task.priority],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, ...task });
      }
    );
  });

// UPDATE STATUS
exports.updateStatus = (id, status) =>
  new Promise((resolve, reject) => {
    db.run(
      'UPDATE tasks SET status = ? WHERE id = ?',
      [status, id],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      }
    );
  });

// DELETE
exports.remove = (id) =>
  new Promise((resolve, reject) => {
    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });

// STATS
exports.getStats = () =>
  new Promise((resolve, reject) => {
    db.all(
      `SELECT status, COUNT(*) as count
       FROM tasks
       GROUP BY status`,
      [],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
