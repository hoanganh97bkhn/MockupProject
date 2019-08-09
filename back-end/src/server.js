import express from 'express';
import cors from 'cors';
import connectDB from './config/connectDB';
import configSession from "./config/session";
import bodyParser from 'body-parser';
import initRouters from './routers/web';
import passPort from 'passport';
import connectFlash from 'connect-flash';

//Init app
let app = express();

//connect mongoDB
connectDB();

//Config session
configSession(app);

// enable post data for request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// setting cors port 3000
app.use(cors({
  origin : ['http://localhost:3000'],
}))

// Enable flash messages
app.use(connectFlash())

// Config passport js
app.use(passPort.initialize())
app.use(passPort.session());

//Init routers
initRouters(app);

app.listen(process.env.APP_PORT, () => {
  console.log(`The app listening on port ${process.env.APP_PORT}!`);
});