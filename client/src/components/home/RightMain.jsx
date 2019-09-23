import React, { Component } from 'react';
import RightWrite from './helps/rightMain/RightWrite';
import ContentChat from './helps/rightMain/ContentChat';
import RightTop from './helps/rightMain/RightTop';
import { connect } from 'react-redux';

class RightMain extends Component {
    constructor(props){
        super(props);
        this.state={
            id_chat_room : '',
            listData : {},
            dataMessage : [],
            isGroup : false,
            isTyping : false
        }
    }

    componentWillReceiveProps = (nextProps) => {
        let data = nextProps.allConversations.filter((item, index) => {
            if(item._id === nextProps.handleOpenChat) return true;
            else return false;
        })
        this.setState({
            id_chat_room : nextProps.handleOpenChat,
            listData : data,
            dataMessage : data.length>0 ? data[0].messages : [],
            isGroup : data.length>0 && data[0].members ? true : false,
            isTyping : nextProps.typing.indexOf(nextProps.handleOpenChat) > -1 ? true : false
        })
    }

    handleChangeSendMess = (data)=> {
        this.setState({
            dataMessage : [...this.state.dataMessage, data]
        })
    }

    render() {
        return (
            <div className="right">
                <RightTop data= {this.state.listData.length>0 ? this.state.listData[0] : this.state.listData}
                            isGroup = {this.state.isGroup}/>
                <ContentChat data = {this.state.dataMessage.length>0 ? this.state.dataMessage : this.state.dataMessage} 
                            isTyping={this.state.isTyping}
                            dataId = {this.state.id_chat_room}
                            isGroup = {this.state.isGroup}
                            />
                <RightWrite dataId = {this.state.id_chat_room} isGroup = {this.state.isGroup} 
                            handleChangeSendMess = {this.handleChangeSendMess}
                            dataContactId= {this.state.listData.length>0 ? this.state.listData[0] : this.state.listData}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        allConversations : state.allConversations,
        typing : state.typing
    };
}

export default connect(
    mapStateToProps,
)(RightMain);
