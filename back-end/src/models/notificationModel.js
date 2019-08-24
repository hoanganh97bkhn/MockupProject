import mongoose from 'mongoose';
import { user } from '../services';

let Schema = mongoose.Schema;

let notificationSchema = new Schema({
  senderId: String,
  receiverId: String,
  type: String,
  isRead: {type: Boolean, default: false},
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
  }
}

const NOTIFICATION_TYPES = {
  ADD_CONTACT: "add_contact"
};
const NOTIFICATION_CONTENTS = {
  getContent: (notificationType, isRead, userId, nickname, avatar) => {
    if(notificationType === NOTIFICATION_TYPES.ADD_CONTACT){
      return {
        userId: userId,
        nickname: nickname,
        avatar : avatar,
        content: "send you a friend invitation",
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