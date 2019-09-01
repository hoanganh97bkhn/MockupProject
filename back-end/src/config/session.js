import session from 'express-session';
import connectMongo from 'connect-mongo';

let MongoStore = connectMongo(session);

/**
 * This varable is where save session, in this case is mongoDB
 */

 let sessionStore = new MongoStore({
   url: `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
   autoReconnect: true,
 });

 /**
  * Config session for app
  * @param app from exactly express module
  */

  let config = (app) => {
    app.use(session({
      key: "express.sid",
      secret: "mySecret",
      store: sessionStore,
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24  //1 day
      }
    }))
  };

  module.exports = {
    config,
    sessionStore
  };
