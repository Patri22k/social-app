import './App.css';
import SendIcon from '@material-ui/icons/Send';

function App() {
  return (
    <div className="App flex h-screen">
      <div className="chatHistory h-screen w-1/3">

      </div>
      <div className="chatContainer flex flex-col h-screen w-2/3">
        <div className="chatDisplay h-4/5">

        </div>
        <div className="chatInput relative h-1/5">
          <input type="text" className="w-[calc(100%-1rem)] h-12 border-2 pr-40 rounded-3xl" />
          <button 
           type="Send" 
           className="absolute top-0 right-5 h-12 w-12">
            <SendIcon 
             className='align-middle' 
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
