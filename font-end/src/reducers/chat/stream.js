import * as types from './../../constants/ActionTypes';
let initialState = ''

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.OPEN_MODAL_STREAM :
          state = action.data
          return state;
        case types.CLOSE_MODAL_STREAM :
          state = ''
          return state;
        default : 
          return state;
    }
}

export default myReducer;
