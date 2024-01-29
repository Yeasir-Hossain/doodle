require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/routes');

const PORT = process.env.PORT || 4000;

const app = express();

// middlewares
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(morgan('common'));

// use routes
app.use('/api', routes);

const server = app.listen(PORT, () => {
    console.log('=> Server listening on port', PORT);
});


// Graceful shutdown
const eventsToHandle = ['SIGTERM', 'SIGINT', 'unhandledRejection', 'uncaughtException', 'SIGUSR2'];
eventsToHandle.forEach(async e => process.on(e, async orgErr => {
    console.log(orgErr);
    server.close(() => {
        console.log('=> Server closed.');
        closeConnection(connection);
    });
    return process.exit();
}));
