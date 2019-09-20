import * as types from './../../constants/ActionTypes'

let initialState = '';

let myReducer = (state = initialState,action) => {
    switch(action.type){
      case types.FOCUS_MESSAGE_FROM_CONTACT :
        console.log(action.data)
        state = action.data;
        return state;
      case types.REMOVE_FOCUS_MESSAGE_FROM_CONTACT : 
        console.log('delete')
        state = "";
        return state;
      default : 
        return state;
    }
}

export default myReducer;
