import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Icon, Spin, message, Empty} from 'antd';
import axios from 'axios';
import config from './../../../../config/index';
import typingImage from './../../../../image/typing.gif';
import {bufferToBase64} from './../../../../helpers/clientHelper';
import * as actions from './../../../../actions/index';


const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
let isScroll = false;
class ContentChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false,
            skipMessage : 0,
            limit : false
        }
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "auto" });
    }

    scrollToTop = () => {
        this.messageTop.scrollIntoView({behavior: 'auto'});
    }
      
    componentDidMount() {
        this.setState({
            skipMessage : this.props.data.length
        })
    }
      
    componentDidUpdate() {
        if(isScroll){
            this.scrollToTop();
        }
        else {
            this.scrollToBottom();
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            skipMessage : nextProps.data.length
        })
    }

    handleScrollLoad = (event) => {
        let element = event.target;
        let dataMessage = this.props.data;
        if(dataMessage.length > 8){
            if(element.scrollTop === 0 && !this.state.limit){
                isScroll = true;
                this.setState({
                    loading : true
                })
                axios({
                    url:`${config.baseUrl}/message/read-more-message?skipMessage=${this.state.skipMessage}&targetId=${this.props.dataId}&chatInGroup=${this.props.isGroup}`,
                    method: 'get',
                })
                .then((res) => {
                        if(res.data.length > 0){
                            this.props.scrollChangeListAllConversations(this.props.dataId, res.data);
                            this.props.scrollChangeListGroupConversations(this.props.dataId, res.data);
                            this.props.scrollChangeListUserConversations(this.props.dataId, res.data);
                        }
                        else {   
                            this.setState({
                                limit : true
                            },()=>{
                                message.error("No more messages to scroll",3);
                            })
                        }
                        this.setState({
                            loading : false,
                        },()=>{
                            isScroll = false;
                        })
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        loading : false,
                        limit : true
                    })
                })
            }
        }
    }

    render() {
        let user = this.props.user;
        let dataMessage = this.props.data;
        return (
            <div className="content-chat" onScroll={this.handleScrollLoad}>
                <div id="style-chat" className="chat" data-chat="" tabIndex="2" >
                    <div style={{textAlign : 'center', marginTop: '15px'}}><Spin indicator={antIcon} spinning={this.state.loading}/></div>
                    {dataMessage.length >0 ? dataMessage.map((item, index) => {
                        if(item.messageType === "text"){
                            return (
                                <div key={index} className={"bubble " + (item.senderId === user._id ? "me" : "you")} ref={index === 1? (el) => { this.messageTop = el; } : null}>{item.text} 
                                    {item.senderId !== user._id ? 
                                        <img src={`${config.baseUrl}/images/${item.sender.avatar}`} className="avatar-small" title={item.sender.name} alt={"file-avatar"}></img>
                                        : null
                                    }
                                    
                                </div>
                            )
                        }
                        else if(item.messageType === "image"){
                            return (
                                <div key={index} className={(item.senderId === user._id ? "me" : "you") + " bubble image bubble-image-file"} ref={index === 1? (el) => { this.messageTop = el; } : null}>
                                    {item.senderId !== user._id ? 
                                        <img src={`${config.baseUrl}/images/${item.sender.avatar}`} className="avatar-small" title={item.sender.name} alt={"file-images"}></img>
                                        : null
                                    }
                                    <img src={`data:${item.file.contentType}; base64, ${bufferToBase64(item.file.data)}`} className="show-image-chat" alt={"file-avatar"}></img>
                                </div>
                            )
                        }
                        else if(item.messageType === "file"){
                            return (
                                <div key={index} className={(item.senderId === user._id ? "me" : "you") + " bubble file bubble-image-file"} ref={index === 1? (el) => { this.messageTop = el; } : null}>
                                    {item.senderId !== user._id ? 
                                        <img src={`${config.baseUrl}/images/${item.sender.avatar}`} className="avatar-small" title={item.sender.name} alt={"file-avatar"}></img>
                                        : null
                                    }
                                    <a href={`data:${item.file.contentType}; base64, ${bufferToBase64(item.file.data)}`} download={ item.file.fileName}>
                                    { item.file.fileName }
                                    </a>
                                </div>
                            )
                        }
                    }) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                    {this.props.isTyping ? 
                        <div className="bubble image bubble-image-file you bubble-typing-gif">
                            <img src={typingImage} alt={"file-images"}></img>
                        </div>
                    : null}
                    
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

function mapDispatchToProps(dispatch, props) {
    return {
        scrollChangeListAllConversations : (id, data) => {
            dispatch(actions.scrollChangeListAllConversations(id, data));
        },
        scrollChangeListGroupConversations : (id, data) => {
            dispatch(actions.scrollChangeListGroupConversations(id, data));
        },   
        scrollChangeListUserConversations : (id, data) => {
            dispatch(actions.scrollChangeListUserConversations(id, data));
        },
    }
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(ContentChat);