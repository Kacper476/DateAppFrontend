import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';

const genders = ['Male', 'Female', 'Attack Helicopter'];
const age = Array.from({ length: 82 }, (_, index) => String(18 + index));

export default function RegistrationForm() {
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [genderValue, setGenderValue] = React.useState(null); 
  const [ageValue, setAgeValue] = useState('');





  const handleClick = (e) => {
    e.preventDefault();

    const student = {
      name: loginValue, // Zastąp "YourName" właściwym imieniem
      password: passwordValue,
      age: ageValue, // Zastąp 25 odpowiednim wiekiem
      email: emailValue, // Zastąp "your.email@example.com" właściwym adresem e-mail
      sex: genderValue, // Zastąp "Male" właściwą wartością płci
    };

    const requiredFields = ["name", "password", "age", "email", "sex"];
    const emptyFields = requiredFields.filter((field) => student[field] === "");

    if (emptyFields.length > 0) {
      alert("Wypełnij wszystkie pola!");
    } else {
      console.log(student);

      fetch("http://localhost:8080/student/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      })
        .then(() => {
          console.log("New Student added");
        })
        .catch((error) => {
          console.error("Error adding new student:", error);
        });
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
        <TextField
          id="outlined-basic-email"
          label="Email"
          variant="outlined"
          fullWidth
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
      </Grid>
      <Grid item style={{ display: 'flex', width: '20%', justifyContent: 'space-between' }}>
        <Autocomplete
          value={genderValue}
          onChange={(event, newValue) => {
            setGenderValue(newValue);
          }}
          inputValue={genderValue?.toString() || ''}
          onInputChange={(event, newInputValue) => {
            // W tym przypadku możesz pozostawić to puste, ponieważ nie korzystamy z inputValue do niczego konkretnego
          }}
          id="controllable-Gender"
          options={genders}
          sx={{ width: 700 }}
          renderInput={(params) => <TextField {...params} label="Gender" />}
        />
       
       <Autocomplete
          value={ageValue}
          onChange={(event, newValue) => {
            setAgeValue(newValue);
          }}
          inputValue={ageValue?.toString() || ''}
          onInputChange={(event, newInputValue) => {
            
          }}
          id="controllable-age"
          options={age}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Age" />}
        />
      </Grid>
      
      
      <Grid item style={{ width: '20%' }}>
      <Button variant="contained" color="secondary" onClick={handleClick}>
  Register
</Button>
      </Grid>
    </Grid>
  );
}
