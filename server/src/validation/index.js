import authValidation from './authValidation';
import checkMessageLength  from './messageValidation';
import findUserContact from './contactValidation';
import groupChatvalidation from './groupChatValidation';

export const authValid = authValidation;
export const messageValid = checkMessageLength;
export const findUserValid = findUserContact;
export const GroupValid = groupChatvalidation;
