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
      <div className="chatContainer flex flex-col h-screen w-2/3 bg-zinc-100">
        <div className="chatDisplay flex flex-col items-end w-full h-4/5 overflow-auto">
        {/*Displaying messages */}
          {messages.map((message, index) => (
            <div key={index} className="message text-right mr-6 mb-3 mt-3 w-2/5 max-w-md">
              <p className='max-w-full break-all px-3 py-2 text-base bg-zinc-300 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl truncate whitespace-normal max-w-md'>{message}</p>
            </div>
          ))}
          <div ref={(el) => { el?.scrollIntoView({ behavior: 'smooth' }); }} />
        </div>
        <div className="chatInput relative w-full h-1/5">
          {/* Input field for typing messages */}
          <input 
            type="text"
            placeholder='Type here...'
            className="w-[calc(100%-2rem)] text-base pl-4 mr-3 ml-3 h-12 border-2 rounded-3xl z-10" 
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
