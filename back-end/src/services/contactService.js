import ContactModel from './../models/contactModel';
import UserModel from './../models/userModel';
import NotificationModel from './../models/notificationModel';
import ActiveAccountModel from './../models/activeAccount';
import _ from "lodash";
import { rejects } from 'assert';

const LIMIT_NUMBER_TAKEN = 10;

let findUserContact = (currentUserId, keyword) => {
  return new Promise(async(resolve, reject) => {
    let deprecatedUserIds = [currentUserId];
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
    await ActiveAccountModel.addNotificationContact(contactId);

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
    await ActiveAccountModel.removeNotificationContact(contactId);
    return resolve(true);
  })
}

let getContacts = (currentUserId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let contacts = await ContactModel.getContacts(currentUserId, LIMIT_NUMBER_TAKEN);
      let users = contacts.map(async(contact) => {
        if(contact.contactId == currentUserId){
          return await UserModel.findUserById(contact.userId)
        }
        else return await UserModel.findUserById(contact.contactId)
      });

      resolve(await Promise.all(users));
    } catch (error) {
      reject(error)
    }
  })
}

let getContactsSent = (currentUserId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let contacts = await ContactModel.getContactsSent(currentUserId, LIMIT_NUMBER_TAKEN);
      let users = contacts.map(async(contact) => {
        return await UserModel.findUserById(contact.contactId)
      });

      resolve(await Promise.all(users));
    } catch (error) {
      reject(error)
    }
  })
}

let getContactsReceived = (currentUserId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let contacts = await ContactModel.getContactsReceived(currentUserId, LIMIT_NUMBER_TAKEN);
      let users = contacts.map(async(contact) => {
        return await UserModel.findUserById(contact.userId)
      });

      resolve(await Promise.all(users));
    } catch (error) {
      reject(error)
    }
  })
}

let countAllContacts = (currentUserId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let count = await ContactModel.countAllContacts(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error)
    }
  })
}

let countAllContactsSent = (currentUserId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let count = await ContactModel.countAllContactsSent(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error)
    }
  })
}

let countAllContactsReceived = (currentUserId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let count = await ContactModel.countAllContactsReceived(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  findUserContact,
  addNew,
  removeRequestContact,
  getContacts,
  getContactsReceived,
  getContactsSent,
  countAllContacts,
  countAllContactsSent,
  countAllContactsReceived
}
