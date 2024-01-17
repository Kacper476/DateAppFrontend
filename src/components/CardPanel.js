import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import imageSrc from '../graphics/149071.png';

function CardPanel({ users, currentIndex, onSendMessage }) {
  return (
    <div style={{ display: 'flex', maxWidth: '100%', margin: '0 auto' }}>
      <div style={{ flex: '0 0 20%', overflowY: 'auto', marginRight: '10px', height: '100vh' }}>
        {users.map((user) => (
          <Card key={user.id} style={{ margin: '10px', transform: 'scale(1.0)' }}>
            <CardMedia
              component="img"
              alt="Student Image"
              height="300" // Reduced height by 30%
              image={imageSrc}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Age: {user.age}
              </Typography>
              <Button size="small" onClick={() => onSendMessage(user.id)}>
                Send Message
              </Button>
            </CardContent>
          </Card>
        ))}

        {users.length === 0 && (
          <p style={{ fontSize: '20px' }}>No student data available</p>
        )}
      </div>

      {/* Other content of your page can go here */}
    </div>
  );
}

export default CardPanel;
