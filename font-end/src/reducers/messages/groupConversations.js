import * as types from './../../constants/ActionTypes'

let initialState = []

let myReducer = (state = initialState,action) => {

    switch(action.type){
      case types.GET_LIST_GROUP_CONVERSATIONS :
        state = state.concat(action.data)
        return state;
      case types.ADD_LIST_GROUP_CONVERSATIONS :
        state = [action.data, ...state];
        return state;
      case types.REMOVE_LIST_GROUP_CONVERSATIONS : 
        state = state.filter(item => {
          return item._id !== action.data._id
        })
        return state;
      case types.SCROLL_LIST_GROUP_CONVERSATIONS:
        state = state.concat(action.data);
        return state;
      default : 
          return state;
    }
}

export default myReducer;
