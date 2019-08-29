import * as types from './../../constants/ActionTypes'


let initialState = []

let myReducer = (state = initialState, action) => {

    switch(action.type){
      case types.ADD_FRIEND :
        state = [action.data, ...state]
        return state;
      case types.REMOVE_FRIEND :
        state = state.filter(item => {
          return item._id !== action.data._id
        })
        return state
      default : 
        return state;
    }
}

export default myReducer;
