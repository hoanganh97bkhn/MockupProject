import ContactModel from './../models/contactModel';
import UserModel from './../models/userModel';
import ChatGroupModel from './../models/chatGroupModel';
import MessageModel from './../models/messageModel';
import _ from 'lodash';
import fsExtra from 'fs-extra';


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
        let getMessages = await MessageModel.model.getMessagesInPersonal(currentUserId, conversation._id, LIMIT_MESSAGES_TAKEN);

        conversation = conversation.toObject();
        conversation.messages = _.reverse(getMessages);
        return conversation
      });

      let userConversationsWithMessages = await Promise.all(userConversationsWithMessagesPromise);
      userConversationsWithMessages = _.sortBy(userConversationsWithMessages, (item) => {
        return -item.updatedAt;
      })

      /**get message for groupConversations */
      let groupConversationsWithMessagesPromise = groupConversations.map(async(conversation) => {
        let getMessages = await MessageModel.model.getMessagesInGroup(conversation._id, LIMIT_MESSAGES_TAKEN);

        conversation = conversation.toObject();
        conversation.messages = _.reverse(getMessages);
        return conversation
      });

      let groupConversationsWithMessages = await Promise.all(groupConversationsWithMessagesPromise);
      groupConversationsWithMessages = _.sortBy(groupConversationsWithMessages, (item) => {
        return -item.updatedAt;
      })

      /**get message for allConversations */
      // let allConversationsWithMessagesPromise = allConversations.map(async(conversation) => {
      //   conversation = conversation.toObject();

      //   if(conversation.members){

      //   }
      //   else {}
      //   let getMessages = await MessageModel.model.getMessages(currentUserId, conversation._id, LIMIT_MESSAGES_TAKEN);

        
      //   conversation.messages = getMessages;
      //   return conversation
      // });

      // let allConversationsWithMessages = await Promise.all(allConversationsWithMessagesPromise);
      let allConversationsWithMessages = userConversationsWithMessages.concat(groupConversationsWithMessages)
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

let addNewTexEmoji = (sender, receiverId, messageVal, isGroup) => {
  return new Promise(async(resolve, reject) => {
    try {
      if(isGroup){
        let getChatGroupReceiver = await ChatGroupModel.getChatGroupById(receiverId);
        if(!getChatGroupReceiver){
          reject("Group not found")
        }
        let receiver = {
          id: getChatGroupReceiver._id,
          name : getChatGroupReceiver.name,
          avatar : "group-avatar.png"
        };

        let newMessageItem = {
          senderId : sender.id,
          receiverId : receiver.id,
          conversationType : MessageModel.conversationTypes.GROUP,
          messageType : MessageModel.messageTypes.TEXT,
          sender: sender,
          receiver: receiver,
          text: messageVal,
          createdAt: Date.now(),
        }

        //create new message
        let newMessage = await MessageModel.model.createNew(newMessageItem);
        //update gr chat
        await ChatGroupModel.updateWhenHasNewMessage(getChatGroupReceiver._id, getChatGroupReceiver.messageAmount + 1);
        resolve(newMessage)
      } else {
        let getUserReceiver = await UserModel.getNormalUserDataById(receiverId);
        if(!getUserReceiver){
          reject("Contact not found")
        }
        let receiver = {
          id: getUserReceiver._id,
          name : getUserReceiver.nickname,
          avatar : getUserReceiver.avatar
        };

        let newMessageItem = {
          senderId : sender.id,
          receiverId : receiver.id,
          conversationType : MessageModel.conversationTypes.PERSONAL,
          messageType : MessageModel.messageTypes.TEXT,
          sender: sender,
          receiver: receiver,
          text: messageVal,
          createdAt: Date.now(),
        }

        //create new message
        let newMessage = await MessageModel.model.createNew(newMessageItem);
        //update contact
        console.log(sender.id, getUserReceiver._id)
        await ContactModel.updateWhenHasNewMessage(sender.id, getUserReceiver._id)
        resolve(newMessage)
      }
    } catch (error) {
      reject(error)
    }
  })
}

let addNewImage = (sender, receiverId, messageVal, isGroup) => {
  return new Promise(async(resolve, reject) => {
    
    try {
      if(isGroup){
        let getChatGroupReceiver = await ChatGroupModel.getChatGroupById(receiverId);
        if(!getChatGroupReceiver){
          reject("Group not found")
        }
        let receiver = {
          id: getChatGroupReceiver._id,
          name : getChatGroupReceiver.name,
          avatar : "group-avatar.png"
        };

        let imageBuffer = await fsExtra.readFile(messageVal.path);
        let imageContentType = messageVal.type;
        let imageName = messageVal.originalName;

        let newMessageItem = {
          senderId : sender.id,
          receiverId : receiver.id,
          conversationType : MessageModel.conversationTypes.GROUP,
          messageType : MessageModel.messageTypes.IMAGE,
          sender: sender,
          receiver: receiver,
          file: {
            data: imageBuffer,
            contentType: imageContentType,
            fileName : imageName
          },
          createdAt: Date.now(),
        }

        //create new message
        let newMessage = await MessageModel.model.createNew(newMessageItem);
        //update gr chat
        await ChatGroupModel.updateWhenHasNewMessage(getChatGroupReceiver._id, getChatGroupReceiver.messageAmount + 1);
        resolve(newMessage)
      } else {
        let getUserReceiver = await UserModel.getNormalUserDataById(receiverId);
        if(!getUserReceiver){
          reject("Contact not found")
        }
        let receiver = {
          id: getUserReceiver._id,
          name : getUserReceiver.nickname,
          avatar : getUserReceiver.avatar
        };

        let imageBuffer = await fsExtra.readFile(messageVal.path);
        let imageContentType = messageVal.type;
        let imageName = messageVal.originalName;

        let newMessageItem = {
          senderId : sender.id,
          receiverId : receiver.id,
          conversationType : MessageModel.conversationTypes.PERSONAL,
          messageType : MessageModel.messageTypes.IMAGE,
          sender: sender,
          receiver: receiver,
          file: {
            data: imageBuffer,
            contentType: imageContentType,
            fileName : imageName
          },
          createdAt: Date.now(),
        }

        //create new message
        let newMessage = await MessageModel.model.createNew(newMessageItem);
        //update contact
        await ContactModel.updateWhenHasNewMessage(sender.id, getUserReceiver._id)
        resolve(newMessage)
      }
    } catch (error) {
      reject(error)
    }
  })
}

let addNewFile = (sender, receiverId, messageVal, isGroup) => {
  return new Promise(async(resolve, reject) => {
    
    try {
      if(isGroup){
        let getChatGroupReceiver = await ChatGroupModel.getChatGroupById(receiverId);
        if(!getChatGroupReceiver){
          reject("Group not found")
        }
        let receiver = {
          id: getChatGroupReceiver._id,
          name : getChatGroupReceiver.name,
          avatar : "group-avatar.png"
        };

        let imageBuffer = await fsExtra.readFile(messageVal.path);
        let imageContentType = messageVal.type;
        let imageName = messageVal.originalName;

        let newMessageItem = {
          senderId : sender.id,
          receiverId : receiver.id,
          conversationType : MessageModel.conversationTypes.GROUP,
          messageType : MessageModel.messageTypes.FILE,
          sender: sender,
          receiver: receiver,
          file: {
            data: imageBuffer,
            contentType: imageContentType,
            fileName : imageName
          },
          createdAt: Date.now(),
        }

        //create new message
        let newMessage = await MessageModel.model.createNew(newMessageItem);
        //update gr chat
        await ChatGroupModel.updateWhenHasNewMessage(getChatGroupReceiver._id, getChatGroupReceiver.messageAmount + 1);
        resolve(newMessage)
      } else {
        let getUserReceiver = await UserModel.getNormalUserDataById(receiverId);
        if(!getUserReceiver){
          reject("Contact not found")
        }
        let receiver = {
          id: getUserReceiver._id,
          name : getUserReceiver.nickname,
          avatar : getUserReceiver.avatar
        };

        let imageBuffer = await fsExtra.readFile(messageVal.path);
        let imageContentType = messageVal.type;
        let imageName = messageVal.originalName;

        let newMessageItem = {
          senderId : sender.id,
          receiverId : receiver.id,
          conversationType : MessageModel.conversationTypes.PERSONAL,
          messageType : MessageModel.messageTypes.FILE,
          sender: sender,
          receiver: receiver,
          file: {
            data: imageBuffer,
            contentType: imageContentType,
            fileName : imageName
          },
          createdAt: Date.now(),
        }

        //create new message
        let newMessage = await MessageModel.model.createNew(newMessageItem);
        //update contact
        await ContactModel.updateWhenHasNewMessage(sender.id, getUserReceiver._id)
        resolve(newMessage)
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  getAllConversationItems,
  getAllImages,
  getAllFiles,
  addNewTexEmoji,
  addNewImage,
  addNewFile
}
