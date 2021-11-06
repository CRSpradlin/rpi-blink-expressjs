const express = require("express");
const { Server } = require("socket.io");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server();

const gpio = require('onoff').Gpio;
const led = new gpio(23, 'out');

const flipLed = async () => {
    const currVal = await led.read();
    await led.write(currVal ^ 1);
    return (currVal ^ 1);
}

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('toggle-emit', async () => {
        const newValue = await flipLed();
        socket.emit('toggle-finish', newValue);
    });
});

server.listen(, () => {
    console.log('listening on *:3000');
});

