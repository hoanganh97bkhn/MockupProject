import {addNewContact} from "./contact/addNewContact";
import {removeNewContact} from "./contact/removeNewContact";

export const initSockets = (socket,props) => {
  addNewContact(socket,props);
  removeNewContact(socket, props);
}
