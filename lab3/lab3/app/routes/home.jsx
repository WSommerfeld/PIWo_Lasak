import React from 'react';
import '../style.css';
import Navbar from '../components/Navbar';
import { BookProvider } from '../context/BookContext';
import BookList from '../components/BookList';
import Filter from '../components/Filter';

function Home() {
  return (
    <BookProvider>
	{/* Nagłówek */}
      <h1 className="header">
        Słowo
        <img src="books.jpg" alt="Quill" className="icon" />
      </h1>
	  <nav className="nav">
      <Navbar />
	  </nav>
      <main>
        <div className="searching">


          {/* Filtry */}
          <Filter />

          {/* Lista książek */}
          
        </div>
		
      </main>
	  <BookList />
    </BookProvider>
  );
}

export default Home;
