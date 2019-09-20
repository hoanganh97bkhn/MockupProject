import * as types from './../../constants/ActionTypes'

let initialState = 0;


let myReducer = (state = initialState, action) => {

    switch(action.type){
        case types.COUNT_LIST_CONTACTS :
          state = action.data;
          return state;
        case types.ADD_COUNT_LIST_CONTACTS : 
          state+=1;
          return state
        case types.REMOVE_COUNT_LIST_CONTACTS:
          state-=1;
          if(state === -1) state = 0;
          return state
        default : 
          return state;
    }
}

export default myReducer;
