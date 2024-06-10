import React from 'react';

const BookList = ({ books, deleteBook, startEditingBook }) => {
  return (
    <div className="book-list">
      <h2>Lista de Livros</h2>
      <ul>
        {books.map(book => (
          <li key={book.id} className="book-item">
            <img src={book.coverUrl} alt={`${book.name} cover`} className="book-cover" />
            <h3>{book.name}</h3>
            <p>Páginas: {book.pages}</p>
            <p>Descrição: {book.description}</p>
            <button onClick={() => deleteBook(book.id)} className="btn-delete">Excluir</button>
            <button onClick={() => startEditingBook(book)} className="btn-edit">Editar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
