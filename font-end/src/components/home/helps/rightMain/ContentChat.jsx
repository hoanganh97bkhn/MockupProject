import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from './../../../../config/index';
import {bufferToBase64} from './../../../../helpers/clientHelper';

class ContentChat extends Component {
    constructor(props) {
        super(props)
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "auto" });
    }
      
    componentDidMount() {
        this.scrollToBottom();
      }
      
    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        let user = this.props.user;
        let dataMessage = this.props.data;
        return (
            <div className="content-chat" >
                <div id="style-chat" className="chat" data-chat="" tabIndex="2" >
                    {dataMessage.length >0 ? dataMessage.map((item, index) => {
                        if(item.messageType === "text"){
                            return (
                                <div key={index} className={"bubble " + (item.senderId == user._id ? "me" : "you")} >{item.text}
                                    {item.senderId != user._id ? 
                                        <img src={`${config.baseUrl}/images/${item.sender.avatar}`} className="avatar-small" title={item.sender.name}></img>
                                        : null
                                    }
                                    
                                </div>
                            )
                        }
                        else if(item.messageType === "image"){
                            return (
                                <div key={index} className={(item.senderId == user._id ? "me" : "you") + " bubble image bubble-image-file"}>
                                    {item.senderId != user._id ? 
                                        <img src={`${config.baseUrl}/images/${item.sender.avatar}`} className="avatar-small" title={item.sender.name}></img>
                                        : null
                                    }
                                    <img src={`data:${item.file.contentType}; base64, ${bufferToBase64(item.file.data)}`} className="show-image-chat" ></img>
                                </div>
                            )
                        }
                        else if(item.messageType === "file"){
                            return (
                                <div key={index} className={(item.senderId == user._id ? "me" : "you") + " bubble file bubble-image-file"}>
                                    {item.senderId != user._id ? 
                                        <img src={`${config.baseUrl}/images/${item.sender.avatar}`} className="avatar-small" title={item.sender.name}></img>
                                        : null
                                    }
                                    <a href={`data:${item.file.contentType}; base64, ${bufferToBase64(item.file.data)}`} download={ item.file.fileName}>
                                    { item.file.fileName }
                                    </a>
                                </div>
                            )
                        }
                    }) : null}
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
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