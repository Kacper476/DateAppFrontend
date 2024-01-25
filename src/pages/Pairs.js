import React, { useState, useEffect } from 'react';
import CardPanel from '../components/CardPanel';
import SimpleBottomNavigation from '../components/BottomNavigation';
import Chat from '../components/Chat'; // Replace with the correct path
import { Token } from '@mui/icons-material';

function Selection() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [token, setToken] = useState(null);
  const [chatUser, setChatUser] = useState(null);

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      return parts.length === 2 ? parts.pop().split(';').shift() : null;
    };

    const retrievedToken = getCookie('token');

    if (retrievedToken) {
      setToken(retrievedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('http://localhost:8080/user/getAll', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          fetch('http://localhost:8080/pairs/getPair', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
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
  }, [token]);

  const handleSendMessage = () => {
    if (currentIndex < users.length) {
      const selectedUserId = users[currentIndex].id;
      setCurrentIndex(currentIndex + 1);
      setChatUser(selectedUserId);
    }
  };

  return (
    <div style={{ marginTop: '-56px', textAlign: 'center' }}>
      <CardPanel users={users} 
        currentIndex={currentIndex} 
        onSendMessage={handleSendMessage} 
      />
      
      {users.length > 0 && currentIndex < users.length && chatUser !== null && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Chat user1={token} user2={chatUser} onSendMessage={handleSendMessage} />
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0px' }}>
        <SimpleBottomNavigation />
      </div>
    </div>
  );
}

export default Selection;
