import React from 'react';

const Filter = ({ filters, updateFilter, authors, user }) => {
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
      <label htmlFor="priceFilter">Cena: {filters.price} zł</label>
      <input
        type="range"
        id="priceFilter"
        min="0"
        max="1000"
        value={filters.price}
        onChange={(e) => updateFilter('price', e.target.value)}
      />

		{/* Okładka */}
      <label htmlFor="coverFilter">Okładka:</label>
      <select
        id="coverFilter"
        value={filters.cover}
        onChange={(e) => updateFilter('cover', e.target.value)}
      >
        <option value="">Wybierz rodzaj okładki</option>
        <option value="miękka">Miękka</option>
        <option value="twarda">Twarda</option>
      </select>

		 {/* Autor */}
      <label htmlFor="authorFilter">Autor:</label>
      <select
        id="authorFilter"
        value={filters.author}
        onChange={(e) => updateFilter('author', e.target.value)}
      >
        <option value="">Wybierz autora</option>
        {authors.map((author, i) => (
          <option key={i} value={author}>
            {author}
          </option>
        ))}
      </select>

		{/* Liczba stron */}
      <label htmlFor="pageFilter">Liczba stron: {filters.pages}</label>
      <input
        type="range"
        id="pageFilter"
        min="30"
        max="5000"
        value={filters.pages}
        onChange={(e) => updateFilter('pages', e.target.value)}
      />

		{/* MOJE*/}
      {user && (
        <div className="moje-checkbox">
          <input
            type="checkbox"
            id="moje"
            checked={filters.moje}
            onChange={(e) => updateFilter('moje', e.target.checked)}
          />
          <label htmlFor="moje">Pokaż tylko moje książki</label>
        </div>
      )}
    </div>
  );
};

export default Filter;
