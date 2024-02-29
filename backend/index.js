const express = require('express');
const { Server } = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routhers/authRouter');

const app = express();

const server = require('http').createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credential: "true",
    },
});

app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use('/auth', authRouter);

io.on('connect', (socket) => {

});

server.listen(5000, () => {
    console.log('Server is running...');
});