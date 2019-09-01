import * as types from '../../constants/ActionTypes'

let initialState = []

let myReducer = (state = initialState,action) => {

    switch(action.type){
      case types.GET_LIST_ALL_CONVERSATION_WITH_MESSAGES :
        state = state.concat(action.data)
        return state;
      case types.ADD_LIST_ALL_CONVERSATION_WITH_MESSAGES :
        state.map((item,index) => {
          if(item._id === action._id){
            item.messages = [...item.messages, action.data];
            return item;
          }
          else return item
        });
        console.log(state)
        return state;
      case types.REMOVE_LIST_ALL_CONVERSATION_WITH_MESSAGES : 
        state = state.filter(item => {
          return item._id !== action.data._id
        })
        return state;
      case types.SCROLL_LIST_ALL_CONVERSATION_WITH_MESSAGES:
        state = state.concat(action.data);
        return state;
      default : 
          return state;
    }
}

export default myReducer;
