import addNewContact from "./contact/addNewContact";

let initSockets = (socket) => {
  addNewContact(socket);
}

export default initSockets;