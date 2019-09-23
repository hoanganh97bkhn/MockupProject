import mongoose from 'mongoose';
import bluebird from 'bluebird';

/**
 * Connect mongoDB
 */

 let connectDB = () => {
   mongoose.Promise = bluebird;

   //URI mongo
  //  let URI = `${process.env.DB_CONNECTION}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
      let URI = `mongodb+srv://mockproject:25111996xxx0@cluster0-do4i4.mongodb.net/test?retryWrites=true&w=majority`
  
   return mongoose.connect(URI, {useMongoClient: true});
 }

 module.exports = connectDB;
 