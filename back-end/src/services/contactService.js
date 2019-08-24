import ContactModel from './../models/contactModel';
import UserModel from './../models/userModel';
import NotificationModel from './../models/notificationModel';
import _ from "lodash";
import { rejects } from 'assert';

let findUserContact = (currentUserId, keyword) => {
  return new Promise(async(resolve, reject) => {
    let deprecatedUserIds = [];
    let contactsByUser = await ContactModel.findAllByUser(currentUserId);
    contactsByUser.forEach(element => {
      deprecatedUserIds.push(element.userId);
      deprecatedUserIds.push(element.contactId);
    });
    deprecatedUserIds = _.uniqBy(deprecatedUserIds);

    let users = await UserModel.findAllForAddContact(deprecatedUserIds, keyword);
    return resolve(users);
  })
}

let addNew = (currentUserId, contactId) => {
  return new Promise( async (resolve, reject) => {
    let contactExists = await ContactModel.checkExists(currentUserId, contactId);
    if(contactExists){
      return reject(false);
    }

    //crate contact
    let newContactItem = {
      userId: currentUserId,
      contactId: contactId,
    };
    let newContact = await ContactModel.createNew(newContactItem);

    //notification
    let notificationItem = {
      senderId: currentUserId,
      receiverId: contactId,
      type: NotificationModel.types.ADD_CONTACT,
    };
    await NotificationModel.model.createNew(notificationItem);

    resolve(newContact);
  })
}

let removeRequestContact = (currentUserId, contactId) => {
  return new Promise( async (resolve, reject) => {
    let removeReq = await ContactModel.removeRequestContact(currentUserId, contactId);
    if (removeReq.result.n === 0){
      return reject(false);
    }

    //remove notification
    await NotificationModel.model.removeRequestContactNotification(currentUserId, contactId, NotificationModel.types.ADD_CONTACT);

    return resolve(true);
  })
}
module.exports = {
  findUserContact,
  addNew,
  removeRequestContact
}