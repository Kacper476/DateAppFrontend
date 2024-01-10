import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import imageSrc from '../graphics/149071.png'; 
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function Selection() {
  const [user, setUser] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [token, setToken] = useState(null);
  const [value, setValue] = useState(0); // Nowe pole stanu do obsługi wartości BottomNavigation

  
  
  

  
  useEffect(() => {
    fetch('http://localhost:8080/user/getAll')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setUser(data);
        } else {
          setUser([]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setUser([]);
      });
  }, []);

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
      user1: "1", // Zastąp "YourName" właściwym imieniem
      user2: "2",
    };
  
    if (student) {
      // Wywołaj API, aby dodać ulubionego studenta do bazy danych
      fetch('http://localhost:8080/pairs/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Błąd dodawania ulubionego studenta');
          }
          console.log('Ulubiony student dodany');
          // Tutaj możesz dodać dodatkową logikę lub odświeżyć listę studentów
        })
        .catch((error) => {
          console.error('Błąd dodawania ulubionego studenta:', error.message);
        });
    }
  };


  const currentStudent = user.length > 0 ? user[currentIndex] : null;

  return (
    <div style={{ textAlign: 'center', padding: '20px', marginTop: '10%' }}>
      {token ? (
        <>
          {/* Informacje o studencie */}
          {currentStudent && (
            <>
              <img
                src={imageSrc}
                alt="Sample"
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

              {/* Przyciski do obsługi kolejnych studentów */}
              {currentIndex < user.length && (
                <>
                  <IconButton onClick={handleNextClick} color="primary">
                    <DeleteIcon />
                  </IconButton>

                  <IconButton onClick={handleFavoriteClick} color="primary">
                <FavoriteIcon />
              </IconButton>

                </>
              )}
            </>
          )}

          {/* Komunikat, gdy nie ma danych o studencie */}
          {!currentStudent && (
            <p style={{ fontSize: '20px' }}>No student data available</p>
          )}

          {/* BottomNavigation */}
          <BottomNavigation
            style={{ position: 'fixed', bottom: 0, width: '100%' }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Settings" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteOutlinedIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </>
      ) : (
        // Komunikat, gdy nie jesteś zalogowany
        <p style={{ fontSize: '20px' }}>Nie zalogowano</p>
      )}
    </div>
  );
}

export default Selection;
