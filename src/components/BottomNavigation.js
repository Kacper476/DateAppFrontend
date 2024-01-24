import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SettingsIcon from '@mui/icons-material/Settings';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // Update the value based on the current route
    switch (location.pathname) {
      case '/selection':
        setValue(0);
        break;
      case '/pairs':
        setValue(1);
        break;
      // Add more cases for other routes if needed
      default:
        setValue(0); // Default to the first item
        break;
    }
  }, [location.pathname]);

  return (
    <Box sx={{ width: '100vw' }}>
      <BottomNavigation
        sx={{ backgroundColor: '#61C0BF    ' }} // Set the background color to teal
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);

          // Programmatically navigate to the corresponding route
          switch (newValue) {
            case 0:
              navigate('/selection');
              break;
            case 1:
              navigate('/pairs');
              break;
            // Add more cases for other routes if needed
            default:
              break;
          }
        }}
      >
       <BottomNavigationAction
  label="Selection"
  icon={<SearchIcon sx={{ color: value === 0 ? 'black' : 'grey' }} />}
  sx={{
    color: value === 0 ? 'black' : 'grey', '& .Mui-selected': { color: 'black' }}}
        />
        <BottomNavigationAction
         label="Favorites"
         icon={<FavoriteIcon sx={{ color: value === 1 ? 'black' : 'grey' }} />}
         sx={{ color: value === 1 ? 'black' : 'grey', '& .Mui-selected': { color: 'black' } }}
        />
        <BottomNavigationAction
          label="Settings"
          icon={<SettingsIcon sx={{ color: value === 2 ? 'black' : 'grey' }} />}
          sx={{ color: value === 2 ? 'black' : 'grey','& .Mui-selected': { color: 'black' }}}
         />
      </BottomNavigation>
    </Box>
  );
}