import React, { Component } from 'react';
import { connect } from 'react-redux';
import avatar_default from './../../../../image/avatar-default.jpg';
import group_avatar from './../../../../image/group-avatar.png';
import config from './../../../../config/index';

let urlImage = (avatar) => {
    if(avatar !== "avatar-default.jpg")
      return `${config.baseUrl}/images/${avatar}`
    else return avatar_default
}

class GroupChat extends Component {
  render() {
      const listData = this.props.groupConversations;
    return (
      <ul className="people no-padding-start">
            {listData.map( (item, index) => {
                return (
                    <a key ={index}  href = {"#uid_" + item._id} className="room-chat">
                    <li className="person group-chat" data-chat={item._id}>
                        <div className="left-avatar">
                            {/* <!-- <div className="dot"></div> --> */}
                            <img src={group_avatar} alt=""></img>
                        </div>
                        <span className="name">
                            <span className="group-chat-name">Group:</span> {item.name}
                        </span>
                        <span className="time">Hai giờ trước</span>
                        <span className="preview">Chào cả nhóm</span>
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
    groupConversations : state.groupConversations
  };
}

export default connect(mapStateToProps,)(GroupChat);