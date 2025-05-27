import React, { useEffect, useState } from 'react';
import '../style.css'; 
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    /*subskrypcja zmiany stanu logowania*/
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

	/*wylogowywanie*/
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('Wylogowano pomyślnie');
    } catch (error) {
      console.error('Błąd podczas wylogowania:', error);
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Strona Główna</Link></li>
        <li><Link to="/new">Dodaj książkę</Link></li>
        <li><a href="#">Koszyk</a></li>

        {!user && (
          <li><Link to="/login">Logowanie</Link></li>
        )}
			
			{/*przycisk wyloguj*/}
        {user && (
          <li>
            <button 
              onClick={handleLogout} 
              style={{
                background: 'transparent', 
                border: 'none', 
                color: 'black', 
                cursor: 'pointer', 
                fontSize: '1em',
                padding: 0,
                margin: 0,
                fontFamily: 'inherit'
              }}
            >
              Wyloguj
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
