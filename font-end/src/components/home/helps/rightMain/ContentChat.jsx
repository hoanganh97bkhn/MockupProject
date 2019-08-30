import React, { Component } from 'react';
import { connect } from 'react-redux';
import avatar from './../../../../image/avatar-default.jpg';

class ContentChat extends Component {
    render() {
        let user = this.props.user;
        let dataMessage = this.props.data;
        if(dataMessage.messages) {
            console.log(dataMessage.messages[0].file.data)
        }
        return (
            <div className="content-chat">
                <div id="style-chat" className="chat" data-chat="" tabIndex="2">
                    {!dataMessage.messages ? null : dataMessage.messages.map((item, index) => {
                        if(item.messageType === "text"){
                            return (
                                <div key={index} className={"bubble " + (item.senderId === user._id ? "me" : "you")} data-mess-id={item._id}>{item.text}</div>
                            )
                        }
                        else if(item.messageType === "image"){
                            return (
                                <div key={index} className={(item.senderId === user._id ? "me" : "you") + " bubble bubble-image-file"} data-mess-id={item._id}>
                                    <img src={`data:${item.file.contentType}; base64, ${item.file.data}`} className="show-image-chat"></img>
                                </div>
                            )
                        }
                        else if(item.messageType === "file"){
                            return (
                                <div key={index} className={(item.senderId === user._id ? "me" : "you") + " bubble bubble-image-file"} data-mess-id={item._id}>
                                    <a href={`data:${item.file.contentType}; base64, ${item.file.data}`} download={ item.file.fileName}>
                                    { item.file.fileName }
                                    </a>
                                </div>
                            )
                        }
                    })}
                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user : state.user
    };
}

export default connect(
    mapStateToProps,
)(ContentChat);