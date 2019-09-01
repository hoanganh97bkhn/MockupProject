import React, { Component } from 'react';
import { connect } from 'react-redux';
import avatar_default from './../../../../image/avatar-default.jpg';
import group_avatar from './../../../../image/group-avatar.png';
import config from './../../../../config/index';
import axios from 'axios';


let urlImage = (avatar) => {
    if(avatar !== "avatar-default.jpg")
      return `${config.baseUrl}/images/${avatar}`
    else return avatar_default
}

class AllChat extends Component {
    constructor(props){
        super(props);
        this.state={
            idFocus: ''
        }
    }

    handleScrollLoad = (event) =>{
        let element = event.target;
        console.log(element.scrollHeight - element.scrollTop)
        // let element = event.target;
        // if(element.scrollHeight - element.scrollTop === 476){
        //   this.setState({
        //     displaySpiner : 'block'
        //   })
        //   setTimeout(axios({
        //     url:`${config.baseUrl}/contacts/readmore`,
        //     method: 'post',
        //     data: {
        //       skip: this.state.skip
        //     }
        //   })
        //   .then((res) => {
        //     this.props.scrollListContacts(res.data)
        //     this.setState({
        //       displaySpiner : 'none'
        //     })
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //     this.setState({
        //       displaySpiner : 'none'
        //     })
        //   }), 1000)
          
        // }
    }
    handleOpenChat = (item, idFocus) => {
        this.props.handleOpenChat(item);
        this.setState({
            idFocus : idFocus
        })
    }
    render() {
        const listData = this.props.allConversationWithMessages;
        return (
            <ul className="people no-padding-start" onScroll={this.handleScrollLoad}>
                {listData.map((item, index) => {
                    if(!item.members) return (
                        <a key ={index}  href = {"#uid_" + item._id} className={"room-chat"}>
                            <li className={item._id == this.state.idFocus? "person active" : "person"} data-chat={item._id} onClick={(e) => {this.handleOpenChat(item, item._id)}}>
                                <div className="left-avatar">
                                    <div className="dot"></div>
                                    <img src={urlImage(item.avatar)} alt=""></img>
                                </div>
                                <p className="name text-over">
                                    {item.nickname}
                                </p>
                                <span className="time">Một phút trước</span>
                                <span className="preview">Xin chào</span>
                            </li>
                        </a>
                    )
                    else return (
                        <a key ={index}  href = {"#uid_" + item._id} className={"room-chat"}>
                            <li className={item._id == this.state.idFocus? "person group-chat active" : "person group-chat"} data-chat={item._id} onClick={(e) => {this.handleOpenChat(item, item._id)}}>
                                <div className="left-avatar">
                                    {/* <!-- <div className="dot"></div> --> */}
                                    <img src={group_avatar} alt=""></img>
                                </div>
                                <p className="name text-over">
                                    <span className="group-chat-name">Group:</span> {item.name}
                                </p>
                                <span className="time">Hai giờ trước</span>
                                <span className="preview">Chào cả nhóm</span>
                            </li>
                        </a>
                    )
                })}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        allConversationWithMessages : state.allConversationWithMessages  
    };
}

export default connect(mapStateToProps,)(AllChat);