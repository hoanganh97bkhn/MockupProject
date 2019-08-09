import mongoose from 'mongoose';

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
  }
}