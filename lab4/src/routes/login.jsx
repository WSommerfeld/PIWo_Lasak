import React, { useEffect, useState } from 'react';
import '../style.css';
import Navbar from '../components/Navbar';
import { auth, provider } from '../firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Błąd logowania:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Błąd podczas wylogowania:', error);
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

      <main className="login-main">
        {!user ? (
          <>
            <h2 className="login-title">Logowanie</h2>
            <button onClick={handleGoogleLogin} className="google-login-btn">
              Zaloguj się przez Google
            </button>
          </>
        ) : (
          <div className="user-info">
            <img 
              src={user.photoURL} 
              alt={user.displayName} 
              className="user-avatar"
            />
            <h2 className="user-name">Witaj, {user.displayName}!</h2>
            <p className="user-email">{user.email}</p>
            <button onClick={handleLogout} className="logout-btn">
              Wyloguj się
            </button>
          </div>
        )}
      </main>
    </>
  );
}

export default Login;
