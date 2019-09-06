import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB';
import bodyParser from 'body-parser';
import initRouters from './routers/web';
import passPort from 'passport';
import http from 'http';
import socketio from 'socket.io';
import initSockets from "./sockets/index";
import configSocketIo from './config/socketio';
import events from 'events';

//Init app
let app = express();

events.EventEmitter.defaultMaxListeners = 25;

//init server with socket.io & express
let server = http.createServer(app);
let io = socketio(server);

//connect mongoDB
connectDB();

// enable post data for request
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// setting cors port 3000
app.use(cors())

// Config passport js
app.use(passPort.initialize())

//Init routers
initRouters(app);

//SOCKET USE
configSocketIo(io);

//Init sockets
initSockets(io);

server.listen(process.env.APP_PORT, () => {
  console.log(`The server listening on port ${process.env.APP_PORT}!`);
});