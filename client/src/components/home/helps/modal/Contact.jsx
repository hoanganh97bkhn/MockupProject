import React, { Component } from 'react';
import InfoContact from './InfoContact';
import avatar_default from './../../../../image/avatar-default.jpg';
import config from './../../../../config/index';
import * as actions from './../../../../actions/index';
import axios from 'axios';
import {Spin, Icon, message, Modal, Empty} from 'antd';
import {connect} from 'react-redux';


let urlImage = (avatar) => {
  if(avatar !== "avatar-default.jpg")
    return `${config.baseUrl}/images/${avatar}`
  else return avatar_default
}

const { confirm } = Modal;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

function handleDeleteContacts (item, props){
  axios({
    url: `${config.baseUrl}/contact/remove-contact`,
    method: "delete",
    data: {uid: item._id}
  })
  .then((res)=>{
    message.success(`Delete friend ${item.nickname} success!`);
    props.socket.emit("remove-contact", {contactId : item._id});
    props.removeListContacts(item);
    props.removeCountListContacts();
    props.removeListAllConversations(item._id);
    props.removeListUserConversations(item._id);

  })
  .catch((error)=>{
    message.error(`Delete friend ${item.nickname} error!`);
    console.log(error)
  })
}

class Contact extends Component {
  constructor(props){
    super(props);
    this.state={
      skip : 0,
      displaySpiner : 'none',
      visible: false ,
      skipUser : 0,
      skipGroup : 0,
      isEmpty : false
    }
  }

  componentWillMount = () => {
    this.setState({
      skipUser : this.props.userConversations.length,
      skipGroup : this.props.groupConversations.length,
    })
  }

  componentDidMount = () => {
    this.setState({
      skip: this.props.contacts.length,
      isEmpty : this.props.contacts.length ? false : true
    })
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      skip : nextProps.contacts.length,
      skipUser : this.props.userConversations.length,
      skipGroup : this.props.groupConversations.length,
      isEmpty : this.props.contacts.length ? false : true
    })
  }

  handleMessage = (item) => {
    let pos = this.props.allConversations.map((i=>{
      return i._id
    })).indexOf(item._id)
    
    if(pos >=0 ){
      this.props.focusMessageFromContact(item._id);
      this.props.closeModal();
    }
    else{
      axios({
        url:`${config.baseUrl}/message/get-messages?skipUser=${this.state.skipUser}&skipGroup=${this.state.skipGroup}&id=${item._id}`,
        method: 'get',
      })
      .then((res) => {
          if(res.data.allConversationsWithMessages.length === 0){
              message.error('Find message not found!',3.5);
          }
          else {
              this.props.scrollListAllConversations(res.data.allConversationsWithMessages);
              this.props.scrollListGroupConversations(res.data.groupConversationsWithMessages);
              this.props.scrollListUserConversations(res.data.userConversationsWithMessages);
              let pos = this.props.allConversations.map((i=>{
                return i._id
              })).indexOf(item._id)
              
              if(pos >=0 ){
                this.props.focusMessageFromContact(item._id);
                this.props.closeModal();
              }
              else {
                message.error('Find message not found!',3.5);
              }
          }
      })
      .catch((error) => {
          message.error('Find message not found!',3.5);
      })
    }
  }

  showDeleteConfirm = (item, props)=>{
    confirm({
      title: `Are you sure delete ${item.nickname} from contacts list?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk(){
        handleDeleteContacts(item, props)
      },
      onCancel() {
      },
    });
  }

  handleScrollLoad = (event) =>{
    let element = event.target;
    if(element.scrollHeight - element.scrollTop === 300){
      this.setState({
        displaySpiner : 'block'
      })
      setTimeout(axios({
        url:`${config.baseUrl}/contacts/readmore`,
        method: 'post',
        data: {
          skip: this.state.skip
        }
      })
      .then((res) => {
        this.props.scrollListContacts(res.data);
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
    return (
      <div>
        <div id="style-contatcs" className="find-user-bottom" onScroll={this.handleScrollLoad}>
            {this.state.isEmpty ? <div style={{textAlign : 'center', marginTop : '10px'}} ><Empty/></div> : null}
            <ul className="contactList">
              {this.props.contacts.length > 0 ? 
                  this.props.contacts.map((item, index)=>{
                    return (
                      <InfoContact 
                        key={index} 
                        avatar={urlImage(item.avatar)} 
                        nickname={item.nickname} 
                        address={item.address} 
                        titleSuccess={"Messgae"} 
                        titleDanger={"Delete"}
                        clickSuccess = {() => this.handleMessage(item)}
                        clickDanger={()=>this.showDeleteConfirm(item, this.props)}>
                      </InfoContact> )
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
    contacts : state.contacts,
    allConversations : state.allConversations,
    groupConversations : state.groupConversations,
    userConversations : state.userConversations,
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    addListContacts : (data) => {
      dispatch(actions.addListContacts(data));
    },
    scrollListContacts : (data) => {
      dispatch(actions.scrollListContacts(data));
    },
    removeListContacts : (data) => {
      dispatch(actions.removeListContacts(data))
    },
    removeCountListContacts : () => {
      dispatch(actions.removeCountListContacts())
    },
    removeListAllConversations : (data) => {
      dispatch(actions.removeListAllConversations(data))
    },
    removeListUserConversations : (data) => {
      dispatch(actions.removeListUserConversations(data))
    },
    focusMessageFromContact : (data) => {
      dispatch(actions.focusMessageFromContact(data));
    },
    scrollListAllConversations : (data) => {
      dispatch(actions.scrollListAllConversations(data));
    },
    scrollListGroupConversations : (data) => {
        dispatch(actions.scrollListGroupConversations(data));
    },
    scrollListUserConversations : (data) => {
        dispatch(actions.scrollListUserConversations(data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
