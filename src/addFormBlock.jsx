import React, { useState } from 'react';

const AddFormBlock = ({ addBook }) => {
  const [bookName, setBookName] = useState('');
  const [pageCount, setPageCount] = useState('');
  const [description, setDescription] = useState('');
  const [coverType, setCoverType] = useState('url');
  const [coverUrl, setCoverUrl] = useState('');
  const [coverFile, setCoverFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let cover = coverUrl;
    if (coverType === 'file' && coverFile) {
      const reader = new FileReader();
      reader.onload = () => {
        addBook(bookName, pageCount, description, reader.result);
        setBookName('');
        setPageCount('');
        setDescription('');
        setCoverUrl('');
        setCoverFile(null);
      };
      reader.readAsDataURL(coverFile);
    } else {
      addBook(bookName, pageCount, description, cover);
      setBookName('');
      setPageCount('');
      setDescription('');
      setCoverUrl('');
      setCoverFile(null);
    }
  };

  const handleCoverTypeChange = (e) => {
    setCoverType(e.target.value);
    setCoverUrl('');
    setCoverFile(null);
  };

  return (
    <div className="form-container">
      <h2>Adicionar Novo Livro</h2>
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
        <button type="submit" className="btn">Adicionar Livro</button>
      </form>
    </div>
  );
};

export default AddFormBlock;
