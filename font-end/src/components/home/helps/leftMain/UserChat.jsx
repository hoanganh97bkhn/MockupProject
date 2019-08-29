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
  render() {
    const listData = this.props.userConversations;
    return (
        <ul className="people no-padding-start">
                { listData.map( (item, index) => {
                    return (
                        <a key ={index}  href = {"#uid_" + item._id} className="room-chat">
                            <li className="person" data-chat={item._id}>
                                <div className="left-avatar">
                                    <div className="dot"></div>
                                    <img src={urlImage(item.avatar)} alt=""></img>
                                </div>
                                <span className="name">
                                    {item.nickname}
                                </span>
                                <span className="time">Một phút trước</span>
                                <span className="preview">Xin chào</span>
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