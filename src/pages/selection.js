import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import imageSrc from '../graphics/149071.png'; // Importuj ścieżkę do obrazu

function Selection() {
  const [students, setStudents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/student/getAll')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setStudents(data);
        } else {
          setStudents([]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setStudents([]);
      });
  }, []);

  const handleNextClick = () => {
    setCurrentIndex(currentIndex + 1);

  };

  const currentStudent = students.length > 0 ? students[currentIndex] : null;

  return (
    <div style={{ textAlign: 'center', padding: '20px', marginTop: '10%' }}>
      {currentStudent && (
        <>
          <img
            src={imageSrc}
            alt="Sample"
            style={{ width: '256px', height: '256px', objectFit: 'cover' }}
          />

          <div style={{ marginTop: '20px' }}>
            {currentIndex < students.length  && (
              <div>
                <p style={{ fontSize: '20px' }}>Name: {currentStudent.name}</p>
                <p style={{ fontSize: '20px' }}>Age: {currentStudent.age}</p>
              </div>
            )}
            {currentIndex === students.length && (
              <div>
                <p style={{ fontSize: '20px' }}>Koniec Par</p>
              </div>
            )}
          </div>

          {currentIndex < students.length  && (
            <>
              <IconButton onClick={handleNextClick} color="primary">
                <DeleteIcon />
              </IconButton>

              <IconButton onClick={handleNextClick} color="primary">
                <FavoriteIcon />
              </IconButton>
            </>
          )}
        </>
      )}

      {!currentStudent && (
        <p style={{ fontSize: '20px' }}>No student data available</p>
      )}
    </div>
  );
}

export default Selection;
