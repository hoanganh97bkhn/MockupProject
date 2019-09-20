import * as types from './../../constants/ActionTypes'

let initialState = {}

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.GET_USER :
          return action.data
        case types.UPDATE_USER :
          state = action.data;
          return state;
        default : 
          return state;
    }
}

export default myReducer;
