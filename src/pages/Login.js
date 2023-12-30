import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


const genders = ['Male', 'Female', 'Attack Helicopter'];
const age = Array.from({ length: 82 }, (_, index) => String(18 + index));

export default function LoginForm() {
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');


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
      id="outlined-basic-login"
      label="Login"
      variant="outlined"
      fullWidth
      value={loginValue}
      onChange={(e) => setLoginValue(e.target.value)}
    />
  </Grid>
  <Grid item style={{ width: '20%' }}>
    <TextField
      id="outlined-basic-password"
      label="Password"
      variant="outlined"
      fullWidth
      value={passwordValue}
      onChange={(e) => setPasswordValue(e.target.value)}
    />
  </Grid>
  
  <Grid item style={{ width: '20%' }}>
  <Link to="/selection">
  <Button variant="contained" color="secondary">
    Login
  </Button>
  </Link>
  <Link to="/register">
    <Button variant="contained" color="secondary" style={{ marginLeft: '15px' }}>
      Register
    </Button>
  </Link>
</Grid>
</Grid>
  );
  }
