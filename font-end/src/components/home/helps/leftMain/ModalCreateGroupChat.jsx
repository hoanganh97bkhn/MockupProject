import React, { Component } from 'react';
import InfoContact from'./../../helps/modal/InfoContact';
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

class ModalCreateGroupChat extends Component {
  constructor(props){
    super(props);
    this.state={
      listUser : [],
    }
  }

  handleSearch = (e) => {
    if(e.target.value != ''){
      const regex = new RegExp(e.target.value, 'i');
      let filtered = [];
      filtered = this.props.contacts.filter(function(data) {
        return (regex.test(data.nickname));
      });
      this.setState({
        listUser : filtered
      })
    }
  }

  handleAddToGroupChat = (item, index) => {

    axios({
      url: `${config.baseUrl}/contact/add-new`,
      method: "post",
      data: {uid: item._id}
    })
    .then((res)=>{
      
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
                onChange={e => this.handleSearch(e)}
                style={{ width: max}}
                size="large"
            />
            <div id="style-contatcs" className="find-user-bottom">
                <ul className="contactList">
                  {this.state.listUser.length > 0 ? 
                    this.state.listUser.map((item, index)=>{
                      return (
                        <InfoContact 
                          clickSuccess={()=>this.handleAddToGroupChat(item, index)} 
                          key={index} avatar={urlImage(item.avatar)} 
                          titleSuccess={"Add to group"} 
                          titleDanger = {""} 
                          nickname={item.nickname} 
                          address={item.address}>

                        </InfoContact>
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
      socket: state.socket,
      contacts : state.contacts,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
        addListContactsSent : (data) => {
          dispatch(actions.addListContactsSent(data))
        },
        removeListContactsSent : (data) => {
          dispatch(actions.removeListContactsSent(data));
        },
        addCountListContactsSent : () => {
          dispatch(actions.addCountListContactsSent());
        },
        removeCountListContactsSent : () => {
          dispatch(actions.removeCountListContactsSent());
        }
  }
}

export default connect(mapStateToProps, null)(ModalCreateGroupChat);
