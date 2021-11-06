// import logo from './logo.svg';
import Button from '@mui/material/Button';
import './App.css';
import { useState } from 'react';
import { io } from 'socket.io-client';

const VARS = {
  socketUrl: 'pi.crspradlin.org:3001'
}

function App() {
  const [ledValue, setLedValue] = useState(0);

  const socket = io(VARS.socketUrl);

  const buttonClicked = () => {
    socket.emit('toggle-emit');
  }

  socket.on('toggle-finish', (value) => {
    setLedValue(value);
  })

  return (
    <div className="App">
      <header className="App-header">
        <p>Value: {ledValue}</p>
        <Button onClick={() => buttonClicked()} variant="outlined">Toggle</Button>
      </header>
    </div>
  );
}

export default App;
