import React from 'react';
import '../style.css'; 
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
		<li><Link to="/">Strona Główna</Link></li>
        <li><Link to="/new">Dodaj książkę</Link></li>
        <li><a href="#">Koszyk</a></li>
        <li><a href="#">Logowanie</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
