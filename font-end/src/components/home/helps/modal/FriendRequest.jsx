import React, { Component } from 'react';
import InfoContact from './InfoContact';
import avatar_default from './../../../../image/avatar-default.jpg';
import config from './../../../../config/index';
import * as actions from './../../../../actions/index';
import {connect} from 'react-redux';
import axios from 'axios';
import {Spin, Icon, message} from 'antd';

let urlImage = (avatar) => {
  if(avatar !== "avatar-default.jpg")
    return `${config.baseUrl}/images/${avatar}`
  else return avatar_default
}

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

class FriendRequest extends Component {
  constructor(props){
    super(props);
    this.state={
      skip : 0,
      displaySpiner : 'none',
    }
  }

  componentDidMount = () => {
    this.setState({
      skip: this.props.contacsReceived.length
    })
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      skip : nextProps.contacsReceived.length
    })
  }

  handleDeleteRequest = (item, index) => {
    //call api remove
    axios({
      url: `${config.baseUrl}/contact/remove-request-contact-received`,
      method: "delete",
      data: {uid: item._id}
    })
    .then((res)=>{
      message.success(`Delete friend request ${item.nickname} success!`);
      this.props.socket.emit("remove-request-contact-received", {contactId : item._id});
      this.props.removeListContactsReceived(item);
      this.props.removeCountListContactsReceived();
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  handleConfirmRequest = (item, index) => {
    //call api confirm friend
    axios({
      url: `${config.baseUrl}/contact/confirm-request-contact-received`,
      method: "put",
      data: {uid: item._id}
    })
    .then((res)=>{
      console.log(res.data)
      message.success(`${item.nickname} became friends`);
      this.props.socket.emit("confirm-request-contact-received", {contactId : item._id});
      this.props.removeListContactsReceived(item);
      this.props.removeCountListContactsReceived();
      this.props.addListContacts(item);
      this.props.addCountListContacts();
      this.props.addListUserConversations(res.data);
      this.props.addListAllConversations(res.data);
      this.props.socket.emit("add-message-after-confirm-friend", {uid : res.data._id, updatedAt : res.data.updatedAt});
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  handleScrollLoad = (event) =>{
    let element = event.target;
    if(element.scrollHeight - element.scrollTop === 476){
      this.setState({
        displaySpiner : 'block'
      })
      setTimeout(axios({
        url:`${config.baseUrl}/contacts-sent/readmore`,
        method: 'post',
        data: {
          skip: this.state.skip
        }
      })
      .then((res) => {
        this.props.scrollListContactsReceived(res.data)
        this.setState({
          displaySpiner : 'none'
        })
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          displaySpiner : 'none'
        })
      }), 1000)
      
    }
  }

  render() {
    let listData = this.props.contacsReceived;
    return (
      <div>
        <div id="style-contatcs" className="find-user-bottom" onScroll={this.handleScrollLoad}>
            <ul className="contactList">
              {listData.length > 0 ? 
                  listData.map((item, index)=>{
                    return (
                      <InfoContact 
                        key={index} 
                        avatar={urlImage(item.avatar)} 
                        titleSuccess={item.titleSuccess ? item.titleSuccess : 'Confirm'} 
                        titleDanger={item.titleDanger ? item.titleDanger : 'Delete'}
                        titleMessage = {item.titleMessage ? item.titleMessage : ''} 
                        nickname={item.nickname} 
                        address={item.address} 
                        clickSuccess = {() => this.handleConfirmRequest(item, index)}
                        clickDanger={()=>this.handleDeleteRequest(item, index)}>
                      </InfoContact>)
                  })  
              : null }
            </ul>
            <div style={{textAlign:'center', display: this.state.displaySpiner}}>
                <Spin indicator={antIcon}/>
            </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    socket: state.socket,
    contacsReceived: state.contacsReceived,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
      addListContactsReceived : (data) => {
        dispatch(actions.addListContactsReceived(data))
      },
      scrollListContactsReceived : (data) => {
        dispatch(actions.scrollListContactsReceived(data))
      },
      removeListContactsReceived : (data) => {
        dispatch(actions.removeListContactsReceived(data))
      },
      removeCountListContactsReceived : () => {
        dispatch(actions.removeCountListContactsReceived());
      },
      addListContacts : (data) => {
        dispatch(actions.addListContacts(data));
      },
      addCountListContacts : () => {
        dispatch(actions.addCountListContacts());
      },
      addListUserConversations : (data) => {
        dispatch(actions.addListUserConversations(data));
      },
      addListAllConversations : (data) => {
        dispatch(actions.addListAllConversations(data))
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (FriendRequest);
