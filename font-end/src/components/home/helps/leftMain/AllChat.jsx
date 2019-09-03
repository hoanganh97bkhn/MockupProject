import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../../../../actions/index';
import config from './../../../../config/index';
import _ from 'lodash';
import {covertTimestampToHumanTime} from './../../../../helpers/clientHelper';

let helperPreview = (item) => {
    if(item.messages[item.messages.length -1]){
        if((item.messages[item.messages.length -1]).messageType === "image") return "[image]";
        else if((item.messages[item.messages.length -1]).messageType === "file") return "[file]";
        else return ((item.messages[item.messages.length -1]).text)
    }
    else return "[null]"
}

let helperTime = (item) => {
    if(item.messages[item.messages.length -1]){
       let time = covertTimestampToHumanTime(item.messages[item.messages.length -1].createdAt);
       return time
    }
}

class AllChat extends Component {
    constructor(props){
        super(props);
        this.state={
            idFocus: '',
            listData : ''
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

    // componentWillReceiveProps = (nextProps) => {
    //     let uid = nextProps.checkChangeList;
        
    // }
   
    handleOpenChat = (item, idFocus) => {
        this.props.handleOpenChat(item._id);
        this.props.removeOnMessage(item._id);
        this.setState({
            idFocus : idFocus
        })
    }
    render() {
        return (
            <ul className="people no-padding-start" onScroll={this.handleScrollLoad}>
                {this.props.allConversations.length> 0 ? this.props.allConversations.map((item, index) => {
                    if(!item.members) return (
                        <a key ={index}  href = {"#uid_" + item._id} className={"room-chat"}>
                            <li className={item._id == this.state.idFocus? "person active" : "person"} data-chat={item._id} onClick={(e) => {this.handleOpenChat(item, item._id, index)}}>
                                <div className="left-avatar">
                                    <div className="dot"></div>
                                    <img src={`${config.baseUrl}/images/${item.avatar}`} alt=""></img>
                                </div>
                                <p className="name text-over">
                                    {item.nickname}
                                </p>
                                <span className="time">{helperTime(item)}</span>
                                <span className="preview">{helperPreview(item)}</span>
                            </li>
                        </a>
                    )
                    else return (
                        <a key ={index}  href = {"#uid_" + item._id} className={"room-chat"}>
                            <li className={item._id == this.state.idFocus? "person group-chat active" : "person group-chat"} data-chat={item._id} onClick={(e) => {this.handleOpenChat(item, item._id)}}>
                                <div className="left-avatar">
                                    {/* <!-- <div className="dot"></div> --> */}
                                    <img src={`${config.baseUrl}/images/${item.avatar}`} alt=""></img>
                                </div>
                                <p className="name text-over">
                                    <span className="group-chat-name">{item.name}</span> 
                                </p>
                                <span className="time">{helperTime(item)}</span>
                                <span className="preview">{helperPreview(item)}</span>
                            </li>
                        </a>
                    )
                }) : null}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        allConversations : state.allConversations,
        message : state.message
    };
}

function mapDispatchToProps(dispatch, props){
    return {
        removeOnMessage : (data) => {
            dispatch(actions.removeOnMessage(data))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllChat);