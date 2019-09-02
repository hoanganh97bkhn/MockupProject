import * as types from './../../constants/ActionTypes';

let initialState = ''

let myReducer = (state = initialState,action) => {

    switch(action.type){
      case types.CHECK_CHANGE_LIST_MESSAGE :
        state = action.data
        return state;
      default : 
        return state;
    }
}

export default myReducer;
