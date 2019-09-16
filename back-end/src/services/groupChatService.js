import chatGroupModel from './../models/chatGroupModel';
import UserModel from './../models/userModel';
import MessageModel from './../models/messageModel';
import _ from 'lodash';

const LIMIT_MESSAGES_TAKEN = 30;

let addNewGroup = (currentUserId, arrayMemberIds, groupChatName) => {
  return new Promise(async(resole, reject) => {
    try {
      //add currUserId to arrayMember
      arrayMemberIds.unshift(`${currentUserId}`);
      
      arrayMemberIds = arrayMemberIds.map(item => {
        return {
          'userId' : item
        }
      });
      
      let newGroupItem = {
        name: groupChatName,
        usersAmount: arrayMemberIds.length,
        userId: `${currentUserId}`,
        members: arrayMemberIds,
      }

      let newGroup =  await chatGroupModel.createNew(newGroupItem);
      resole(newGroup);
    } catch (error) {
      reject(error)
    }
  })
};

let listMembers = (userId, groupId) => {
  return new Promise (async (resolve, reject) => {
    try {
      let listMembers = await chatGroupModel.getListMembers(groupId);
      let isAdmin;
      if(listMembers.userId == userId) {
          isAdmin = true;
      }
      else {
          isAdmin = false
      }

      let userMemberPromise = listMembers.members.map(async(memeber) => {
        let getUserMember = await UserModel.getNormalUserDataById(memeber.userId);
        return getUserMember;
      });

      resolve({isAdmin ,listInfo: await Promise.all(userMemberPromise)});
    
    } catch (error) {
      reject(error)
    }
  })
}

let addNewMember = (groupId, memeberId) => {
  return new Promise (async (resolve, reject) => {
    try {
      await chatGroupModel.addNewMember(groupId, memeberId);
      let groupConversations = await chatGroupModel.findById(groupId);

      /**get message for groupConversations */
      let getMessages = await MessageModel.model.getMessagesInGroup(groupConversations._id, LIMIT_MESSAGES_TAKEN);
      groupConversations = groupConversations.toObject();
      groupConversations.messages = _.reverse(getMessages);
      
      console.log(groupConversations)
      resolve(groupConversations);
    
    } catch (error) {
      reject(error)
    }
  })
}

let removeMember = (groupId, memeberId) => {
  return new Promise (async (resolve, reject) => {
    try {
      let removeMember = await chatGroupModel.removeMember(groupId, memeberId);
      resolve(!!removeMember);
    } catch (error) {
      reject(error)
    }
  })
}

let leaveGroup = (groupId, memeberId) => {
  return new Promise (async (resolve, reject) => {
    try {
      let removeMember = await chatGroupModel.removeMember(groupId, memeberId);
      resolve(!!removeMember);
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  addNewGroup,
  listMembers,
  addNewMember,
  removeMember,
  leaveGroup
}
