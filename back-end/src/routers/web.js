import express from 'express';
import passPort from 'passport';
import initPassportJWT from './../controllers/passportController/local';
import {home, auth, userInfo, contact, message, timer, notifi, groupChat} from './../controllers/index';
import {authValid, messageValid, findUserValid, GroupValid} from './../validation/index';


//Init all passPort
initPassportJWT();
let router = express.Router();

//authenticate
let authLogin = passPort.authenticate('jwt', { session: false });

/**
 * Init all routers
 */

let initRouters = (app) => {

  //login-register
  router.post("/register",authValid.register, auth.postRegister);
  router.get("/verify/:token", auth.verifyAccount);
  router.post("/login", auth.postLoginLocal);
  router.post("/facebook/login", auth.postLoginFb);

  //update user
  router.post("/user/info/update",authLogin, userInfo.updateUser);
  router.post("/user/update/password",authLogin, userInfo.updatePassword);

  //contact
  router.post("/contact/search",authLogin, contact.findUser);
  router.get("/contact/list",authLogin, contact.listContacts);
  router.post("/contact/add-new",authLogin, contact.addNew);
  router.delete("/contact/remove-request-contact-sent", authLogin, contact.removeRequestContactSent);
  router.delete("/contact/remove-request-contact-received", authLogin, contact.removeRequestContactReceived);
  router.delete("/contact/remove-contact", authLogin, contact.removeContact);
  router.put("/contact/confirm-request-contact-received", authLogin, contact.confirmRequestContactReceived);
  router.post("/contacts/readmore",authLogin, contact.readMoreContacts);
  router.post("/contacts-sent/readmore",authLogin, contact.readMoreContactsSent);
  router.post("/contacts-received/readmore",authLogin, contact.readMoreContactsReceived);
  router.get('/contact/search-friends/:keyword', authLogin, findUserValid.findUserContact, contact.searchFriends)

  //home-get data
  router.get("/home/user",authLogin, home.getHome);
  router.put("/notification/mark-all-as-read",authLogin, home.markAllAsRead);
  router.get("/notification/data/list", authLogin, home.getListDataNotification);
  router.get("/message/conversation/list", authLogin, home.getAllConversationItems);
  router.get("/message/image/list", authLogin, home.getAllImages);
  router.get("/message/file/list", authLogin, home.getAllFiles);

  //message
  router.post("/message/add-new-text-emoji", authLogin, messageValid.checkMessageLength, message.addNewTexEmoji );
  router.post("/message/add-new-image", authLogin, message.addNewImage );
  router.post("/message/add-new-file", authLogin, message.addNewFile);
  router.get("/message/read-more-all-chat", authLogin, message.readMoreAllChat);
  router.get("/message/read-more-user-chat", authLogin, message.readMoreUserChat);
  router.get("/message/read-more-message", authLogin, message.readMoreMessage);

  //add group chat
  router.post("/group-chat/add-new", authLogin, GroupValid.addNewGroup, groupChat.addNewGroup);
  router.get("/group-chat/list-member", authLogin, groupChat.listMembers);
  router.put("/group-chat/add-memebers", authLogin, groupChat.addNewMember);
  router.put("/group-chat/remove-memebers", authLogin, groupChat.removeMember);
  router.put("/group-chat/leave-group", authLogin, groupChat.leaveGroup)
  
  //timer-notification
  router.put("/timer/count/notification-general/reset", authLogin, timer.resetCountNotifGeneral)
  router.put("/timer/count/notification-contact/reset", authLogin, timer.resetCountNotifContact)
  
  //notification
  router.post("/load/notification" ,authLogin, notifi.getMoreListDataNotif);



  return app.use('/',router);

 }

 module.exports = initRouters;
