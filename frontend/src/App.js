import { useState, useEffect, useRef } from 'react';
import './App.css';
import SendIcon from '@material-ui/icons/Send';

function App() {
  // State Managment
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Ref for scrolling to the bottom of the chat
  const bottomRef = useRef(null);

  // Input Handling
  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
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

  // Scroll to the bottom of the chat when a new message is added
  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="App flex h-screen">
      <div className="chatHistory h-screen w-1/3">

      </div>
      <div className="chatContainer flex flex-col h-screen w-2/3 bg-zinc-100">
        <div className="chatDisplay flex flex-col items-end w-full h-4/5 overflow-auto">
        {/*Displaying messages */}
          {messages.map((message, index) => (
            <div key={index} className="message mr-6 mb-3 mt-3">
              <p className='max-w-full break-all px-3 py-2 text-base bg-zinc-300 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl truncate whitespace-normal max-w-md'>{message}</p>
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>
        <div className="chatInput relative w-full h-1/5">
          {/* Input field for typing messages */}
          <div
            className='flex items-center w-full max-w-[calc(100%-2rem)] h-12 pl-4 pr-16 mr-3 ml-3 border-2 rounded-3xl'>
            <textarea
              className='resize-none w-full text-base h-6 //TO DO bg-zinc-100'
              placeholder='Type here...'
              onInput={handleInputChange}
              onKeyDown={handleKeyDown}
              value={newMessage}
              ></textarea>
            <button
              type="Send"
              className="absolute top-0 right-5 h-12 w-12"
              onClick={handleSendNewMessage}>
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
    </div>
  );
}

export default App;
