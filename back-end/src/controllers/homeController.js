import {notification, message} from './../services/index';
import {timer} from './../services/index';
import request from 'request';
import { json } from 'body-parser';

// let getICETurnServer = () => {
//   return new Promise(async(resolve, reject)=>{
//     // Node Get ICE STUN and TURN list
//     let o = {
//       format: "urls"
//     };

//     let bodyString = JSON.stringify(o);
    
//     let options = {
//       url : 'https://global.xirsys.net/_turn/MockProject',
//       method: "PUT",
//       headers: {
//         "Authorization": "Basic " + Buffer.from("HoangAnh:c53ffbc0-d1ef-11e9-8e1d-0242ac110007").toString("base64"),
//         "Content-Type": "application/json",
//         "Content-Length": bodyString.length
//       }
//     };

//     // call a request to get ICE list of turn server
//     request(options, function(error, response, body){
//       if(error){
//         console.log('error')
//         return reject(error)
//       }
//       let bodyJson = JSON.parse(body);
//       resolve(bodyJson.v.iceServers);
//     })
//   })
// }

let getHome = async(req, res) => {
  try {
    //get notifi
    let {generalNotif, contactNotif} = await timer.getNotifi(req.user._id);
    res.status(200).send({
      user : req.user,
      generalNotif,
      contactNotif
    })
  } catch (error) {
    console.log(error)
  }
}

let getListDataNotification = async(req,res) => {
  try {
    //get list notifi
    let notifications = await notification.getNotifications(req.user._id, 10);

    //reset notifi
    await timer.resetCountNotifGeneral(req.user._id);

    res.status(200).send({
      notifications
    })
  } catch (error) {
    res.status(500).send(error)
  }
}

let markAllAsRead = async(req, res) => {
  try {
    let markAllAsRead = await notification.markAllAsRead(req.user._id);
    res.status(200).send(markAllAsRead)
  } catch (error) {
    console.log(error)
  }
} 

let getAllConversationItems = async(req, res) => {
  try {
    let getAllConversationItems = await message.getAllConversationItems(req.user._id);
    res.status(200).send(getAllConversationItems);
  } catch (error) {
    res.status(500).send(error)
  }
}

let getAllImages = async(req, res) => {
  try {
    let getAllImages = await message.getAllImages(req.user._id, req.query.messageId);
    res.status(200).send(getAllImages)
  } catch (error){
    res.status(500).send(error)
  }
}

let getAllFiles = async(req, res) => {
  try {
    let getAllFiles = await message.getAllFiles(req.user._id, req.query.messageId);
    res.status(200).send(getAllFiles)
  } catch (error){
    res.status(500).send(error)
  }
}


module.exports = {
  getHome,
  markAllAsRead,
  getListDataNotification,
  getAllConversationItems,
  getAllImages,
  getAllFiles
};
