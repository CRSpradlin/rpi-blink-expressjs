// import logo from './logo.svg';
import Button from '@mui/material/Button';
import './App.css';
import { useState } from 'react';
import { io } from 'socket.io-client';

const socket = io();

function App() {
  const [ledValue, setLedValue] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const buttonClicked = () => {
    socket.emit('toggle-emit');
    setButtonDisabled(true);
  };

  socket.on('toggle-finish', (value) => {
    setLedValue(value);
  });

  socket.on('toggle-done', () => {
    setButtonDisabled(false);
  })

  return (
    <div className="App">
      <header className="App-header">
        <p>Value: {ledValue}</p>
        <Button disabled={buttonDisabled} onClick={() => buttonClicked()} variant="outlined">Toggle</Button>
      </header>
    </div>
  );
}

export default App;
