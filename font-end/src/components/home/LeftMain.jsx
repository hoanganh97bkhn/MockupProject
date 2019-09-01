import React, { Component } from 'react';
import {Select, Icon, Tooltip, Modal, Button} from 'antd';
import UserChat from './helps/leftMain/UserChat';
import GroupChat from './helps/leftMain/GroupChat';
import AllChat from './helps/leftMain/AllChat';
import ModalCreateGroupChat from './helps/leftMain/ModalCreateGroupChat';

const {Option} = Select;

class LeftMain extends Component {
    constructor(props){
        super(props);
        this.state={
            valueOption : 'all-message',
            visible : false
        }
    }
    handleChange = (value)=>{
        this.setState({
            valueOption: value
        })
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
    };
    
    handleOk = () => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    handleOpenChat = (_id) => {
        this.props.handleOpenChat(_id)
    }

    render() {
        return (
        <div className="left">
            <div className="select-chat">
                <Select className="option-select" defaultValue="all-message" style={{ width: 200 }} onChange={this.handleChange}>
                    <Option value="all-message">All Chat</Option>
                    <Option value="group-chat">Group Chat</Option>
                    <Option value="user-chat">Chat</Option>
                </Select>
                <Tooltip placement="topLeft" title={'Create group chat'}>
                    <Icon onClick={this.showModal} className="gr-chat" type="form" />
                </Tooltip>
            </div>
                {this.state.valueOption === 'all-message' ? <AllChat handleOpenChat={this.handleOpenChat}/> : 
                this.state.valueOption === 'group-chat'   ? <GroupChat handleOpenChat={this.handleOpenChat}/> :
                                                            <UserChat handleOpenChat={this.handleOpenChat}/>
                }
            <div>
                <Modal
                    title="Create Group Chat"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <ModalCreateGroupChat/>
                </Modal>
            </div>
        </div>
        );
    }
}

export default LeftMain;