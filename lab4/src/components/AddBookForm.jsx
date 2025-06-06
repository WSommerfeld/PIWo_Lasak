import React, { useState, useEffect } from 'react';

function AddBookForm({ onAddBook, bookToEdit, onUpdateBook, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [cover, setCover] = useState('');
  const [pages, setPages] = useState('');

  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title || '');
      setAuthor(bookToEdit.author || '');
      setPrice(bookToEdit.price || '');
      setCover(bookToEdit.cover || '');
      setPages(bookToEdit.pages || '');
    } else {
      setTitle('');
      setAuthor('');
      setPrice('');
      setCover('');
      setPages('');
    }
  }, [bookToEdit]);

  const handleSubmit = () => {
    if (!title || !author || !price || !cover || !pages) {
      alert('Proszę wypełnić wszystkie pola!');
      return;
    }

    const bookData = {
      title,
      author,
      price: Number(price),
      cover,
      pages: Number(pages),
    };

    if (bookToEdit) {
      onUpdateBook(bookToEdit.id, bookData);
    } else {
      onAddBook(bookData);
      setTitle('');
      setAuthor('');
      setPrice('');
      setCover('');
      setPages('');
    }
  };

  return (
    <div className="features">
      <div>
        <label>Nazwa książki: </label>
        <input
          type="text"
          placeholder="Wpisz tytuł książki"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Autor: </label>
        <input
          type="text"
          placeholder="Wpisz autora książki"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <label>Cena: </label>
        <input
          type="number"
          placeholder="Wpisz cenę książki"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Rodzaj okładki: </label>
        <input
          type="text"
          placeholder="np. miękka, twarda"
          value={cover}
          onChange={(e) => setCover(e.target.value)}
        />
      </div>
      <div>
        <label>Liczba stron: </label>
        <input
          type="number"
          placeholder="np. 350"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
      </div>
      <div>
        <button type="button" onClick={handleSubmit}>
          {bookToEdit ? 'Zapisz zmiany' : 'Dodaj książkę'}
        </button>
        {bookToEdit && (
          <button type="button" onClick={onCancelEdit} style={{ marginLeft: '10px' }}>
            Anuluj
          </button>
        )}
      </div>
    </div>
  );
}

export default AddBookForm;
