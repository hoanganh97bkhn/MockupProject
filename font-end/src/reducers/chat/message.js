import * as types from './../../constants/ActionTypes'

let initialState = []

let myReducer = (state = initialState,action) => {

    switch(action.type){
      case types.ADD_ON_MESSAGE :
        if(state.indexOf(action.data) < 0)
          state = [...state,action.data];
        return state;
      case types.REMOVE_ON_MESSAGE :
        state = state.filter(item=>{
          return item !== action.data
        })
        return state;
        default : 
          return state;
    }
}

export default myReducer;
