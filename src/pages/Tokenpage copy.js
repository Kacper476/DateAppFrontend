import React, { useState, useEffect } from 'react';
import CardPanel from '../components/CardPanel'

function Selection() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/user/getAll')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setUsers(data);
        } else {
          setUsers([]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
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