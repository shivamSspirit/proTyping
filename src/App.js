import './App.css';
// import Alpha from './components/Alpha/Alpha';
import Timer from './components/Timer/Timer';

import GlobalProvider from './context/globalState';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <div className='game-container'>
          <h1>Type the Alphabates</h1>
          <p>Typing game to see how you fast you type. Timer and Game start when you click on <strong>Start Game</strong> button show in time section</p>
          <div className='timer-container'>
            <Timer />
          </div>
        </div>
      </GlobalProvider>
    </div>
  );
}

export default App;
