import * as types from './../../constants/ActionTypes'


let initialState = 0;


let myReducer = (state = initialState, action) => {

    switch(action.type){
        case types.RES_ADD_NEW_CONTACT :
          state+=1;
          return state;
        case types.RES_REMOVE_NEW_CONTACT : 
          state-=1;
          if(state === -1) state = 0;
          return state
        case types.RESET_NOTIFI:
          state = 0;
          return state
        default : 
          return state;
    }
}

export default myReducer;
