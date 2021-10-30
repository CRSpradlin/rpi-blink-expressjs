const express = require('express');
const app = express();
const path = require('path');

const gpio = require('onoff').Gpio;
const led = new gpio(23, 'out');

const flipLed = async () => {
  const currVal = await led.read();
  await led.write(currVal ^ 1);
  return (currVal ^ 1);
}

app.get('/flip', async (req, res) => {
  const ledValue = await flipLed();
  res.send('good flip!<br>Current Value: ' + ledValue);
});

app.listen(8081);
