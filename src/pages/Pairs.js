import React, { useState, useEffect } from 'react';
import CardPanel from '../components/CardPanel';
import SimpleBottomNavigation from '../components/BottomNavigation';

function Selection() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/user/getAll')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          fetch('http://localhost:8080/pairs/getPair')
            .then(response => response.json())
            .then(pairsData => {
              if (pairsData && pairsData.length > 0) {
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
    <div style={{ marginTop: '-56px', textAlign: 'center' }}>
      <CardPanel users={users} 
      currentIndex={currentIndex} 
      onSendMessage={handleSendMessage} 
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
        <SimpleBottomNavigation />
      </div>
    </div>
  );
}

export default Selection;
