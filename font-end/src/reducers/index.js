import register from './login/register';
import login from './login/login';
// import contactsSent from './otherContacts/contactsSent';
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
import allConversations from './messages/allConversations';
import groupConversations from './messages/groupConversations';
import userConversations from './messages/userConversations';
import { combineReducers } from 'redux';

const myReducer = combineReducers({
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
    allConversations,
    userConversations,
    groupConversations
});

export default myReducer;