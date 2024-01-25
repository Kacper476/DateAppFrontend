import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Paper, List, ListItem, ListItemText } from '@mui/material';

const Chat = ({ user1, user2, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    // Logic to send a message
    if (message.trim() === '') {
      return;
    }

    try {
      const sentDate = new Date();
      // Wysyłanie wiadomości
      const response = await fetch('http://localhost:8080/chat/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user1, user2, message, sentDate }),
      });

      if (response.ok) {
        console.log('Wiadomość została dodana do bazy danych.');
        // Pobieranie aktualizowanej listy wiadomości po wysłaniu
        await fetchMessages();
        // Clearing the input field
        setMessage('');
        // Callback to parent component
        
        onSendMessage();
      } else {
        console.error('Błąd podczas dodawania wiadomości do bazy danych.');
      }
    } catch (error) {
      console.error('Wystąpił błąd:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      // Pobieranie wiadomości
      const response = await fetch(`http://localhost:8080/chat/getMess?id1=${user1}&id2=${user2}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Błąd podczas pobierania wiadomości.');
      }
    } catch (error) {
      console.error('Wystąpił błąd:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [user1, user2]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ marginTop: '20px', padding: '10px', marginBottom: '20px', maxHeight: '400px', overflowY: 'auto', textAlign: 'left' }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={msg.message}
                secondary={msg.sentDate}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginLeft: 'auto' }}>
        Send
      </Button>
    </Container>
  );
};

export default Chat;