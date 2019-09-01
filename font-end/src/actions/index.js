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

// all-conversation-

export const getListAllConversations= (data) => {
    return {
        type : types.GET_LIST_ALL_CONVERSATIONS,
        data
    }
}

export const addListAllConversations= (data) => {
    return {
        type : types.ADD_LIST_ALL_CONVERSATIONS,
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

// all-conversation-with-messages
export const getListAllConversationWithMessages= (data) => {
    return {
        type : types.GET_LIST_ALL_CONVERSATION_WITH_MESSAGES,
        data
    }
}

export const addListAllConversationWithMessages= (_id, data) => {
    return {
        type : types.ADD_LIST_ALL_CONVERSATION_WITH_MESSAGES,
        _id,
        data
    }
}

export const scrollListAllConversationWithMessages= (data) => {
    return {
        type : types.SCROLL_LIST_ALL_CONVERSATION_WITH_MESSAGES,
        data
    }
}

export const removeListAllConversationWithMessages= (data) => {
    return {
        type : types.REMOVE_LIST_ALL_CONVERSATION_WITH_MESSAGES,
        data
    }
}
