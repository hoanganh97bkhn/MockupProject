import * as types from './../constants/ActionTypes';
import setAuthToken from './../setAuthToken';
let data = [];

//user
export const getUser = (data) => {
    return {
        type: types.GET_USER,
        data
    }
}
export const updateUser = (data) => {
    return {
        type: types.UPDATE_USER,
        data
    }
}

//login-register
export const register = (data) => {
    return{
        type : types.CALL_API_REGISTER,
        data
    }
}

export const login = (data) => {
    return{
        type : types.CALL_API_LOGIN,
        data
    }
}

export const loginFB = (data) => {
    return{
        type : types.CALL_API_LOGIN_FB,
        data
    }
}

export const loginSuccess = (payload) => {
    return{
        type : types.LOGIN_SUCCESS,
        payload
    }
}

export const logoutUser = (payload) => {
    return{
        type : types.LOGOUT_SUCCESS,
        payload
    }
    // loginSuccess({});
    // history.push('/login');
}

export const setListAddFriend = (data) => {
    return{
        type : types.ADD_FRIEND,
        data : data
    }
}

export const setListRemoveFriend = (data) => {
    return{
        type : types.REMOVE_FRIEND,
        data : data
    }
}

export const cancelConactsSent = (data) => {
    return {
        type : types.CANCEL_CONTACTS_SENT,
        data : data
    }
}

export const setupSocket = (data) => {
    return{
        type : types.SETUP_SOCKET,
        data : data
    }
}


export const ResAddNewContact = (data) => {
    return{
        type: types.RES_ADD_NEW_CONTACT,
        data : data
    }
}  

export const ResRemoveNewContact = (data) => {
    return{
        type: types.RES_REMOVE_NEW_CONTACT,
        data : data
    }
}

export const resetNotifi = () => {
    return{
        type: types.RESET_NOTIFI,
    }
}

export const resetIsRead = () => {
    return {
        type : types.MARK_ALL_READ
    }
}


//list conatct
export const getListContacts = (data) => {
    return {
        type : types.GET_LIST_CONTACTS,
        data
    }
}

export const addListContacts = (data) => {
    return {
        type : types.ADD_LIST_CONTACTS,
        data
    }
}

export const scrollListContacts = (data) => {
    return {
        type : types.SCROLL_LIST_CONTACTS,
        data
    }
}

export const removeListContacts = (data) => {
    return {
        type : types.REMOVE_LIST_CONTACTS,
        data
    }
}

export const getListContactsSent = (data) => {
    return {
        type : types.GET_LIST_CONTACTS_SENT,
        data
    }
}

export const addListContactsSent = (data) => {
    return {
        type : types.ADD_LIST_CONTACTS_SENT,
        data
    }
}

export const scrollListContactsSent = (data) => {
    return {
        type : types.SCROLL_LIST_CONTACTS_SENT,
        data
    }
}

export const removeListContactsSent = (data) => {
    return {
        type : types.REMOVE_LIST_CONTACTS_SENT,
        data
    }
}

export const getListContactsReceived= (data) => {
    return {
        type : types.GET_LIST_CONTACTS_RECEIVED,
        data
    }
}

export const addListContactsReceived= (data) => {
    return {
        type : types.ADD_LIST_CONTACTS_RECEIVED,
        data
    }
}

export const scrollListContactsReceived= (data) => {
    return {
        type : types.SCROLL_LIST_CONTACTS_RECEIVED,
        data
    }
}

export const removeListContactsReceived= (data) => {
    return {
        type : types.REMOVE_LIST_CONTACTS_RECEIVED,
        data
    }
}

//count list contacts
export const countListContacts = (data) => {
    return {
        type : types.COUNT_LIST_CONTACTS,
        data
    }
}

export const addCountListContacts = () => {
    return {
        type : types.ADD_COUNT_LIST_CONTACTS,
    }
}

export const removeCountListContacts = () => {
    return {
        type : types.REMOVE_COUNT_LIST_CONTACTS,
    }
}

export const countListContactsSent = (data) => {
    return {
        type : types.COUNT_LIST_CONTACTS_SENT,
        data
    }
}

export const addCountListContactsSent = () => {
    return {
        type : types.ADD_COUNT_LIST_CONTACTS_SENT,
    }
}

export const removeCountListContactsSent = () => {
    return {
        type : types.REMOVE_COUNT_LIST_CONTACTS_SENT,
    }
}

export const countListContactsReceived= (data) => {
    return {
        type : types.COUNT_LIST_CONTACTS_RECEIVED,
        data
    }
}

export const addCountListContactsReceived= () => {
    return {
        type : types.ADD_COUNT_LIST_CONTACTS_RECEIVED,
    }
}

export const removeCountListContactsReceived= () => {
    return {
        type : types.REMOVE_COUNT_LIST_CONTACTS_RECEIVED,
    }
}

// conversations
export const getListUserConversations = (data) => {
    return {
        type : types.GET_LIST_USER_CONVERSATIONS,
        data
    }
}

export const addListUserConversations = (data) => {
    return {
        type : types.ADD_LIST_USER_CONVERSATIONS,
        data
    }
}

export const changeListUserConversations = (_id, data) => {
    return {
        type : types.CHANGE_LIST_USER_CONVERSATIONS,
        _id,
        data
    }
}

export const scrollChangeListUserConversations = (_id, data) => {
    return {
        type : types.SCROLL_CHANGE_LIST_USER_CONVERSATIONS,
        _id,
        data
    }
}

export const scrollListUserConversations = (data) => {
    return {
        type : types.SCROLL_LIST_USER_CONVERSATIONS,
        data
    }
}

export const removeListUserConversations = (data) => {
    return {
        type : types.REMOVE_LIST_USER_CONVERSATIONS,
        data
    }
}

// all-conversation-groups

export const getListGroupConversations = (data) => {
    return {
        type : types.GET_LIST_GROUP_CONVERSATIONS,
        data
    }
}

export const addListGroupConversations = (data) => {
    return {
        type : types.ADD_LIST_GROUP_CONVERSATIONS,
        data
    }
}

export const changeListGroupConversations = (_id, data) => {
    return {
        type : types.CHANGE_LIST_GROUP_CONVERSATIONS,
        _id,
        data
    }
}

export const scrollChangeListGroupConversations = (_id, data) => {
    return {
        type : types.SCROLL_CHANGE_LIST_GROUP_CONVERSATIONS,
        _id,
        data
    }
}

export const scrollListGroupConversations = (data) => {
    return {
        type : types.SCROLL_LIST_GROUP_CONVERSATIONS,
        data
    }
}

export const removeListGroupConversations = (data) => {
    return {
        type : types.REMOVE_LIST_GROUP_CONVERSATIONS,
        data
    }
}

// all-conversation-with-messages
export const getListAllConversations = (data) => {
    return {
        type : types.GET_LIST_ALL_CONVERSATIONS,
        data
    }
}

export const addListAllConversations = (data) => {
    return {
        type : types.ADD_LIST_ALL_CONVERSATIONS,
        data
    }
}

export const changeListAllConversations = (_id, data) => {
    return {
        type : types.CHANGE_LIST_ALL_CONVERSATIONS,
        _id,
        data
    }
}

export const scrollChangeListAllConversations = (_id, data) => {
    return {
        type : types.SCROLL_CHANGE_LIST_ALL_CONVERSATIONS,
        _id,
        data
    }
}

export const scrollListAllConversations= (data) => {
    return {
        type : types.SCROLL_LIST_ALL_CONVERSATIONS,
        data
    }
}

export const removeListAllConversations= (data) => {
    return {
        type : types.REMOVE_LIST_ALL_CONVERSATIONS,
        data
    }
}

// /** change list message when new message */

// export const checkChangeListMessage = (data) => {
//     return {
//         type: types.CHECK_CHANGE_LIST_MESSAGE,
        
//         data 
//     }
// }

/** chat message */

export const addOnTyping = (data) => {
    return {
        type: types.ADD_ON_TYPING,
        data 
    }
}

export const removeOnTyping = (data) => {
    return {
        type: types.REMOVE_ON_TYPING,
        data 
    }
}

export const openModalCaller = (data) => {
    return {
        type : types.OPEN_MODAL_CALLER,
        data
    }
}

export const closeModalCaller= () => {
    return {
        type : types.CLOSE_MODAL_CALLER,
        data
    }
}

export const openModalListener = (data) => {
    return {
        type : types.OPEN_MODAL_LISTENER,
        data
    }
}

export const closeModalListener = () => {
    return {
        type : types.CLOSE_MODAL_LISTENER,
        data
    }
}

//streamming
export const openStream = (text, stream) => {
    return {
        type : types.OPEN_MODAL_STREAM,
        data : stream,
        text : text
    }
}

export const closeStream = () => {
    return {
        type : types.CLOSE_MODAL_STREAM,
    }
}
//ice turn server
export const getICETurnServer = (data) => {
    return {
        type : types.GET_ICE_TURN_SERVER,
        data
    }
}

//online-offline
export const setUserOnline = (data) => {
    return {
        type : types.SET_USER_ONLINE,
        data
    }
}

export const removeUserOnline = (data) => {
    return {
        type : types.REMOVE_ONLINE,
        data
    }
}

//MESSAGE from contact
export const focusMessageFromContact = (data) => {
    return {
        type : types.FOCUS_MESSAGE_FROM_CONTACT,
        data
    }
}

export const removeFocusMessageFromContact = () => {
    return {
        type : types.REMOVE_FOCUS_MESSAGE_FROM_CONTACT,
    }
}