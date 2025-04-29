import React from 'react';
import '../style.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="#">Strona Główna</a></li>
        <li><a href="#">Dodaj książkę</a></li>
        <li><a href="#">Koszyk</a></li>
        <li><a href="#">Logowanie</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
