import mongoose from 'mongoose';
import { user } from '../services';

let Schema = mongoose.Schema;

let notificationSchema = new Schema({
  senderId: String,
  receiverId: String,
  type: String,
  isRead: {type: Boolean, default: false},
  isNotification : {type : Boolean, default: true},
  createdAt: {type: Number, default: Date.now} 
});

notificationSchema.statics = {
  createNew(item){
    return this.create(item);
  },
  
  removeRequestContactNotification(senderId, receiverId, type){
    return this.remove({
      $and:[
        {"senderId" : senderId},
        {"receiverId" : receiverId},
        {"type" : type},
      ]
    }).exec();
  },

  /**
   * 
   * @param {String} userId 
   * @param {number} limit 
   */
  getByUserIdAndLimit(userId, limit){
    return this.find({"receiverId" : userId}).sort({"createdAt" : -1}).limit(limit).exec();
  },
  updateMarkAllAsRead(userId){
    return this.updateMany({"receiverId" : userId}, {"isRead" : true}).exec();
  },
  readMore(userId, skip, limit){
    return this.find({"receiverId" : userId}).sort({"createdAt" : -1}).skip(skip).limit(limit).exec();
  }
}

const NOTIFICATION_TYPES = {
  WELLCOME : 'wellcome',
  ADD_CONTACT: "add_contact",
  CONFIRM_FRIEND : 'confirm_friend'
};
const NOTIFICATION_CONTENTS = {
  getContent: (_id, notificationType, isRead, userId, nickname, avatar) => {
    if(notificationType === NOTIFICATION_TYPES.ADD_CONTACT){
      return {
        id: _id,
        userId: userId,
        nickname: nickname,
        avatar : avatar,
        content: "send you a friend invitation",
        isRead: isRead
      }
    }
    if(notificationType === NOTIFICATION_TYPES.WELLCOME){
      return {
        id: _id,
        nickname: nickname,
        avatar : avatar,
        content: "Welcome, have fun!",
        isRead: isRead
      }
    }
    if(notificationType === NOTIFICATION_TYPES.CONFIRM_FRIEND){
      return {
        id: _id,
        nickname: nickname,
        avatar : avatar,
        content: "accepted the friend request",
        isRead: isRead
      }
    }
  }
}; 

module.exports = {
  model: mongoose.model("notification", notificationSchema),
  types: NOTIFICATION_TYPES,
  content: NOTIFICATION_CONTENTS
}