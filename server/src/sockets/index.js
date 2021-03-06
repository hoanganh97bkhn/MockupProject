import addNewContact from "./contact/addNewContact";
import removeRequestContactSent from "./contact/removeRequestContactSent";
import removeRequestContactReceived from './contact/removeRequestContactReceived';
import confirmRequestContactReceived from './contact/confirmRequestContactReceived';
import removeContact from './contact/removeContact';
import chatTextEmoji from './chat/chatTextEmoji';
import typingOn from './chat/typingOn';
import typingOff from './chat/typingOff';
import chatVideo from './chat/chatVideo';
import userStatus from './status/userStatus';
import addMessage from './addMessage/addMessage';

let initSockets = (io) => {
  addNewContact(io);
  removeRequestContactSent(io);
  removeRequestContactReceived(io);
  confirmRequestContactReceived(io);
  removeContact(io);
  chatTextEmoji(io);
  typingOn(io);
  typingOff(io);
  chatVideo(io);
  userStatus(io);
  addMessage(io);
}

module.exports = initSockets;
