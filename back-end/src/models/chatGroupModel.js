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
  updatedAt: {type: Number, default: null},
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
    }).sort({"createdAt" : -1}).limit(limit).exec();
  }
}

module.exports = mongoose.model("chat-group" , chatGroupSchema);
