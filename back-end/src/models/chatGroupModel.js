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
  avatar : {type : String, default : 'group-avatar.png'},
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
  },

  getListMembers(groupId){
    return this.findById(groupId, {"members.userId" : 1, userId : 1}).exec();
  },

  addNewMember(groupId, memberId){
    let member = {'userId' : memberId};
    return this.findByIdAndUpdate(groupId, {$push : {members : member}}).exec()
  },

  removeMember(groupId, memberId){
    return this.findByIdAndUpdate(groupId, {$pull : {members : {userId : memberId}}}).exec()
  },

  readMoreChatGroups(userId, skip, limit){
    return this.find({
      "members" : {$elemMatch : {"userId" : userId}}
    }).sort({"updatedAt" : -1}).skip(skip).limit(limit).exec();
  },

  searchGroups(userId, keyword){
    return this.find({
      $and : [
        {"members" : {$elemMatch : {"userId" : userId}}},
        {"name": {"$regex": new RegExp(keyword, "i")}}
      ]
    },{_id : 1, name : 1, avatar : 1, usersAmount : 1}).sort({'updatedAt' : -1}).exec();
  }
}

module.exports = mongoose.model("chat-group" , chatGroupSchema);
