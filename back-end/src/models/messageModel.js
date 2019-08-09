import mongoose, { model } from 'mongoose';

let Schema = mongoose.Schema;

let messageSchema = new Schema({
  sender: {
    id: String,
    userName: String,
    avatar: String,
  },
  receiver: {
    id: String,
    userName: String,
    avatar: String
  },
  text: String,
  file: {
    data: Buffer,
    contentFile: String,

  },
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null}
});

messageSchema.statics = {
  createNew(item){
    return this.create(item);
  }
}

module.exports = mongoose.model("message", messageSchema);