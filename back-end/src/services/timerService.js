import ActiveAccountModel from '../models/activeAccount';

let getNotifi = (userId) => {
  return new Promise(async(resole, reject) => {
    try {
      let notifi = await ActiveAccountModel.findByUserId(userId);
      let {generalNotif, contactNotif} = notifi;
      resole({generalNotif, contactNotif});
    } catch (error) {
      reject(error)
    }
  })
}

let resetCountNotifGeneral = (userId) => {
  return new Promise(async(resole, reject) => {
    try {
      let notifi = await ActiveAccountModel.resetaddNotificationGeneral(userId);
      resole("success!");
    }catch (error) {
      reject(error)
    }
  })
}

let resetCountNotifContact = (userId) => {
  return new Promise(async(resole, reject) => {
    try {
      let notifi = await ActiveAccountModel.resetaddNotificationContact(userId);
      resole("success!");
    }catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  getNotifi,
  resetCountNotifGeneral,
  resetCountNotifContact
}
