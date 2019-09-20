import * as types from '../constants/ActionTypes'

let initialState = []

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.SETUP_SOCKET :
          return action.data
        default : 
            return state;
    }
}

export default myReducer;
