import * as types from './../../constants/ActionTypes'

let initialState = {
  status : false,
  type : '',
  data : {}
}

let myReducer = (state = initialState,action) => {

    switch(action.type){
      case types.OPEN_MODAL_CALLER :
        state = {
          ...state,
          status: true,
          type: "caller",
          data : action.data
        }
        return state;
      case types.CLOSE_MODAL_CALLER :
        state = {
          ...state,
          status: false,
          type: "caller",
        }
        return state;
      case types.OPEN_MODAL_LISTENER :
        state = {
          ...state,
          status: true,
          type: "listener",
          data : action.data
        }
        return state;
      case types.CLOSE_MODAL_LISTENER :
        state = {
          ...state,
          status: false,
          type: "listener",
        }
        return state;
      default : 
        return state;
    }
}

export default myReducer;
