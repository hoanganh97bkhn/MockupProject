import * as types from '../constants/ActionTypes'

let initialState = []

let myReducer = (state = initialState, action) => {

    switch(action.type){
        case types.RES_ADD_NEW_CONTACT :
          return ([...state, action.data])
        case types.RES_REMOVE_NEW_CONTACT : 
          return state.filter(item => {
            return item.id !== action.data.id
          })
        default : 
          return state;
    }
}

export default myReducer;
