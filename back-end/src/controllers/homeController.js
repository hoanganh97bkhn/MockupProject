import {notification} from './../services/index';

let getHome = async(req, res) => {
  try {
    let notifications = await notification.getNotifications(req.user._id, 10);
    res.status(200).send({
      user : req.user,
      notifications
    })
  } catch (error) {
    
  }
}

module.exports = {
  getHome
};
