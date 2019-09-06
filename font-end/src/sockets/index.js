import {addNewContact} from "./contact/addNewContact";
import {removeNewContactSent} from "./contact/removeNewContactSent";
import {removeNewContactReceived} from './contact/removeNewContactReceived';
import {confirmNewContactReceived} from './contact/confirmNewContactReceived';
import {removeContact} from './contact/removeContact';
import {chatTextEmoji} from './chat/chatTextEmoji';
import {videoChat} from './chat/videoChat';
import {typingOn, typingOff} from './chat/typingOnOff';

export const initSockets = (socket, props) => {
  addNewContact(socket, props);
  removeNewContactSent(socket, props);
  removeNewContactReceived(socket, props);
  confirmNewContactReceived(socket, props);
  removeContact(socket, props);
  chatTextEmoji(socket, props);
  typingOff(socket, props);
  typingOn(socket, props);
  videoChat(socket, props);
  
}
