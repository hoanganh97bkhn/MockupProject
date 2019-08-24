import NotificationModel from './../models/notificationModel';
import UserModel from "./../models/userModel";


/**
 * get notification when refesh page, limit 10 items/1
 * @param {String} currentUserId 
 * @param {number} limit 
 */
let getNotifications = (currentUserId, limit = 10) => {
  return new Promise(async(resolve, reject) => {
    try{
      let notifications = await NotificationModel.model.getByUserIdAndLimit(currentUserId, limit);

      let getNotifContents = notifications.map(async(notification) => {
        let sender = await UserModel.findUserById(notification.senderId);
        return NotificationModel.content.getContent(notification.type, notification.isRead, sender._id, sender.nickname, sender.avatar);
      });

      resolve(await Promise.all(getNotifContents));
    } catch(error){
      reject(error)
    }
  })
};

module.exports = {
  getNotifications
}