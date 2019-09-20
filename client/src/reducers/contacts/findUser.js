import * as types from './../../constants/ActionTypes'

let initialState = []

let myReducer = (state = initialState,action) => {

    switch(action.type){
      case types.REMOVE_LIST_CONTACTS_SENT :
        state = [action.data, ...state]
        return state;
      default : 
          return state;
    }
}

export default myReducer;
