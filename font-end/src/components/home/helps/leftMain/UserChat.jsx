import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from './../../../../config/index';
import {covertTimestampToHumanTime} from './../../../../helpers/clientHelper';


let helperPreview = (item) => {
  if(item.messages[item.messages.length -1]){
      console.log(item.messages[item.messages.length -1])
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

class UserChat extends Component {
  constructor(props){
    super(props);
    this.state={
        idFocus: '',
        userStatus : []
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
        userStatus : nextProps.userStatus
    })
  }

  handleOpenChat = (item , idFocus) => {
    this.props.handleOpenChat(item._id);
    this.setState({
      idFocus : idFocus
  })
  }
  
  render() {
    const listData = this.props.userConversations;
    return (
        <ul id="list-chat" className="people no-padding-start">
                { listData.map( (item, index) => {
                    return (
                        <a key ={index}  href = {"#uid_" + item._id} className="room-chat">
                            <li className={item._id == this.state.idFocus? "person active" : "person"} data-chat={item._id} onClick={(e) => {this.handleOpenChat(item, item._id)}}>
                                <div className="left-avatar">
                                    <div className={`dot ${this.state.userStatus.indexOf(item._id) > -1 ? 'online' : ''}`}></div>
                                    <img src={`${config.baseUrl}/images/${item.avatar}`} alt="" className={`${this.state.userStatus.indexOf(item._id) > -1 ? 'avatar-online' : ''}`}></img>
                                </div>
                                <p className="name text-over">
                                    {item.nickname}
                                </p>
                                <span className="time">{helperTime(item)}</span>
                                <span className="preview text-over">{helperPreview(item)}</span>
                            </li>
                        </a>
                    )
                })
            }
        </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    userConversations : state.userConversations,
    userStatus : state.userStatus
  };
}

export default connect(mapStateToProps,)(UserChat);