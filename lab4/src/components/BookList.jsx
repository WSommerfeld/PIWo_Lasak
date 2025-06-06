import React from 'react';

/*lista książek z bazy, zamiast kontekstu*/
const BookList = ({ books, currentUserId, onEdit, onDelete }) => {
  if (!books || !Array.isArray(books)|| books.length === 0) return <p>Brak książek do wyświetlenia</p>;

  return (
    <div className="items">
      {books.map((book) => (
        <div className="item" key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.author} - {book.price} zł</p>
          <img src={book.img} alt={book.title} className="img" />

          {book.userid === currentUserId && (
            <div className="book-actions">
              <button onClick={() => onEdit(book)}>Edytuj</button>
              <button onClick={() => onDelete(book.id)}>Usuń</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


export default BookList;
