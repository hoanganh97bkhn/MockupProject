import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from './../../../../config/index';


let helperPreview = (item) => {
  if(item.messages[item.messages.length -1]){
      console.log(item.messages[item.messages.length -1])
      if((item.messages[item.messages.length -1]).messageType === "image") return "[image]";
      else if((item.messages[item.messages.length -1]).messageType === "file") return "[file]";
      else return ((item.messages[item.messages.length -1]).text)
  }
  else return "[null]"
}

class GroupChat extends Component {
  constructor(props){
    super(props);
    this.state={
        idFocus: ''
    }
  }

  handleOpenChat = (item, idFocus) => {
    this.props.handleOpenChat(item._id);
    this.setState({
      idFocus : idFocus
  })
  }
  render() {
      const listData = this.props.groupConversations;
    return (
      <ul className="people no-padding-start">
            {listData.map( (item, index) => {
                return (
                    <a key ={index}  href = {"#uid_" + item._id} className="room-chat">
                    <li className={item._id == this.state.idFocus? "person group-chat active" : "person group-chat"} data-chat={item._id} onClick={(e) => {this.handleOpenChat(item, item._id)}}>
                        <div className="left-avatar">
                            {/* <!-- <div className="dot"></div> --> */}
                            <img src={`${config.baseUrl}/images/${item.avatar}`} alt=""></img>
                        </div>
                        <p className="name text-over">
                            <span className="group-chat-name">Group:</span> {item.name}
                        </p>
                        <span className="time">Hai giờ trước</span>
                        <span className="preview">{helperPreview(item)}</span>
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