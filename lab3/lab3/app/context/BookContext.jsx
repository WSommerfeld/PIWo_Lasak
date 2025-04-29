import React, { createContext, useState, useContext } from 'react';


const BookContext = createContext();

//Lista książek
export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([
    {
      title: "Wprowadzenie do algorytmów",
      author: "Thomas H. Cormen",
      price: 90,
      cover: "Twarda",
      pages: 900,  
      img: "Cormen.jpg",
    },
    {
      title: "Arytmetyka komputerów",
      author: "Janusz Biernat",
      price: 20,
      cover: "Miękka",
      pages: 300,  
      img: "Biernat.jpg",
    },
    {
      title: "The Manga Guide. Fizyka",
      author: "Hideo Nitta",
      price: 80,
      cover: "Miękka",
      pages: 250,  
      img: "Fizyka.jpg",
    },
  ]);
  
  //filtry

  const [filters, setFilters] = useState({
    price: 50,
    cover: "",
    author: "",
    keyword: "",
    pages: 300, 
  });

  const filterBooks = () => {
    return books.filter(book => {
      return (
        (filters.price === "" || book.price <= filters.price) &&
        (filters.cover === "" || book.cover === filters.cover) &&
        (filters.author === "" || book.author === filters.author) &&
        (filters.keyword === "" || book.title.toLowerCase().includes(filters.keyword.toLowerCase())) &&
        (filters.pages === "" || book.pages <= filters.pages) 
      );
    });
  };

  const updateFilter = (filter, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value,
    }));
  };

  return (
    <BookContext.Provider value={{ books, filterBooks, filters, updateFilter }}>
      {children}
    </BookContext.Provider>
  );
};


export const useBookContext = () => useContext(BookContext);
