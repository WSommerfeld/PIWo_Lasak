import React from 'react';
import { useBookContext } from '../context/BookContext';

const BookList = () => {
	//użycie kontekstu do listy książek i filtrowania
  const { filterBooks } = useBookContext();
  const filteredBooks = filterBooks();

  return (
    <div className="items">
      {filteredBooks.map((book, index) => (
        <div className="item" key={index}>
          <h2>{book.title}</h2>
          <p>{book.author} - {book.price} zł</p>
          <img src={book.img} alt={book.title} className="img" />
        </div>
      ))}
    </div>
  );
};

export default BookList;
