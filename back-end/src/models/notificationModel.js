import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let notificationSchema = new Schema({
  sender: {
    id: String,
    userName: String,
    avatar: String
  },
  receiver: {
    id: String,
    userName: String,
    avatar: String,
  },
  type: String,
  content: String,
  isRead: Boolean,
  createAt: {type: Number, default: Date.now} 
})

module.exports = mongoose.model("notification", notificationSchema);