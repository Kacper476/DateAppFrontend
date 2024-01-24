
import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState('user1'); // Początkowy użytkownik (możesz dostosować)

  // Pobieranie wiadomości z API lub lokalnej bazy danych
  useEffect(() => {
    // Symulacja pobierania danych z API
    // W rzeczywistej aplikacji użyj fetch lub innej metody do pobrania danych
    const fetchData = async () => {
      // Przykładowe dane (zastąp je prawdziwymi danymi)
      const response = await fetch('/api/chat');
      const data = await response.json();
      setMessages(data);
    };

    fetchData();
  }, []);

  const handleSendMessage = () => {
    const newMessageObj = {
      id: messages.length + 1,
      user,
      text: newMessage,
      time: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={message.user === 'user1' ? 'message-right' : 'message-left'}>
            <strong>{message.user}:</strong> {message.text} ({message.time})
          </div>
        ))}
      </div>
      <div className="chat-input">
        <textarea
          rows="3"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Wyślij</button>
      </div>
    </div>
  );
};

export default Chat;