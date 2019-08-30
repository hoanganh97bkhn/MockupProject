import React, { Component } from 'react';
import { connect } from 'react-redux';
import avatar_default from './../../../../image/avatar-default.jpg';
import config from './../../../../config/index';


let urlImage = (avatar) => {
    if(avatar !== "avatar-default.jpg")
      return `${config.baseUrl}/images/${avatar}`
    else return avatar_default
}

class UserChat extends Component {

  handleOpenChat = (item) => {
    this.props.handleOpenChat(item)
  }
  
  render() {
    const listData = this.props.userConversations;
    return (
        <ul className="people no-padding-start">
                { listData.map( (item, index) => {
                    return (
                        <a key ={index}  href = {"#uid_" + item._id} className="room-chat">
                            <li className="person" data-chat={item._id} onClick={(e) => {this.handleOpenChat(item)}}>
                                <div className="left-avatar">
                                    <div className="dot"></div>
                                    <img src={urlImage(item.avatar)} alt=""></img>
                                </div>
                                <p className="name text-over">
                                    {item.nickname}
                                </p>
                                <span className="time">Một phút trước</span>
                                <span className="preview text-over">Xin chào</span>
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