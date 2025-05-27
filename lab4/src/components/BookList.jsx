import React from 'react';

/*lista książek z bazy, zamiast kontekstu*/
const BookList = ({ books }) => {
  if (!books.length) return <p>Brak książek do wyświetlenia</p>;

  return (
    <div className="items">
      {books.map((book) => (
        <div className="item" key={book.id}>
          <h2>{book.title}</h2>
          <p>{book.author} - {book.price} zł</p>
          <img src={book.img} alt={book.title} className="img" />
        </div>
      ))}
    </div>
  );
};

export default BookList;
