import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/HeartBroken';
import FavoriteIcon from '@mui/icons-material/Favorite';
import imageSrc from '../graphics/149071.png'; 
import SimpleBottomNavigation from '../components/BottomNavigation';

function Selection() {
  const [user, setUser] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [token, setToken] = useState(null);


  useEffect(() => {
    fetch('http://localhost:8080/user/getSelectionUser?id=' + token, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          
          const filteredUsers = data.filter(user => user.id !== parseInt(token, 10));
          setUser(filteredUsers);
        } else {
          setUser([]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setUser([]);
      });
  }, [token]);

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

  const handleNextClick = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handleFavoriteClick = () => {
    const student = {
      user1: token,
      user2: currentStudent.id,
    };

    if (student) {
      fetch('http://localhost:8080/pairs/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(student),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Błąd dodawania ulubionego studenta');
          }
          console.log('Ulubiony student dodany');
        })
        .catch((error) => {
          console.error('Błąd dodawania ulubionego studenta:', error.message);
        });
    }
  };

  const currentStudent = user.length > 0 ? user[currentIndex] : null;

  return (
    <div style={{ textAlign: 'center', padding: '20px', marginTop: '10%', }}>
      {token ? (
        <>
          {currentStudent && (
            <>
              <img
                src={currentStudent.photourl !== null ? currentStudent.photourl : imageSrc}
                style={{ width: '256px', height: '256px', objectFit: 'cover' }}
              />
  
              <div style={{ marginTop: '20px' }}>
                {currentIndex < user.length && (
                  <div>
                    <p style={{ fontSize: '20px' }}>Name: {currentStudent.name}</p>
                    <p style={{ fontSize: '20px' }}>Age: {currentStudent.age}</p>
                  </div>
                )}
                {currentIndex === user.length && (
                  <div>
                    <p style={{ fontSize: '20px' }}>Koniec Par</p>
                  </div>
                )}
              </div>
  
              {currentIndex < user.length && (
                <>
                  <IconButton onClick={() => { handleNextClick(); handleFavoriteClick(); }} color="primary">
                    <DeleteIcon />
                  </IconButton>
  
                  <IconButton onClick={() => { handleFavoriteClick(); handleNextClick(); }} color="primary">
                    <FavoriteIcon />
                  </IconButton>
                  


                </>
                
              )}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '250px' }}>
  <SimpleBottomNavigation />
</div>
            </>
            
          )}
  
          {!currentStudent && (
            <p style={{ fontSize: '20px' }}>No more to choose
            <div style={{ marginTop: '65vh' }}>
  <SimpleBottomNavigation />
</div>
            
            </p>
          )}
  
    
        </>
      ) : (
        <p style={{ fontSize: '20px' }}>Nie zalogowano
        </p>
      )}
    </div>
  );
}

export default Selection;