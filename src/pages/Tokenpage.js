import React, { useEffect, useState } from 'react';

const TokenPage = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Funkcja do odczytu wartości z plików cookie
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      return parts.length === 2 ? parts.pop().split(';').shift() : null;
    };

    // Odczytanie tokena z plików cookie
    const retrievedToken = getCookie('token');

    // Sprawdzenie czy token istnieje
    if (retrievedToken) {
      setToken(retrievedToken);
    }
  }, []); // Pusta zależność oznacza, że useEffect uruchomi się tylko raz po zamontowaniu komponentu

  return (
    <div>
      <h1>Strona z Tokenem</h1>
      {token ? (
        <p>Token istnieje: {token}</p>
      ) : (
        <p>Token nie istnieje.</p>
      )}
    </div>
  );
};

export default TokenPage;