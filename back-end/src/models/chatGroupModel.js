import mongoose from 'mongoose';
import { user } from '../services';

let Schema = mongoose.Schema;

let chatGroupSchema = new Schema({
  name: String,
  usersAmount: {type: Number, min: 3, max: 10},
  messageAmount: {type: Number, default: 0},
  userId: String,
  members: [
    {userId: String}
  ],
  status: {type: Boolean, default: false},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: Date.now},
  deletedAt: {type: Number, default: null}
});

chatGroupSchema.statics = {
  createNew(item){
    return this.create(item);
  },

  /**
   * get chat group items
   * @param {*} userId 
   * @param {*} limit 
   */
  getChatGroups(userId, limit) {
    return this.find({
      "members" : {$elemMatch : {"userId" : userId}}
    }).sort({"updatedAt" : -1}).limit(limit).exec();
  },

  getChatGroupById(receiverId){
    return this.findById(receiverId).exec();
  },
  
  updateWhenHasNewMessage(id,messageAmount){
    return this.findByIdAndUpdate(id, {
      'messageAmount' : messageAmount,
      'updatedAt' : Date.now()
    })
  },

  getChatGroupIdByUser(userId){
    return this.find({
      "members" : {$elemMatch : {"userId" : userId}}
    },{"_id" : 1}).exec();
  }
}

module.exports = mongoose.model("chat-group" , chatGroupSchema);
