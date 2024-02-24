import './App.css';
import { useEffect, useState } from 'react';
import { ChatHistory, ChatContainer, ToggleColorMode } from './components';
import { getApiUrl } from './util';

function App() {
  // State Managment
  const [messages, setMessages] = useState([]);

  const pullData = () => {
    fetch(getApiUrl('/messages'))
      .then(res => res.json())
      .then(data => {
        setMessages(data);
      });
  }
  
  const handleNewMessage = async (message) => {
    const response = await fetch(getApiUrl('/messages'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })

    if (response.ok) {
      setMessages([...messages, message]);
      pullData();
    } else {
      console.log('Failed to send message to server.');
    }
  }

  useEffect(() => {
    pullData();
    setInterval(pullData, 5000);
  }, []);

  return (
    <div className="App flex h-screen">
      <ToggleColorMode />
      <ChatHistory />
      <ChatContainer onNewMessage={handleNewMessage} messages={messages} />
    </div>
  );
}

export default App;