import {addNewContact} from "./contact/addNewContact";
import {removeNewContactSent} from "./contact/removeNewContactSent";
import {removeNewContactReceived} from './contact/removeNewContactReceived';
import {confirmNewContactReceived} from './contact/confirmNewContactReceived';
import {removeContact} from './contact/removeContact';

export const initSockets = (socket, props) => {
  addNewContact(socket, props);
  removeNewContactSent(socket, props);
  removeNewContactReceived(socket, props);
  confirmNewContactReceived(socket, props);
  removeContact(socket, props);
}
