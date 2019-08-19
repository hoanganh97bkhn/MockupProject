import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let notificationSchema = new Schema({
  sender: {
    id: String,
    nickname: String,
    avatar: String
  },
  receiver: {
    id: String,
    nickname: String,
    avatar: String,
  },
  type: String,
  content: String,
  isRead: Boolean,
  createAt: {type: Number, default: Date.now} 
})

module.exports = mongoose.model("notification", notificationSchema);