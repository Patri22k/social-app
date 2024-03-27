import './index.css';
import './App.css'
// import { useEffect, useState } from 'react';
// import { getApiUrl } from './util';
import Views from './components/Views';


function App() {
  // State Managment
  /*
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
  */

  return (
    <div className="App">
      <Views />
      {/* The Chat App */ }
      {/*
      <ChatHistory />
      <ChatContainer onNewMessage={handleNewMessage} messages={messages} />
      */}
    </div>
  );
}

export default App;
