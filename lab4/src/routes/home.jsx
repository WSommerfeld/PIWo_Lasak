import React, { useEffect, useState } from 'react';
import '../style.css';
import Navbar from '../components/Navbar';
import BookList from '../components/BookList';
import Filter from '../components/Filter';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

import AddBookForm from '../components/AddBookForm';

function Home() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [user, setUser] = useState(null);
  
  const [bookToEdit, setBookToEdit] = useState(null);


  const [filters, setFilters] = useState({
    keyword: '',
    price: 1000,
    cover: '',
    author: '',
    pages: 5000,
    moje: false
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function fetchBooks() {
      const booksCol = collection(db, 'books');
      const booksSnapshot = await getDocs(booksCol);
      const booksList = booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBooks(booksList);
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    async function fetchAuthors() {
      const booksCol = collection(db, 'books');
      const booksSnapshot = await getDocs(booksCol);
      const authorsSet = new Set(booksSnapshot.docs.map(doc => doc.data().author));
      setAuthors([...authorsSet]);
    }
    fetchAuthors();
  }, []);

  const updateFilter = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const filteredBooks = books.filter(book => {
    return (
      book.title.toLowerCase().includes(filters.keyword.toLowerCase()) &&
      book.price <= filters.price &&
      (filters.cover === '' || book.cover.toLowerCase() === filters.cover.toLowerCase()) &&
      (filters.author === '' || book.author === filters.author) &&
      book.pages <= filters.pages &&
      (!filters.moje || (user && book.userid === user.email))
    );
  });
  
  
  const deleteBook = async (id) => {
  try {
    await deleteDoc(doc(db, 'books', id));
    alert('Książka została usunięta.');
    setBooks(prev => prev.filter(book => book.id !== id));
  } catch (error) {
    console.error('Błąd przy usuwaniu książki:', error);
    alert('Wystąpił błąd podczas usuwania.');
  }
};



const updateBook = async (id, updatedData) => {
  try {
    const bookRef = doc(db, 'books', id);
    await updateDoc(bookRef, updatedData);
    alert('Książka została zaktualizowana.');

    
    setBooks(prevBooks =>
      prevBooks.map(book => (book.id === id ? { ...book, ...updatedData } : book))
    );

   
    setBookToEdit(null);
  } catch (error) {
    console.error('Błąd podczas aktualizacji książki:', error);
    alert('Wystąpił błąd podczas aktualizacji książki.');
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

      <main>
        <div className="searching">
          <Filter filters={filters} updateFilter={updateFilter} authors={authors} user={user} />
          <BookList
  books={filteredBooks}
  currentUserId={user?.email}
  onEdit={(book) => setBookToEdit(book)} 
  onDelete={deleteBook}
/>
{bookToEdit && (
  <AddBookForm
    bookToEdit={bookToEdit}
    onUpdateBook={updateBook}
    onCancelEdit={() => setBookToEdit(null)}
  />
)}

        </div>
      </main>
    </>
  );
}

export default Home;
