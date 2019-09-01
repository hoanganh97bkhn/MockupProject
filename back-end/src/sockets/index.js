import addNewContact from "./contact/addNewContact";
import removeRequestContactSent from "./contact/removeRequestContactSent";
import removeRequestContactReceived from './contact/removeRequestContactReceived';
import confirmRequestContactReceived from './contact/confirmRequestContactReceived';
import removeContact from './contact/removeContact';

let initSockets = (io) => {
  addNewContact(io);
  removeRequestContactSent(io);
  removeRequestContactReceived(io);
  confirmRequestContactReceived(io);
  removeContact(io);
}

module.exports = initSockets;