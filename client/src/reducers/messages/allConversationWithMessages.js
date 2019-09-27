import * as types from '../../constants/ActionTypes';

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
      
      //message add new
      case types.NEW_MESSAGE_AFTER_CHAT:
        state.forEach((item, index)=>{
          if(item._id === action._id){
            state.splice(index, 1);
            state.unshift(item);
            return ;
          }
        });
        
        return state.map((item,index) => {
          if(item._id === action._id){
            item = {...item,
                    messages : [...item.messages, action.data]
                  };
            return item;
          }
          else return item
        });

        //message delete new
      case types.DEL_MESSAGE_AFTER_CHAT:
        return state.map((item,index) => {
          if(item._id === action._id){
            item = {...item,
                    messages : item.messages.filter((i, index) => {
                      if(index === item.messages.length-1) return false;
                      return true
                    })
                  };
            return item;
          }
          else return item
        });

      //change data to list conversation 
      case types.CHANGE_LIST_ALL_CONVERSATIONS :
        state.forEach((item, index)=>{
          if(item._id === action._id){
            state.splice(index, 1);
            state.unshift(item);
            return ;
          }
        });
        
        return state.map((item,index) => {
          if(item._id === action._id){
            item = {...item,
                    messages : [...item.messages, action.data]
                  };
            return item;
          }
          else return item
        });
        
      //remove data to list conversation
      case types.REMOVE_LIST_ALL_CONVERSATIONS : 
        state = state.filter(item => {
          return item._id !== action.data
        })
        return state;

      case types.SCROLL_LIST_ALL_CONVERSATIONS:
        state = state.concat(action.data);
        return state;
      
      //change data to list conversation after scroll
      case types.SCROLL_CHANGE_LIST_ALL_CONVERSATIONS :
        state.forEach((item, index)=>{
          if(item._id === action._id){
            state.splice(index, 1);
            state.unshift(item);
            return ;
          }
        });
        
        return state.map((item,index) => {
          if(item._id === action._id){
            item = {...item,
                    messages : action.data.concat(item.messages)
                  };
            return item;
          }
          else return item
        });

      default : 
        return state;
    }
}

export default myReducer;
