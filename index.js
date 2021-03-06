const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

const gpio = require('onoff').Gpio;
const led = new gpio(23, 'out');

const flipLed = async () => {
    const currVal = await led.read();
    await led.write(currVal ^ 1);
    return (currVal ^ 1);
}

io.on('connection', async (socket) => {
    socket.emit('toggle-finish', await led.read());
    socket.on('toggle-emit', async () => {
        const newValue = await flipLed();
        io.sockets.emit('toggle-finish', newValue);
        socket.emit('toggle-done', true);
    });
});

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

