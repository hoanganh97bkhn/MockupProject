import mongoose, { model } from 'mongoose';

let Schema = mongoose.Schema;

let messageSchema = new Schema({
  senderId : String,
  receiverId : String,
  conversationType : String,
  messageType : String,
  sender: {
    id: String,
    nickname: String,
    avatar: String,
  },
  receiver: {
    id: String,
    nickname: String,
    avatar: String
  },
  text: String,
  file: {
    data: Buffer,
    contentType: String,
    fileName : String
  },
  createdAt: {type: Number, default: Date.now},
  updatedAt: {type: Number, default: null},
  deletedAt: {type: Number, default: null}
});

messageSchema.statics = {
  createNew(item){
    return this.create(item);
  },

  /**
   * get messages
   * @param {*} senderId 
   * @param {*} receiverId 
   * @param {*} limit 
   */
  getMessages(senderId, receiverId, limit){
    return this.find({
      $or: [
        {$and: [
          {"senderId" : senderId},
          {"receiverId" : receiverId},
        ]},
        {$and: [
          {"senderId" : receiverId},
          {"receiverId" : senderId},
        ]}
      ]
    }).sort({"createAt" : 1}).limit(limit).exec();
  },

  getAllImages(senderId, receiverId){
    return this.find({
      $or: [
        {$and: [
          {"senderId" : senderId},
          {"receiverId" : receiverId},
          {"messageType" : MESSAGE_TYPES.IMAGE}
        ]},
        {$and: [
          {"senderId" : receiverId},
          {"receiverId" : senderId},
          {"messageType" : MESSAGE_TYPES.IMAGE}
        ]}
      ]
    }).sort({"createAt" : 1}).exec();
  },

  getAllFiles(senderId, receiverId){
    return this.find({
      $or: [
        {$and: [
          {"senderId" : senderId},
          {"receiverId" : receiverId},
          {"messageType" : MESSAGE_TYPES.FILE}
        ]},
        {$and: [
          {"senderId" : receiverId},
          {"receiverId" : senderId},
          {"messageType" : MESSAGE_TYPES.FILE}
        ]}
      ]
    }).sort({"createAt" : 1}).exec();
  },
}

const MESSAGE_CONVERSATION_TYPES = {
  PERSONAL: 'personal',
  GROUP : 'group'
}

const MESSAGE_TYPES = {
  TEXT : "text",
  IMAGE : "image",
  FILE : "file",
}


module.exports = {
  model : mongoose.model("message", messageSchema),
  conversationTypes : MESSAGE_CONVERSATION_TYPES,
  messageTypes : MESSAGE_TYPES
}