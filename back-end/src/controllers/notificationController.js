import {notification} from './../services/index';

let getMoreListDataNotif = async(req, res) => {
  try {

    let skipNumberNotif = +(req.body.skip);
    //get more notification
    let newNotifications = await notification.readMore(req.user._id, skipNumberNotif);
    res.status(200).send(newNotifications)
  } catch (error) {
    res.status(500).send(error)
  }
}

module.exports = {
  getMoreListDataNotif
}