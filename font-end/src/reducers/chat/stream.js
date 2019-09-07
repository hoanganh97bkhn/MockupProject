import * as types from './../../constants/ActionTypes';
let initialState = {
  text : '',
  data : ''
}

let myReducer = (state = initialState,action) => {

    switch(action.type){
        case types.OPEN_MODAL_STREAM :
          state = {...state,
                    text : action.text,
                    data : action.data  
                  }
          return state;
        case types.CLOSE_MODAL_STREAM :
          state = {...state,
                    text : '',
                    data : ''
                  }
          return state;
        default : 
          return state;
    }
}

export default myReducer;
