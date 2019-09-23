import * as types from './../../constants/ActionTypes'

let initialState = [];

let myReducer = (state = initialState, action) => {

    switch(action.type){
        case types.RES_ADD_NEW_CONTACT :
          state = [action.data, ...state]
          return state;
        case types.RES_REMOVE_NEW_CONTACT : 
          state = state.filter(item => {
            return item._id !== action.data._id
          })
          return state;
        case types.MARK_ALL_READ:
          state = state.map(item => {
            return {
              ...item,
              isRead : true,
            }
          });
          return state;
        default : 
          return state;
    }
}

export default myReducer;
