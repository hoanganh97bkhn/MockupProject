import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../../../actions/index';
import config from './../../../../config/index';
import axios from 'axios';
import {Spin, Icon} from 'antd';
import {covertTimestampToHumanTime} from './../../../../helpers/clientHelper';

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

let helperPreview = (item) => {
  if(item.messages[item.messages.length -1]){
      if((item.messages[item.messages.length -1]).messageType === "image") return "[image]";
      else if((item.messages[item.messages.length -1]).messageType === "file") return "[file]";
      else return ((item.messages[item.messages.length -1]).text)
  }
  else return "[null]"
}

let helperTime = (item) => {
  if(item.messages[item.messages.length -1]){
     let time = covertTimestampToHumanTime(item.messages[item.messages.length -1].createdAt);
     return time
  }
}

class GroupChat extends Component {
  constructor(props){
    super(props);
    this.state={
        idFocus: '',
        userStatus : [],
        displaySpiner : 'none',
        isLimit : false,
        skipGroup : 0,
    }
  }

  componentWillMount = () => {
    this.setState({
      userStatus : this.props.userStatus,
      skipGroup : this.props.groupConversations.length,
    })
  }

  handleScrollLoad = (event) =>{
    let element = event.target;
    if(element.scrollHeight - element.scrollTop === 779 && !this.state.isLimit){
      this.setState({
        displaySpiner : 'block'
      })
      axios({
        url:`${config.baseUrl}/message/read-more-group-chat?skipGroup=${this.state.skipGroup}`,
        method: 'get',
      })
      .then((res) => {
            if(res.data.groupConversationsWithMessages.length == 0){
                this.setState({
                    displaySpiner : 'none',
                    isLimit : true
                })
            }
            else {
                this.props.scrollListAllConversations(res.data.allConversationsWithMessages);
                this.props.scrollListGroupConversations(res.data.groupConversationsWithMessages);
                this.setState({
                    displaySpiner : 'none',
                    isLimit : false
                })
            }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          displaySpiner : 'none'
        })
      })
    }
}

  componentWillReceiveProps = (nextProps) => {
    this.setState({
        userStatus : nextProps.userStatus
    })
  }

  handleOpenChat = (idFocus) => {
    this.props.handleOpenChat(idFocus);
    this.setState({
      idFocus : idFocus
  })
  }
  render() {
      const listData = this.props.groupConversations;
    return (
      <ul id="list-chat" className="people no-padding-start">
            {listData.map( (item, index) => {
                return (
                    <a key ={index}  href = {"#uid_" + item._id} className="room-chat">
                    <li className={item._id == this.state.idFocus? "person group-chat active" : "person group-chat"} data-chat={item._id} onClick={(e) => {this.handleOpenChat(item._id)}}>
                        <div className="left-avatar">
                            <div className={`dot ${this.state.userStatus.indexOf(item._id) > -1 ? 'online' : ''}`}></div>
                            <img src={`${config.baseUrl}/images/${item.avatar}`} alt="" className={`${this.state.userStatus.indexOf(item._id) > -1 ? 'avatar-online' : ''}`}></img>
                        </div>
                        <p className="name text-over">
                            <span className="group-chat-name">{item.name}</span>
                        </p>
                        <span className="time">{helperTime(item)}</span>
                        <span className="preview">{helperPreview(item)}</span>
                    </li>
                </a>
                )
                })
            }
          <div className="spiner-all-chat" style={{textAlign:'center', display: this.state.displaySpiner}}>
                  <Spin indicator={antIcon}/>
          </div>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    groupConversations : state.groupConversations,
    userStatus : state.userStatus
  };
}

function mapDispatchToProps(dispatch, props){
  return {
      scrollListAllConversations : (data) => {
          dispatch(actions.scrollListAllConversations(data));
      },
      scrollListGroupConversations : (data) => {
          dispatch(actions.scrollListGroupConversations(data));
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupChat);