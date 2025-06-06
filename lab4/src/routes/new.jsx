import React, { useEffect, useState } from 'react';
import '../style.css';
import Navbar from '../components/Navbar';
import AddBookForm from '../components/AddBookForm';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

function New() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const addBook = async (newBook) => {
    if (!user) {
      alert('Zaloguj się!');
      return;
    }

    try {
      const bookToAdd = {
        ...newBook,
		img: 'blank.png',
        userid: user.email,
      };

      await addDoc(collection(db, 'books'), bookToAdd);
      alert('Książka została dodana.');
    } catch (error) {
      console.error('Błąd przy dodawaniu książki:', error);
      alert('Wystąpił błąd.');
    }
  };

  return (
    <>
      <h1 className="header">
        Słowo
        <img src="books.jpg" alt="Quill" className="icon" />
      </h1>

      <nav className="nav">
        <Navbar />
      </nav>

      <div className="form">
        <AddBookForm onAddBook={addBook} />
      </div>
    </>
  );
}

export default New;
