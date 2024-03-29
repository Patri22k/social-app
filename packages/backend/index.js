/**
 * This is the main file for the backend of the social app.
 * It sets up the Express server, Socket.IO, and routes for authentication.
 */

const express = require('express');
const { Server } = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./routers/authRouter');
const userRouter = require('./routers/userRouter');
const { jwtMW } = require('./middleware/auth');
const { secret } = require('./controlers/auth');

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

/**
 * Middleware for handling authentication routes.
 * All routes starting with '/auth' will be handled by the authRouter.
 */
app.use('/auth', authRouter);
app.use(jwtMW);
app.use(userRouter);

/**
 * Event listener for when a client connects to the server using Socket.IO.
 * This function will be called whenever a new client connects.
 *
 * @param {Socket} socket - The Socket.IO socket object representing the client connection.
 */
io.on('connect', (socket) => {
    // Handle socket events here
});

/**
 * Start the server and listen on port 5000.
 * This function will be called when the server starts listening.
 */
server.listen(5000, () => {
    console.log('Server is running...');
});
