import React, { useState } from 'react';

function AddBookForm({ onAddBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (title && author && price) {
      const newBook = { title, author, price };
      onAddBook(newBook);
      setTitle('');
      setAuthor('');
      setPrice('');
    } else {
      alert('Proszę wypełnić wszystkie pola!');
    }
  };

  return (
    <div className="features">
      <div>
        <label>Nazwa książki: </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Wpisz tytuł książki"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Autor: </label>
        <input
          type="text"
          id="author"
          name="author"
          placeholder="Wpisz autora książki"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label>Cena: </label>
        <input
          type="text"
          id="price"
          name="price"
          placeholder="Wpisz cenę książki"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <button type="button" onClick={handleAdd}>
          Dodaj książkę
        </button>
      </div>
    </div>
  );
}

export default AddBookForm;
