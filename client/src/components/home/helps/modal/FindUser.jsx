import React, { Component } from 'react';
import InfoContact from'./InfoContact';
import { Input, Spin, Icon, Empty } from 'antd';
import { max } from 'moment';
import axios from 'axios';
import {connect} from 'react-redux';
import config from './../../../../config/index';
import * as actions from './../../../../actions/index'

const {Search} = Input;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class FindUser extends Component {
  constructor(props){
    super(props);
    this.state={
      listUser : [],
      listAddContact : [],
      titleSuccess : "Add Friend",
      titleDanger : "",
      loading : false,
      isEmpty : false,
    }
  }

  handleSearch = (value) => {
    this.setState({
      loading : true,
      isEmpty : false
    })
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
        listUser: data,
        loading : false,
        isEmpty : data.length > 0 ? false : true
      })
    })
    .catch((error)=>{
      this.setState({
        loading : false,
        isEmpty : true
      })
    })
  }

  componentWillReceiveProps = (nextProps) => {
    
    let data = this.state.listUser;
    let item = nextProps.findUser[0];
    if(data.length > 0) {
      this.setState({
        listUser: data.filter((value, i)=>{
          if(value._id === item._id) return false;
          else return true
        })
      })
    }
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
      this.props.socket.emit("add-new-contact", {contactId : item._id});
      this.props.addListContactsSent(item);
      this.props.addCountListContactsSent();
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
      url: `${config.baseUrl}/contact/remove-request-contact-sent`,
      method: "delete",
      data: {uid: item._id}
    })
    .then((res)=>{
      this.props.socket.emit("remove-request-contact-sent", {contactId : item._id});
      this.props.removeListContactsSent(item);
      this.props.removeCountListContactsSent();
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
            <div id="style-contatcs" className="find-user-bottom">
                {this.state.loading ? <div style={{textAlign : 'center', marginTop : '10px'}} ><Spin indicator={antIcon} /></div> : null}
                {this.state.isEmpty ? <div style={{textAlign : 'center', marginTop : '10px'}} ><Empty/></div> : null}
                <ul className="contactList">
                  {this.state.listUser.length > 0 ? 
                    this.state.listUser.map((item, index)=>{
                      return (
                        <InfoContact clickSuccess={()=>this.handleAddFriend(item, index)} clickDanger={()=>this.handleCancelRequest(item, index)} key={index} avatar={`${config.baseUrl}/images/${item.avatar}`} titleSuccess={item.titleSuccess} titleDanger={item.titleDanger} nickname={item.nickname} address={item.address}></InfoContact>
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
      findUser : state.findUser
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

export default connect(mapStateToProps, mapDispatchToProps)(FindUser);