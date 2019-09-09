import * as types from './../../constants/ActionTypes';

let initialState = []

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.SET_USER_ONLINE :
            state = action.data;
          return state;
        default : 
          return state;
    }
}

export default myReducer;
