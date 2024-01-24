import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const LoginForm = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/getByEmail/${emailValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const user = await response.json();

      if (user && user.password === passwordValue) {
        // Assuming your server sends a token upon successful login
        const token = user.id; // Ustaw token na 'd0pa'

        // Store the token in cookies
        document.cookie = `token=${token}; path=/`;

        alert('Poprawne dane logowania');

        // Po pomyślnym zalogowaniu, przenieś do "/selection"
        navigate('/selection');
      } else {
        alert('Niepoprawne dane logowania');
      }
    } catch (error) {
      alert('Niepoprawne dane logowania');
    }
  };

  return (
    <Grid
      container
      spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: '100vh',
        width: '100%',
        margin: 'auto',
        marginTop: '-10%',
      }}
    >
      <Grid item style={{ width: '20%' }}>
        <TextField
          id="outlined-basic-email"
          label="Email"
          variant="outlined"
          fullWidth
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
      </Grid>
      <Grid item style={{ width: '20%' }}>
        <TextField
           id="outlined-basic-password"
           label="Password"
           variant="outlined"
           fullWidth
           type="password" 
           value={passwordValue}
           onChange={(e) => setPasswordValue(e.target.value)}
        />
      </Grid>

      <Grid item style={{ width: '20%' }}>
        <Button variant="contained" color="secondary" onClick={handleLogin}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
