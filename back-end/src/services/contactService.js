import ContactModel from './../models/contactModel';
import UserModel from './../models/userModel';
import NotificationModel from './../models/notificationModel';
import ActiveAccountModel from './../models/activeAccount';
import _ from "lodash";

const LIMIT_NUMBER_TAKEN = 5;

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
};

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
};

let removeRequestContactSent = (currentUserId, contactId) => {
  return new Promise( async (resolve, reject) => {
    let removeReq = await ContactModel.removeRequestContactSent(currentUserId, contactId);
    if (removeReq.result.n === 0){
      return reject(false);
    }

    //remove notification
    await NotificationModel.model.removeRequestContactNotification(currentUserId, contactId, NotificationModel.types.ADD_CONTACT);
    await ActiveAccountModel.removeNotificationContact(contactId);
    return resolve(true);
  })
};

let removeRequestContactReceived = (currentUserId, contactId) => {
  return new Promise( async (resolve, reject) => {
    let removeReq = await ContactModel.removeRequestContactReceived(currentUserId, contactId);
    if (removeReq.result.n === 0){
      return reject(false);
    }

    return resolve(true);
  })
};

let removeContact = (currentUserId, contactId) => {
  return new Promise( async (resolve, reject) => {
    let removeReq = await ContactModel.removeContact(currentUserId, contactId);
    if (removeReq.result.n === 0){
      return reject(false);
    }

    return resolve(true);
  })
};

let confirmRequestContactReceived = (currentUserId, contactId) => {
  return new Promise( async (resolve, reject) => {
    let confirmReq = await ContactModel.confirmRequestContactReceived(currentUserId, contactId);
    if (confirmReq.nModified === 0){
      return reject(false);
    }
    //notification
    let notificationItem = {
      senderId: currentUserId,
      receiverId: contactId,
      type: NotificationModel.types.CONFIRM_FRIEND,
    };
    await NotificationModel.model.createNew(notificationItem);
    //await ActiveAccountModel.addNotificationContact(contactId);
    let contactItem = await ContactModel.getNewContacts(currentUserId, contactId);
    let getUserContact = await UserModel.getNormalUserDataById(contactId);
    getUserContact = getUserContact.toObject();
    getUserContact.updatedAt = contactItem.updatedAt;
    getUserContact.messages = [];
    return resolve(getUserContact);
  })
};

let getContacts = (currentUserId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let contacts = await ContactModel.getContacts(currentUserId, LIMIT_NUMBER_TAKEN);
      let users = contacts.map(async(contact) => {
        if(contact.contactId == currentUserId){
          return await UserModel.getNormalUserDataById(contact.userId)
        }
        else return await UserModel.getNormalUserDataById(contact.contactId)
      });

      resolve(await Promise.all(users));
    } catch (error) {
      reject(error)
    }
  })
};

let getContactsSent = (currentUserId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let contacts = await ContactModel.getContactsSent(currentUserId, LIMIT_NUMBER_TAKEN);
      let users = contacts.map(async(contact) => {
        return await UserModel.getNormalUserDataById(contact.contactId)
      });

      resolve(await Promise.all(users));
    } catch (error) {
      reject(error)
    }
  })
};

let getContactsReceived = (currentUserId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let contacts = await ContactModel.getContactsReceived(currentUserId, LIMIT_NUMBER_TAKEN);
      let users = contacts.map(async(contact) => {
        return await UserModel.getNormalUserDataById(contact.userId)
      });

      resolve(await Promise.all(users));
    } catch (error) {
      reject(error)
    }
  })
};

let countAllContacts = (currentUserId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let count = await ContactModel.countAllContacts(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error)
    }
  })
};

let countAllContactsSent = (currentUserId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let count = await ContactModel.countAllContactsSent(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error)
    }
  })
};

let countAllContactsReceived = (currentUserId) => {
  return new Promise(async(resolve, reject) => {
    try {
      let count = await ContactModel.countAllContactsReceived(currentUserId);
      resolve(count);
    } catch (error) {
      reject(error)
    }
  })
};

let readMoreContacts = (currentUserId, skip) => {
  return new Promise (async(resolve, reject) => {
    try {
      let newContacts = await ContactModel.readMoreContacts(currentUserId, skip, LIMIT_NUMBER_TAKEN);

      let users = newContacts.map(async(contact) => {
        if(contact.contactId == currentUserId){
          return await UserModel.getNormalUserDataById(contact.userId)
        }
        else return await UserModel.getNormalUserDataById(contact.contactId)
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error)
    }
  })
};

let readMoreContactsSent = (currentUserId, skip) => {
  return new Promise (async(resolve, reject) => {
    try {
      let contacts = await ContactModel.readMoreContactsSent(currentUserId, skip, LIMIT_NUMBER_TAKEN);
      let users = contacts.map(async(contact) => {
        return await UserModel.getNormalUserDataById(contact.contactId)
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error)
    }
  })
};

let readMoreContactsReceived = (currentUserId, skip) => {
  return new Promise (async(resolve, reject) => {
    try {
      let contacts = await ContactModel.readMoreContactsReceived(currentUserId, skip, LIMIT_NUMBER_TAKEN);
      let users = contacts.map(async(contact) => {
        return await UserModel.getNormalUserDataById(contact.userId)
      });
      resolve(await Promise.all(users));
    } catch (error) {
      reject(error)
    }
  })
};
let searchFriends = (currentUserId, keyword) => {
  return new Promise(async(resolve, reject) => {
    let friendsIds = [];
    let friends = await ContactModel.getFriends(currentUserId);

    friends.forEach((item) => {
      friendsIds.push(item.userId);
      friendsIds.push(item.contactId);
    });
    
    friendsIds = _.uniqBy(friendsIds);
    friendsIds = _.remove(friendsIds, (item)=>{
      return item != currentUserId
    })
    console.log(friendsIds)

    let users = await UserModel.findAllToAddGroupChat(friendsIds, keyword)

    return resolve(users);
  })
};


module.exports = {
  findUserContact,
  addNew,
  removeRequestContactSent,
  removeRequestContactReceived,
  removeContact,
  confirmRequestContactReceived,
  getContacts,
  getContactsReceived,
  getContactsSent,
  countAllContacts,
  countAllContactsSent,
  countAllContactsReceived,
  readMoreContacts,
  readMoreContactsSent,
  readMoreContactsReceived,
  searchFriends
}
