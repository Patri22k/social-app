import { useState } from 'react';
import './App.css';
import SendIcon from '@material-ui/icons/Send';

function App() {
  // State Managment
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Input Handling
  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendNewMessage();
    }
  }

  // Sending Messages
  const handleSendNewMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, newMessage]);
      setNewMessage(''); 
    }
  }

  return (
    <div className="App flex h-screen">
      <div className="chatHistory h-screen w-1/3">

      </div>
      <div className="chatContainer flex flex-col h-screen w-2/3 bg-stone-200">
        <div className="chatDisplay h-4/5">
        {/*Displaying messages */}
          {messages.map((message, index) => (
            <div key={index} className="message w-2/5">
              <p>{message}</p>
            </div>
          ))}
        </div>
        <div className="chatInput relative h-1/5">
          {/* Input field for typing messages */}
          <input 
            type="text"
            className="w-[calc(100%-1rem)] h-12 border-2 pr-40 rounded-3xl z-10" 
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={newMessage}
          />
          <button
            type="Send" 
            className="absolute top-0 right-5 h-12 w-12"
            onClick={handleSendNewMessage}
            >
              <SendIcon 
                className='align-middle z-20' 
                style={{ 
                fontSize: 36
                }} 
              />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
