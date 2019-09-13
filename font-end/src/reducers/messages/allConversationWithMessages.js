import * as types from '../../constants/ActionTypes';
import _ from 'lodash';

let initialState = []

let myReducer = (state = initialState,action) => {

    switch(action.type){
      //get data to list conversation
      case types.GET_LIST_ALL_CONVERSATIONS :
        state = state.concat(action.data)
        return state;

      //add data to list conversation
      case types.ADD_LIST_ALL_CONVERSATIONS :
        state = [action.data, ...state];
        return state;

      //change data to list conversation 
      case types.CHANGE_LIST_ALL_CONVERSATIONS :
        console.log(state);
        state.forEach((item, index)=>{
          if(item._id === action._id){
            state.splice(index, 1);
            state.unshift(item);
            return ;
          }
        })
        return state.map((item,index) => {
          if(item._id === action._id){
            item.messages = [...item.messages, action.data];
            return item;
          }
          else return item
        });
        
      //remove data to list conversation
      case types.REMOVE_LIST_ALL_CONVERSATIONS : 
        state = state.filter(item => {
          return item._id !== action.data._id
        })
        return state;

      case types.SCROLL_LIST_ALL_CONVERSATIONS:
        state = state.concat(action.data);
        return state;

      default : 
        return state;
    }
}

export default myReducer;
