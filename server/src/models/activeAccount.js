import mongoose, { model } from 'mongoose';
import { user } from '../services';

let Schema = mongoose.Schema;

let activeAccountSchema = new Schema({
  userId: String,
  contactNotif: {type: Number, default: 0},
  generalNotif: {type: Number, default: 1},
  timeOffline: {type: Number, default: Date.now},
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null}
});

activeAccountSchema.statics = {
  createNew(item){
    return this.create(item);
  },
  findByUserId(userId) {
    return this.findOne({'userId':userId}).exec();
  },
  addNotificationGeneral(userId){
    return this.findOneAndUpdate({'userId' : userId}, {$inc : {'generalNotif': 1}}).exec();
  },
  removeNotificationGeneral(userId){
    return this.findOneAndUpdate({'userId' : userId}, {$mul : {'generalNotif': 1}}).exec();
  },
  resetaddNotificationGeneral(userId){
    return this.findOneAndUpdate({'userId' : userId}, {'generalNotif': 0}).exec();
  },
  addNotificationContact(userId){
    return this.findOneAndUpdate({'userId' : userId}, {$inc : {'contactNotif': 1 , 'generalNotif': 1}}).exec();
  },
  removeNotificationContact(userId){
    return this.findOneAndUpdate({'userId' : userId}, {$mul : {'contactNotif': 1, 'generalNotif': 1}}).exec();
  },
  resetaddNotificationContact(userId){
    return this.findOneAndUpdate({'userId' : userId}, {'contactNotif': 0}).exec();
  },
  updateTimeOffline(userId){
    return this.findOneAndUpdate({'userId' : userId}, {'timeOffline' : Date.now()}).exec();
  }
}

module.exports = mongoose.model("activeAccount", activeAccountSchema);