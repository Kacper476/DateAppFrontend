// AgeAutocomplete.js
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const ageOptions = Array.from({ length: 82 }, (_, index) => String(18 + index));

export default function AgeAutocomplete({ value, onChange, inputValue, onInputChange }) {
  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      inputValue={inputValue?.toString() || ''}
      onInputChange={onInputChange}
      id="controllable-age"
      options={ageOptions}
      sx={{ width: 200 }}
      renderInput={(params) => <TextField {...params} label="Age" />}
    />
  );
}