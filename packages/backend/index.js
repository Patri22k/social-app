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
const { PrismaClient } = require('@prisma/client');
const { jwtMW } = require('./middleware/auth');

const app = express();
const prisma = new PrismaClient();

const server = require('http').createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: "true",
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

// Set up the /users endpoint
app.get('/users', async (req, res) => {
    const { name } = req.query.name;

    // Query the database using Prisma
    const users = await prisma.user.findMany({
        where: {
            name: {
                contains: name,
            },
        },
    });

    // Send the result back to the client
    res.json(users);
});

io.on('connect', (socket) => {
    // Handle socket events here
});

server.listen(5000, () => {
    console.log('Server is running...');
});
