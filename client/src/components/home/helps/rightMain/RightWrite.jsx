import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {Input, message, Modal} from 'antd'
import { Picker } from 'emoji-mart';
import * as actions from './../../../../actions/index';
import config from './../../../../config/index';
import ModalCallVideo from './ModalCallVideo';
import VideoCall from './VideoCall';
const {TextArea} = Input;

class RightWrite extends Component {
    constructor(props){
        super(props);
        this.state={
            text:'',
            openMoji : false,
            newMessage : '',
            ObjectMessage : {},
            imageData : '',
            imageDataPrview : '',
            keyInput : Date.now(),
            keyInputFile : Date.now()/2,
            fileData : '',
            isOpenModal: false,
            isOpen : false
        }
    }

    componentWillReceiveProps = (nextProps) => {
        let index = nextProps.dataId
        if(this.state.ObjectMessage[index]){
            this.setState({
                newMessage : this.state.ObjectMessage[index]
            })
        }
        else {
            this.setState({
                ObjectMessage : {...this.state.ObjectMessage, [index] : ''},
                newMessage : ''
            })
        }
    }

    handleOpenMoji = () =>{
        this.setState({
            openMoji : true,
        },() => {
            document.addEventListener('click', this.handleCloseMoji);
        })
    }

    handleCloseMoji = () =>{
        this.setState({
            openMoji : false
        }, () => {
            document.removeEventListener('click', this.handleCloseMoji);
        })
    }
    
    addEmoji = (emoji)=>{
        let index = this.props.dataId;
        document.removeEventListener('click', this.handleCloseMoji);
        const { newMessage } = this.state;
        const text = `${newMessage}${emoji.native}`;
        this.setState({
            newMessage: text,
            ObjectMessage : {...this.state.ObjectMessage, [index] : text},
        });
    }
    
    handleInputChange = (e) => {
        let index = this.props.dataId;
        let data = {
            uid: index,
            isGroup : this.props.isGroup
        }
        this.props.socket.emit("user-is-typing",data);
        this.setState({
            newMessage: e.target.value,
            ObjectMessage : {...this.state.ObjectMessage, [index] : e.target.value},
        })
    }

    handleInputChangeImage = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if(file){
            if(file.type !== "image/png" && file.type !== "image/jpeg" && file.type !== "image/jpg"){
                message.error('error file type', 5);
            }
            else if(file.size >= 1048576){
                message.error('error file size', 5);
            }
            else{
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                this.setState({
                    imageData: file,
                    imageDataPrview : reader.result
                });
            }
            }
        }
    }

    handleInputChangeFile = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        if(file){
            if(file.size >= 1048576){
                message.error('error file size', 5);
            }
            else{
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                this.setState({
                    fileData: file,
                });
            }
            }
        }
    }

    resetFileData = () => {
        this.setState({
            fileData : '',
            keyInputFile : Date.now()/2,
        })
    }

    resetImgData = () => {
        this.setState({
            imageData : '',
            keyInput : Date.now(),
            imageDataPrview : ''
        })
    }

    handleonBlur = () => {
        let index = this.props.dataId;
        let data = {
            uid: index,
            isGroup : this.props.isGroup
        }
        this.props.socket.emit("user-is-off-typing",data);
    }

    handleSendMessage = (e) =>{
        e.preventDefault();
        let index = this.props.dataId;
        
        //off typing
        let _data = {
            uid: index,
            isGroup : this.props.isGroup
        }
        this.props.socket.emit("user-is-off-typing",_data);

        //send -chat -realtime
        let data = {
            uid: index,
            messageVal : this.state.newMessage,
            isGroup : this.props.isGroup
        }
        if(this.state.newMessage !== ''){
            axios({
                url : `${config.baseUrl}/message/add-new-text-emoji`, 
                method :'POST',
                data : data
            })
            .then((res)=>{
                this.props.changeListAllConversations(this.props.dataId, res.data);
                this.props.changeListGroupConversations(this.props.dataId, res.data);
                this.props.changeListUserConversations(this.props.dataId, res.data);
                this.props.socket.emit("chat-text-emoji", {uid : this.props.dataId, messageVal : res.data, isGroup : this.props.isGroup});
                this.setState({
                    newMessage : '',
                    ObjectMessage : {...this.state.ObjectMessage, [index] : ''},
                });
            })
            .catch((error)=>{
                message.error(error.response.statusText,5)
            })
        }
        if(this.state.imageData !== ''){
            let formData = new FormData();
            formData.append('file', this.state.imageData);
            formData.append('uid', index);
            formData.append('isGroup', this.props.isGroup)
            axios({
                url : `${config.baseUrl}/message/add-new-image`,
                method :'POST',
                data : formData
            })
            .then((res)=>{
                this.props.changeListAllConversations(this.props.dataId, res.data);
                this.props.changeListGroupConversations(this.props.dataId, res.data);
                this.props.changeListUserConversations(this.props.dataId, res.data);
                this.props.socket.emit("chat-text-emoji", {uid : this.props.dataId, messageVal : res.data, isGroup : this.props.isGroup});
                this.setState({
                    imageData : '',
                    keyInput : Date.now(),
                    imageDataPrview : ''
                });
            })
            .catch((error)=>{
                message.error("Server error, please focus to conversation!",5)
            })
        }

        if(this.state.fileData !== ''){
            let formData = new FormData();
            formData.append('file', this.state.fileData);
            formData.append('uid', index);
            formData.append('isGroup', this.props.isGroup)
            axios({
                url : `${config.baseUrl}/message/add-new-file`,
                method :'POST',
                data : formData
            })
            .then((res)=>{
                this.props.changeListAllConversations(this.props.dataId, res.data);
                this.props.changeListGroupConversations(this.props.dataId, res.data);
                this.props.changeListUserConversations(this.props.dataId, res.data);
                this.props.socket.emit("chat-text-emoji", {uid : this.props.dataId, messageVal : res.data, isGroup : this.props.isGroup});
                this.setState({
                    fileData : '',
                    keyInputFile : Date.now()/2,
                });
            })
            .catch((error)=>{
                message.error("Server error, please focus to conversation!",5)
            })
        }
    }

    handleCallVideo = () => {
        this.setState({
            isOpen : true,
        })
        let data = this.props.dataContactId;
        let listenerId = this.props.dataId;
        let callerName = this.props.user.nickname;
        let listenerName = data.nickname? data.nickname : data.name
        let dataToEmit = {
            listenerId,
            callerName,
            listenerName
        }
        this.props.socket.emit("caller-check-listener-online-or-not", dataToEmit);
    }
    
    render() {
        return (
            this.props.dataId === "" ? <div></div> : 
            <div className="write">
                <div className="row">
                    <div className="col-2 action-chat">
                        <label htmlFor="input-image"><i className="fa fa-photo"></i></label>
                            <input key={this.state.keyInput} className="input-image" id="input-image" type="file" style={{position: "fixed", top: "-100em"}} onChange={this.handleInputChangeImage}></input>
                        <label htmlFor="input-file"><i className="fa fa-paperclip"></i></label>
                            <input key={this.state.keyInputFile} className="input-file" id="input-file" type="file" style={{position: "fixed", top: "-110em"}} onChange={this.handleInputChangeFile}></input>
                        {!this.props.isGroup ? <i className="fa fa-video-camera" onClick={this.handleCallVideo}></i>: null}
                    </div>
                    <div className="col-9">
                        <div className="test">
                            <div className="row">
                                {this.state.imageDataPrview === '' ? null : 
                                <div className="img-prev col-auto">
                                    <img className="avatar-prev" src={this.state.imageDataPrview} alt="avatar"></img>
                                    <button type="button" onClick={this.resetImgData} className="remove-img close">×</button>
                                </div>
                                }
                                {this.state.fileData === '' ? null : 
                                <div className="img-prev col-auto">
                                    <div className="file-preview" style={{color : 'red'}}> {this.state.fileData.name} </div>
                                    <button type="button" onClick={this.resetFileData} className="remove-img close">×</button>
                                </div>
                                }
                            </div>
                        </div> 
                        <div className="write-chat">
                            <TextArea 
                                onPressEnter={this.handleSendMessage} 
                                rows={1} className="search-txt" 
                                value={this.state.newMessage} 
                                onChange={this.handleInputChange}
                                onBlur = {this.handleonBlur}/>
                            <i className="fa fa-smile-o" onClick={this.handleOpenMoji}></i>
                            
                        </div>
                        
                        <div onClick={this.handleOpenMoji}>{this.state.openMoji ? <Picker set="emojione" onSelect={this.addEmoji} onSkinChange={document.removeEventListener('click', this.handleCloseMoji)}/> : null}</div>           
                    </div>
                    <div className="col-auto">
                        <i className="fa fa-paper-plane" onClick={this.handleSendMessage}></i>
                    </div>                    
                </div>
                <Modal
                    title="Video Call"
                    visible={this.state.visible}
                    />
                <ModalCallVideo/>
                <VideoCall />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user : state.user,
        socket : state.socket,
        stream : state.stream
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        changeListAllConversations : (id, data) => {
            dispatch(actions.changeListAllConversations(id, data));
        },
        changeListGroupConversations : (id, data) => {
            dispatch(actions.changeListGroupConversations(id, data));
        },   
        changeListUserConversations : (id, data) => {
            dispatch(actions.changeListUserConversations(id, data));
        },    
        openModalCaller : (data) => {
            dispatch(actions.openModalCaller(data))
        },  
    }
}

export default connect(
    mapStateToProps,mapDispatchToProps
)(RightWrite);