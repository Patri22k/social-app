import './App.css';
import { useState } from 'react';
import { ChatHistory, ChatContainer } from './components';

function App() {
  // State Managment
  const [messages, setMessages] = useState([]);
  
  const handleNewMessage = (newMessage) => {
    const response = fetch('http://localhost:3001/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    })

    if (response.ok) {
      setMessages([...messages, newMessage]);
    } else {
      console.log('Failed to send message to server.');
    }
  }

  return (
    <div className="App flex h-screen">
      <ChatHistory />
      <ChatContainer onNewMessage={handleNewMessage} messages={messages} />
    </div>
  );
}

export default App;