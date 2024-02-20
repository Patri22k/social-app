import './App.css';
import { useState } from 'react';
import { ChatHistory, ChatContainer } from './components';

function App() {
  // State Managment
  const [messages, setMessages] = useState([]);
  
  const handleNewMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  }

  return (
    <div className="App flex h-screen">
      <ChatHistory />
      <ChatContainer onNewMessage={handleNewMessage} messages={messages} />
    </div>
  );
}

export default App;