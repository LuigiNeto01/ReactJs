import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './BookList';
import AddFormBlock from './addFormBlock';
import EditFormBlock from './EditFormBlock';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [editBookData, setEditBookData] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros', error);
    }
  };

  const addBook = async (name, pages, description, coverUrl) => {
    try {
      const response = await axios.post('http://localhost:5000/addBook', {
        name,
        pages,
        description,
        coverUrl
      });
      setBooks([...books, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar livro', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteBook/${id}`);
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Erro ao excluir livro', error);
    }
  };

  const updateBook = async (id, name, pages, description, coverUrl) => {
    try {
      const response = await axios.put(`http://localhost:5000/updateBook/${id}`, {
        name,
        pages,
        description,
        coverUrl
      });
      setBooks(books.map(book => (book.id === id ? response.data : book)));
      setEditBookData(null);
    } catch (error) {
      console.error('Erro ao atualizar livro', error);
    }
  };

  const startEditingBook = (book) => {
    setEditBookData(book);
  };

  return (
    <div className="container">
      <h1>Biblioteca</h1>
      <AddFormBlock addBook={addBook} />
      {editBookData && (
        <EditFormBlock
          book={editBookData}
          updateBook={updateBook}
          cancelEditing={() => setEditBookData(null)}
        />
      )}
      <BookList books={books} deleteBook={deleteBook} startEditingBook={startEditingBook} />
    </div>
  );
};

export default App;
