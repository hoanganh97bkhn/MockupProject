import * as types from '../constants/ActionTypes'

let initialState = []

let myReducer = (state = initialState, action) => {

    switch(action.type){
        case types.ADD_FRIEND :
          return ([...state, action.data])
        default : 
          return state;
    }
}

export default myReducer;
