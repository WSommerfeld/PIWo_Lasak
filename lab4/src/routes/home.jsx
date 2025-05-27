import React, { useEffect, useState } from 'react';
import '../style.css';
import Navbar from '../components/Navbar';
import BookList from '../components/BookList';
import Filter from '../components/Filter';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Home() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [user, setUser] = useState(null);

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
          <BookList books={filteredBooks} />
        </div>
      </main>
    </>
  );
}

export default Home;
