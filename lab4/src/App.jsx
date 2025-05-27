import { Outlet } from "react-router-dom";
import "./style.css";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);

/*subskrypcja zmian logowania */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <main className="p-4">
        {/* przekazanie użytkownika do Outlet */}
        <Outlet context={{ user }} />
      </main>
    </div>
  );
}
