import React, { Component } from 'react';
import InfoContact from'./InfoContact';
import avatar_default from './../../../../image/avatar-default.jpg'; 
import { Input } from 'antd';
import { max } from 'moment';
import axios from 'axios';
import {connect} from 'react-redux';
import config from './../../../../config/index';
import * as actions from './../../../../actions/index'

const {Search} = Input;
let urlImage = (avatar) => {
  if(avatar !== "avatar-default.jpg")
    return `${config.baseUrl}/images/${avatar}`
  else return avatar_default
}

class FindUser extends Component {
  constructor(props){
    super(props);
    this.state={
      listUser : [],
      listAddContact : [],
      titleSuccess : "Add Friend",
      titleDanger : ""
    }
  }

  handleSearch = (value) => {
    let data = {
      key : value
    }
    axios({
      url : `${config.baseUrl}/contact/search`,
      method : 'post',
      data : data
    })
    .then((response) => {
      let data = response.data;
      data.map((item, index)=>{
        return (
          item.titleSuccess = "Add Friend",
          item.titleDanger  = ""
        )
      })
      this.setState({
        listUser: data
      })
    })
    .catch((error)=>{
      console.log(error.response)
    })
  }

  handleAddFriend = (item, index) => {
    let data = this.state.listUser;
    data.map((value, i)=>{
      if(i===index) return (
        value.titleSuccess = "",
        value.titleDanger  = "Cancel Request"
      )
      else return value
    });
    axios({
      url: `${config.baseUrl}/contact/add-new`,
      method: "post",
      data: {uid: item._id}
    })
    .then((res)=>{
      this.props.socket.emit("add-new-contact", {contactId : item._id})
      this.setState({
        listAddContact: [...this.state.listAddContact, item],
        listUser: data
      });
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  handleCancelRequest = (item, index) => {
    let data = this.state.listUser;
    data.map((value, i)=>{
      if(i===index) return (
        value.titleSuccess = "Add Friend",
        value.titleDanger  = ""
      )
      else return value
    });

    //call api remove
    axios({
      url: `${config.baseUrl}/contact/remove-request-contact`,
      method: "delete",
      data: {uid: item._id}
    })
    .then((res)=>{
      this.props.socket.emit("remove-request-contact", {contactId : item._id})
      this.setState({
        listAddContact: this.state.listAddContact.filter((element, i)=>{
          if(i === index) return false;
          else return true;
        }),
        listUser: data
      })
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  render() {
    return (
       <div>
           <Search
                placeholder="Input nickname or email"
                onSearch={value => this.handleSearch(value)}
                style={{ width: max}}
                size="large"
            />
            <div className="find-user-bottom">
                <ul className="contactList">
                  {this.state.listUser.length > 0 ? 
                    this.state.listUser.map((item, index)=>{
                      return (
                        <InfoContact clickSuccess={()=>this.handleAddFriend(item, index)} clickDanger={()=>this.handleCancelRequest(item, index)} key={index} avatar={urlImage(item.avatar)} titleSuccess={item.titleSuccess} titleDanger={item.titleDanger} nickname={item.nickname} address={item.address}></InfoContact>
                      )
                    })  
                : null }
                </ul>
            </div>
       </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      socket: state.socket
  }
}

// const mapDispatchToProps = (dispatch, props) => {
//   return {
//         loginSuccess : (data) => {
//           dispatch(actions.loginSuccess(data))
//         },
//         logoutUser : (data) => {
//           dispatch(actions.logoutUser(data));
//         },
//         setupSocket : (data) =>{
//             dispatch(actions.setupSocket(data))
//         }
//   }
// }

export default connect(mapStateToProps, null)(FindUser);