import {notification} from './../services/index';
import {timer} from './../services/index';

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


module.exports = {
  getHome,
  markAllAsRead,
  getListDataNotification,
};
