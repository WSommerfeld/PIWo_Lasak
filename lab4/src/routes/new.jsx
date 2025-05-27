import React from 'react';
import '../style.css';
import Navbar from '../components/Navbar';
import AddBookForm from '../components/AddBookForm';


function New() {
  return (
	<>
	{/* Nagłówek */}
      <h1 className="header">
        Słowo
        <img src="books.jpg" alt="Quill" className="icon" />
      </h1>
	  <nav className="nav">
      <Navbar />
	  </nav>
	  <div className="form">
	  <AddBookForm/>
	  </div>
</>
  );
}

export default New;
