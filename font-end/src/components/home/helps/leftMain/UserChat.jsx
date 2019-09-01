import React, { Component } from 'react';
import { connect } from 'react-redux';
import avatar_default from './../../../../image/avatar-default.jpg';
import config from './../../../../config/index';


let urlImage = (avatar) => {
    if(avatar !== "avatar-default.jpg")
      return `${config.baseUrl}/images/${avatar}`
    else return avatar_default
}

let helperPreview = (item) => {
  if(item.messages[item.messages.length -1]){
      console.log(item.messages[item.messages.length -1])
      if((item.messages[item.messages.length -1]).messageType === "image") return "[image]";
      else if((item.messages[item.messages.length -1]).messageType === "file") return "[file]";
      else return ((item.messages[item.messages.length -1]).text)
  }
  else return "[null]"
}

class UserChat extends Component {
  constructor(props){
    super(props);
    this.state={
        idFocus: ''
    }
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
        <ul className="people no-padding-start">
                { listData.map( (item, index) => {
                    return (
                        <a key ={index}  href = {"#uid_" + item._id} className="room-chat">
                            <li className={item._id == this.state.idFocus? "person active" : "person"} data-chat={item._id} onClick={(e) => {this.handleOpenChat(item, item._id)}}>
                                <div className="left-avatar">
                                    <div className="dot"></div>
                                    <img src={urlImage(item.avatar)} alt=""></img>
                                </div>
                                <p className="name text-over">
                                    {item.nickname}
                                </p>
                                <span className="time">Một phút trước</span>
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
    userConversations : state.userConversations
  };
}

export default connect(mapStateToProps,)(UserChat);