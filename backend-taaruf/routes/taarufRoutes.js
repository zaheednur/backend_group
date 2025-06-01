const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all
router.get('/', (req, res) => {
  db.query('SELECT id, nama, jenis_kelamin, usia FROM taaruf', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// GET one
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM taaruf WHERE id = ?', [req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// POST
router.post('/', (req, res) => {
  const data = req.body;
  db.query('INSERT INTO taaruf SET ?', data, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Data inserted', id: result.insertId });
  });
});

// PUT
router.put('/:id', (req, res) => {
  // Copy req.body dan hapus created_at supaya tidak error
  const dataToUpdate = { ...req.body };
  delete dataToUpdate.created_at;
  delete dataToUpdate.updated_at; // jika ada juga

  console.log('Data untuk update:', dataToUpdate);

  db.query('UPDATE taaruf SET ? WHERE id = ?', [dataToUpdate, req.params.id], (err) => {
    if (err) {
      console.error('Update error:', err);
      return res.status(500).json({ message: 'Gagal update data', error: err });
    }
    res.json({ message: 'Data updated' });
  });
});


// DELETE
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM taaruf WHERE id = ?', [req.params.id], (err) => {
    if (err) throw err;
    res.json({ message: 'Data deleted' });
  });
});

module.exports = router;
