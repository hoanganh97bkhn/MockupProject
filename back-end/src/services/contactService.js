import ContactModel from './../models/contactModel';
import UserModel from './../models/userModel';
import _ from "lodash";

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

module.exports = {
  findUserContact,
}