import React, { Component } from 'react';
import { connect } from 'react-redux';
import avatar from './../../../../image/avatar-default.jpg';


class GroupChat extends Component {
  render() {
    return (
      <ul className="people no-padding-start">
        <a href="#uidgroupChatItem._id" className="room-chat">
            <li className="person group-chat" data-chat="groupChatItem._id">
                <div className="left-avatar">
                    {/* <!-- <div className="dot"></div> --> */}
                    <img src={avatar} alt=""></img>
                </div>
                <span className="name">
                    <span className="group-chat-name">Group:</span> Group Chat
                </span>
                <span className="time">Hai giờ trước</span>
                <span className="preview">Chào cả nhóm</span>
            </li>
        </a>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps,)(GroupChat);