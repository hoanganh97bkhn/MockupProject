import React, { Component } from 'react';
import RightWrite from './helps/rightMain/RightWrite';
import ContentChat from './helps/rightMain/ContentChat';
import RightTop from './helps/rightMain/RightTop';
import { connect } from 'react-redux';
import config from './../../config/index';

class RightMain extends Component {
    constructor(props){
        super(props);
        this.state={
            id_chat_room : '',
            listData : {},
            dataMessage : []
        }
    }

    componentWillReceiveProps = (nextProps) => {
        let data = this.props.allConversationWithMessages.filter((item, index) => {
            if(item._id === nextProps.handleOpenChat) return true;
            else return false;
        })
        this.setState({
            id_chat_room : nextProps.handleOpenChat,
            listData : data,
            dataMessage : data.length>0 ? data[0].messages : []
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
                <RightTop data= {this.state.listData.length>0 ? this.state.listData[0] : this.state.listData}/>
                <ContentChat data = {this.state.dataMessage.length>0 ? this.state.dataMessage : this.state.dataMessage}/>
                <RightWrite dataId = {this.state.id_chat_room} handleChangeSendMess = {this.handleChangeSendMess}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        allConversationWithMessages : state.allConversationWithMessages
    };
}

export default connect(
    mapStateToProps,
)(RightMain);
