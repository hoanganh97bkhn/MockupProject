import addNewContact from "./contact/addNewContact";
import removeNewContact from "./contact/removeNewContact";

let initSockets = (socket) => {
  addNewContact(socket);
  // removeNewContact(socket);
}

export default initSockets;