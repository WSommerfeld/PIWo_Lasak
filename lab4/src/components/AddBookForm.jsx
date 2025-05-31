import React, { useState, useEffect } from 'react';

function AddBookForm({ onAddBook, bookToEdit, onUpdateBook, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

 
  useEffect(() => {
    if (bookToEdit) {
      setTitle(bookToEdit.title || '');
      setAuthor(bookToEdit.author || '');
      setPrice(bookToEdit.price || '');
    } else {
      setTitle('');
      setAuthor('');
      setPrice('');
    }
  }, [bookToEdit]);

  const handleSubmit = () => {
    if (!title || !author || !price) {
      alert('Proszę wypełnić wszystkie pola!');
      return;
    }

    if (bookToEdit) {
      // tryb edycji
      onUpdateBook(bookToEdit.id, { title, author, price: Number(price) });
    } else {
      // tryb dodawania
      onAddBook({ title, author, price: Number(price) });
      setTitle('');
      setAuthor('');
      setPrice('');
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
