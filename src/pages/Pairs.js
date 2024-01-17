import React, { useState, useEffect } from 'react';
import CardPanel from '../components/CardPanel';

function Selection() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Pobierz dane użytkowników
    fetch('http://localhost:8080/user/getAll')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          // Po pobraniu danych użytkowników, pobierz dane par
          fetch('http://localhost:8080/pairs/getPair')
            .then(response => response.json())
            .then(pairsData => {
              if (pairsData && pairsData.length > 0) {
                // Przefiltruj użytkowników na podstawie danych z pairsData
                const filteredUsers = data.filter(user => pairsData.some(pair => user.id === pair.user1));
                setUsers(filteredUsers);
              } else {
                setUsers([]);
              }
            })
            .catch(error => {
              console.error('Error fetching pair data:', error);
              setUsers([]);
            });
        } else {
          setUsers([]);
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setUsers([]);
      });
  }, []);

  const handleSendMessage = () => {
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div style={{ marginTop: '0%', textAlign: 'center' }}>
      <CardPanel users={users} currentIndex={currentIndex} onSendMessage={handleSendMessage} />
    </div>
  );
}

export default Selection;