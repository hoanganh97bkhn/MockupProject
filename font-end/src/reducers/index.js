import user from './user/user';
import register from './login/register';
import login from './login/login';
import socket from './socket';
import addContact from './otherContacts/addContact';
import countNotifi from './otherContacts/countNotifi';
import contacts from './contacts/contacts';
import contactsSent from './contacts/contactsSent';
import contacsReceived from './contacts/contactsReceived';
import countContacts from './contacts/countContacts';
import countContactsSent from './contacts/countContactsSent';
import countContactsReceived from './contacts/countContactsReceived'
import findUser from './contacts/findUser';
import groupConversations from './messages/groupConversations';
import userConversations from './messages/userConversations';
import allConversations from './messages/allConversationWithMessages';
import checkChangeList from './messages/changeList';
import typing from './chat/typing';
import message from './chat/message';
import chatVideo from "./chat/chatVideo";
import { combineReducers } from 'redux';

const myReducer = combineReducers({
    user,
    register ,
    login ,
    socket ,
    addContact,
    countNotifi,
    contacts,
    contactsSent,
    contacsReceived,
    countContacts,
    countContactsSent,
    countContactsReceived,
    findUser,
    userConversations,
    groupConversations,
    allConversations,
    checkChangeList,
    typing,
    message,
    chatVideo
});

export default myReducer;