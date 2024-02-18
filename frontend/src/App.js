import './App.css';

function App() {
  return (
    <div className="App flex h-screen">
      <div className="chatHistory h-screen w-1/3">

      </div>
      <div className="chatContainer flex flex-col h-screen w-2/3">
        <div className="chatDisplay h-4/5">

        </div>
        <div className="chatInput h-1/5">
          <input type="text" className="w-[calc(100%-1rem)] h-12 border-2 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}

export default App;
