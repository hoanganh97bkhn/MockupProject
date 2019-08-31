import ContactModel from './../models/contactModel';
import UserModel from './../models/userModel';
import ChatGroupModel from './../models/chatGroupModel';
import MessageModel from './../models/messageModel';
import _ from 'lodash';


const LIMIT_CONVERSATION_TAKEN = 15;
const LIMIT_MESSAGES_TAKEN = 30;

let getAllConversationItems = (currentUserId) => {
  return new Promise (async(resolve, reject) => {
    try {
      let contacts = await ContactModel.getContacts(currentUserId, LIMIT_CONVERSATION_TAKEN);
      let userConversationsPromise = contacts.map(async(contact) => {
        if(contact.contactId == currentUserId){
          let getUserContact = await UserModel.getNormalUserDataById(contact.userId);
          getUserContact.updatedAt = contact.updatedAt;
          return getUserContact;
        }
        else {
          let getUserContact = await UserModel.getNormalUserDataById(contact.contactId);
          getUserContact.updatedAt = contact.updatedAt;
          return getUserContact;
        }
      });
      let userConversations = await Promise.all(userConversationsPromise);
      let groupConversations = await ChatGroupModel.getChatGroups(currentUserId, LIMIT_CONVERSATION_TAKEN);
      let allConversations = userConversations.concat(groupConversations);
      
      allConversations = _.sortBy(allConversations, (item) => {
        return -item.updatedAt;
      })

      /**get message for userConversations */
      let userConversationsWithMessagesPromise = userConversations.map(async(conversation) => {
        let getMessages = await MessageModel.model.getMessages(currentUserId, conversation._id, LIMIT_MESSAGES_TAKEN);

        conversation = conversation.toObject();
        conversation.messages = getMessages;
        return conversation
      });

      let userConversationsWithMessages = await Promise.all(userConversationsWithMessagesPromise);
      userConversationsWithMessages = _.sortBy(userConversationsWithMessages, (item) => {
        return -item.updatedAt;
      })

      /**get message for groupConversations */
      let groupConversationsWithMessagesPromise = groupConversations.map(async(conversation) => {
        let getMessages = await MessageModel.model.getMessages(currentUserId, conversation._id, LIMIT_MESSAGES_TAKEN);

        conversation = conversation.toObject();
        conversation.messages = getMessages;
        return conversation
      });

      let groupConversationsWithMessages = await Promise.all(groupConversationsWithMessagesPromise);
      groupConversationsWithMessages = _.sortBy(groupConversationsWithMessages, (item) => {
        return -item.updatedAt;
      })

      /**get message for allConversations */
      let allConversationsWithMessagesPromise = allConversations.map(async(conversation) => {
        let getMessages = await MessageModel.model.getMessages(currentUserId, conversation._id, LIMIT_MESSAGES_TAKEN);

        conversation = conversation.toObject();
        conversation.messages = getMessages;
        return conversation
      });

      let allConversationsWithMessages = await Promise.all(allConversationsWithMessagesPromise);
      allConversationsWithMessages = _.sortBy(allConversationsWithMessages, (item) => {
        return -item.updatedAt;
      })

      resolve({userConversationsWithMessages, groupConversationsWithMessages, allConversations, allConversationsWithMessages});
    }catch (error) {
      reject(error)
    }
  })
}

let getAllImages = (currentUserId, messageId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let getImages =await MessageModel.model.getAllImages(currentUserId, messageId);
      resolve(getImages)
    } catch (error) {
      reject(error)
    }
  })
}

let getAllFiles = (currentUserId, messageId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let getFile = await MessageModel.model.getAllFiles(currentUserId, messageId);
      resolve(getFile)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  getAllConversationItems,
  getAllImages,
  getAllFiles,

}
