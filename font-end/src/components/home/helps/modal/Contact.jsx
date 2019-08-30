import React, { Component } from 'react';
import InfoContact from './InfoContact';
import avatar_default from './../../../../image/avatar-default.jpg';
import config from './../../../../config/index';
import * as actions from './../../../../actions/index';
import axios from 'axios';
import {Spin, Icon, message, Modal} from 'antd';
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
      visible: false 
    }
  }

  componentDidMount = () => {
    this.setState({
      skip: this.props.contacts.length
    })
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      skip : nextProps.contacts.length
    })
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
        console.log('Cancel');
      },
    });
  }

  handleDeleteContacts (item){
    console.log('hello')
    // axios({
    //   url: `${config.baseUrl}/contact/remove-contact`,
    //   method: "delete",
    //   data: {uid: item._id}
    // })
    // .then((res)=>{
    //   message.success(`Delete friend ${item.nickname} success!`);
    //   this.props.socket.emit("remove-contact", {contactId : item._id});
    //   this.props.removeListContacts(item);
    //   this.props.removeCountListContacts();
    // })
    // .catch((error)=>{
    //   message.error(`Delete friend ${item.nickname} error!`);
    //   console.log(error)
    // })
  }

  handleScrollLoad = (event) =>{
    let element = event.target;
    if(element.scrollHeight - element.scrollTop === 476){
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
        this.props.scrollListContacts(res.data)
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
                        clickSuccess = {() => this.handleMessage(item, index)}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
