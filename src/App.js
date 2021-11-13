// import logo from './logo.svg';
import Button from '@mui/material/Button';
import './App.css';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socket;

function App() {
  const [ledValue, setLedValue] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    socket = io();

    socket.connect();

    socket.on('toggle-finish', (value) => {
      setLedValue(value);
    });
  
    socket.on('toggle-done', () => {
      setButtonDisabled(false);
    });
  })

  const buttonClicked = () => {
    socket.emit('toggle-emit');
    setButtonDisabled(true);
  };

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
