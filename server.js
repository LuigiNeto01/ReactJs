import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Adicione a senha do seu MySQL se houver
  database: 'biblioteca'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected');
});

app.post('/addBook', (req, res) => {
  const book = req.body;
  const sql = 'INSERT INTO livros (name, pages, description, coverUrl) VALUES (?, ?, ?, ?)';
  db.query(sql, [book.name, book.pages, book.description, book.coverUrl], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ id: result.insertId, ...book });
  });
});

app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM livros';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(results);
  });
});

app.delete('/deleteBook/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM livros WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ message: 'Livro excluído com sucesso!' });
  });
});

app.put('/updateBook/:id', (req, res) => {
  const { id } = req.params;
  const { name, pages, description, coverUrl } = req.body;
  const sql = 'UPDATE livros SET name = ?, pages = ?, description = ?, coverUrl = ? WHERE id = ?';
  db.query(sql, [name, pages, description, coverUrl, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send({ id, name, pages, description, coverUrl });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
