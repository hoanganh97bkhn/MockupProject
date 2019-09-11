import chatGroupModel from './../models/chatGroupModel';

let addNewGroup = (currentUserId, arrayMemberIds, groupChatName) => {
  return new Promise(async(resole, reject) => {
    try {
      //add currUserId to arrayMember
      arrayMemberIds.unshift(`${currentUserId}`);
      
      arrayMemberIds = arrayMemberIds.map(item => {
        return {
          'userId' : item
        }
      });
      
      let newGroupItem = {
        name: groupChatName,
        usersAmount: arrayMemberIds.length,
        userId: `${currentUserId}`,
        members: arrayMemberIds,
      }

      let newGroup =  await chatGroupModel.createNew(newGroupItem);
      resole(newGroup);
    } catch (error) {
      reject(error)
    }
  })
};

module.exports = {
  addNewGroup
}
