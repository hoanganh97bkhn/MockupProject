import React, { Component } from 'react';
import { connect } from 'react-redux';
import {message} from 'antd';
import InfoContact from './../modal/InfoContact';
import avatar_default from './../../../../image/avatar-default.jpg';
import config from './../../../../config/index';
import * as actions from './../../../../actions/index';
import axios from 'axios';

let urlImage = (avatar) => {
    if(avatar !== "avatar-default.jpg")
      return `${config.baseUrl}/images/${avatar}`
    else return avatar_default
}


class SearchMessage extends Component {
    constructor(props){
        super(props);
        this.state = {
            listMessages : [],
            display : "none"
        }
    }

    componentWillMount = () => {
        this.setState({
          skipUser : this.props.userConversations.length,
          skipGroup : this.props.groupConversations.length,
        })
    }

    componentWillReceiveProps = (nextProps) => {
        let keyword = nextProps.keyword;
        if(keyword !== ''){
            axios({
                url: `${config.baseUrl}/message/search-messages/${keyword}`,
                method: 'get',
            })
            .then((res)=>{
                this.setState({
                    display : 'block',
                    listMessages : res.data,
                    skipUser : this.props.userConversations.length,
                    skipGroup : this.props.groupConversations.length,
                },()=>{
                    document.addEventListener('click', this.handleCloseSearchMessage);
                })
            })
            .catch((error)=>{
                console.log(error);
            })
        } else {
            this.setState({
                display : 'none',
                skipUser : this.props.userConversations.length,
                skipGroup : this.props.groupConversations.length,
            })
        }
    }

    handleFocusMessage = (item)=>{
        document.removeEventListener('click', this.handleCloseSearchMessage);
        this.props.resetKeyWord();
        let pos = this.props.allConversations.map((i=>{
            return i._id
          })).indexOf(item._id)
          
          if(pos >=0 ){
            this.props.focusMessageFromContact(item._id);
          }
          else{
            axios({
              url:`${config.baseUrl}/message/get-messages?skipUser=${this.state.skipUser}&skipGroup=${this.state.skipGroup}&id=${item._id}`,
              method: 'get',
            })
            .then((res) => {
                if(res.data.allConversationsWithMessages.length === 0){
                    message.error('Find message not found!',3.5);
                }
                else {
                    this.props.scrollListAllConversations(res.data.allConversationsWithMessages);
                    this.props.scrollListGroupConversations(res.data.groupConversationsWithMessages);
                    this.props.scrollListUserConversations(res.data.userConversationsWithMessages);
                    let pos = this.props.allConversations.map((i=>{
                        return i._id
                    })).indexOf(item._id);
                    
                    if(pos >=0 ){
                        this.props.focusMessageFromContact(item._id);
                        this.setState({
                            display : 'none'
                        })
                    }
                    else {
                      message.error('Find message not found!',3.5);
                    }
                }
            })
            .catch((error) => {
                message.error('Find message not found!',3.5);
                this.setState({
                    display : 'none'
                })
            })
          }
    }

    handleCloseSearchMessage = () => {
        this.setState({
            display : 'none',
            listMessages : []
        },()=>{
            document.removeEventListener('click', this.handleCloseSearchMessage);
            this.props.resetKeyWord();
        })
    }

    render() {
        return (
            <div style={{display : this.state.display}} className="list-message-after-search">
                <ul id="style-contatcs" className="contactList">
                    {this.state.listMessages.length > 0 ? 
                        this.state.listMessages.map((item, index)=>{
                            return (
                            <InfoContact 
                                key={index} 
                                avatar={urlImage(item.avatar)} 
                                nickname={item.nickname} 
                                address={item.address} 
                                titleSuccess={""} 
                                titleDanger={""}
                                onClick={()=>this.handleFocusMessage(item)}
                                >
                            </InfoContact> )
                        })  
                    : null }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      allConversations : state.allConversations,
      groupConversations : state.groupConversations,
      userConversations : state.userConversations,
    }
  }
  const mapDispatchToProps = (dispatch, props) => {
    return {
      focusMessageFromContact : (data) => {
        dispatch(actions.focusMessageFromContact(data));
      },
      scrollListAllConversations : (data) => {
        dispatch(actions.scrollListAllConversations(data));
      },
      scrollListGroupConversations : (data) => {
          dispatch(actions.scrollListGroupConversations(data));
      },
      scrollListUserConversations : (data) => {
          dispatch(actions.scrollListUserConversations(data));
      }
    }
  }

export default connect(
  mapStateToProps, mapDispatchToProps
)(SearchMessage);