import React, { Component } from 'react';
import { connect } from 'react-redux';
import avatar from './../../../../image/avatar-default.jpg';


class AllChat extends Component {
  render() {
    return (
        <ul className="people no-padding-start">
            <a href="#uidcontact._id" className="room-chat">
                <li className="person" data-chat="contact._id">
                    <div className="left-avatar">
                        <div className="dot"></div>
                        <img src={avatar} alt=""></img>
                    </div>
                    <span className="name">
                        Hoang Anh
                    </span>
                    <span className="time">Một phút trước</span>
                    <span className="preview">Xin chào</span>
                </li>
            </a>
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
            <a href="#" className="room-chat" id="null-contact">
                <li className="person active" data-chat="person-default">
                    <div className="left-avatar">
                        <div className="dot online"></div>
                        <img className="avatar-online" src={avatar} alt=""></img>
                    </div>
                    <span className="name">Hoang Anh (admin)</span>
                    <span className="time">Bây giờ</span>
                    <span className="preview">Xin chào <strong>Hoang Anh</strong>...</span>
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

export default connect(mapStateToProps,)(AllChat);