import React, { Component } from 'react';
import {Select} from 'antd';
import avatar from './../../image/avatar-default.jpg';
import { max } from 'moment';

const {Option} = Select;

class LeftMain extends Component {
  handleChange = (value)=>{
    console.log(`selected ${value}`);
  }
  render() {
    return (
      <div className="left">
        <div className="select-chat">
            <Select className="option-select" defaultValue="all-message" style={{ width: 240 }} onChange={this.handleChange}>
                <Option value="all-message">All Chat</Option>
                <Option value="group-chat">Group Chat</Option>
                <Option value="chat">Chat</Option>
            </Select>
        </div>
        <ul className="people no-padding-start">
            <a href="#uidcontact._id" className="room-chat">
                <li className="person" data-chat="contact._id">
                    <div className="left-avatar">
                        <div className="dot"></div>
                        <img src={avatar} alt=""></img>
                    </div>
                    <span className="name">
                        Trung Quân
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
                    <span className="name">Trung Quân (admin)</span>
                    <span className="time">Bây giờ</span>
                    <span className="preview">Xin chào <strong>Trung Quân</strong>...</span>
                </li>
            </a>
        </ul>
      </div>
    );
  }
}

export default LeftMain;