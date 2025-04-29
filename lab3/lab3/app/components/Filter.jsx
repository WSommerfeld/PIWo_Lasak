import React from 'react';
import { useBookContext } from '../context/BookContext';

const Filter = () => {
  const { filters, updateFilter } = useBookContext();

  return (
    <div className="filters">
      <label>Filtry</label>
	  
	  {/* Wyszukaj (słowa kluczowe)*/}
      <input
        type="text"
        id="searchKey"
        value={filters.keyword}
        onChange={(e) => updateFilter('keyword', e.target.value)}
        placeholder="Wyszukaj książki..."
      />

      {/* Cena */}
      <label for="priceFilter">Cena: {filters.price} zł</label>
      <input
        type="range"
        id="priceFilter"
        min="0"
        max="1000"
        value={filters.price}
        onChange={(e) => updateFilter('price', e.target.value)}
      />

      {/* Okładka */}
      <label for="coverFilter">Okładka:</label>
      <select
        id="coverFilter"
        value={filters.cover}
        onChange={(e) => updateFilter('cover', e.target.value)}
      >
        <option value="">Wybierz rodzaj okładki</option>
        <option value="Miękka">Miękka</option>
        <option value="Twarda">Twarda</option>
      </select>

      {/* Autor */}
      <label for="authorFilter">Autor:</label>
      <select
        id="authorFilter"
        value={filters.author}
        onChange={(e) => updateFilter('author', e.target.value)}
      >
        <option value="">Wybierz autora</option>
        <option value="Thomas H. Cormen">Thomas H. Cormen</option>
        <option value="Janusz Biernat">Janusz Biernat</option>
        <option value="Hideo Nitta">Hideo Nitta</option>
      </select>

      {/* Liczba stron */}
      <label for="pageFilter">Liczba stron: {filters.pages}</label>
      <input
        type="range"
        id="pageFilter"
        min="30"
        max="5000"
        value={filters.pages}
        onChange={(e) => updateFilter('pages', e.target.value)}
      />

      {/* Słowa kluczowe */}
      
    </div>
  );
};

export default Filter;
