import React, { Component } from 'react';
import { connect } from 'react-redux';
import avatar from './../../../../image/avatar-default.jpg';



class UserChat extends Component {
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
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps,)(UserChat);