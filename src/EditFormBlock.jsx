import React, { useState, useEffect } from 'react';

const EditFormBlock = ({ book, updateBook, cancelEditing }) => {
  const [bookName, setBookName] = useState(book.name);
  const [pageCount, setPageCount] = useState(book.pages);
  const [description, setDescription] = useState(book.description);
  const [coverType, setCoverType] = useState('url');
  const [coverUrl, setCoverUrl] = useState(book.coverUrl);
  const [coverFile, setCoverFile] = useState(null);

  useEffect(() => {
    setBookName(book.name);
    setPageCount(book.pages);
    setDescription(book.description);
    setCoverUrl(book.coverUrl);
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let cover = coverUrl;
    if (coverType === 'file' && coverFile) {
      const reader = new FileReader();
      reader.onload = () => {
        updateBook(book.id, bookName, pageCount, description, reader.result);
      };
      reader.readAsDataURL(coverFile);
    } else {
      updateBook(book.id, bookName, pageCount, description, cover);
    }
  };

  const handleCoverTypeChange = (e) => {
    setCoverType(e.target.value);
    setCoverUrl('');
    setCoverFile(null);
  };

  return (
    <div className="form-container">
      <h2>Editar Livro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do Livro:</label>
          <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Quantidade de Páginas:</label>
          <input type="number" value={pageCount} onChange={(e) => setPageCount(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Descrição:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label>Tipo de Capa:</label>
          <div>
            <input
              type="radio"
              id="coverUrl"
              name="coverType"
              value="url"
              checked={coverType === 'url'}
              onChange={handleCoverTypeChange}
            />
            <label htmlFor="coverUrl">URL</label>
            <input
              type="radio"
              id="coverFile"
              name="coverType"
              value="file"
              checked={coverType === 'file'}
              onChange={handleCoverTypeChange}
            />
            <label htmlFor="coverFile">Arquivo</label>
          </div>
        </div>
        {coverType === 'url' ? (
          <div className="form-group">
            <label>URL da Capa:</label>
            <input type="text" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} required />
          </div>
        ) : (
          <div className="form-group">
            <label>Arquivo da Capa:</label>
            <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} required />
          </div>
        )}
        <button type="submit" className="btn">Atualizar Livro</button>
        <button type="button" className="btn-cancel" onClick={cancelEditing}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditFormBlock;
