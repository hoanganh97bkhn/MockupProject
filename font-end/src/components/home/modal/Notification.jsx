import React, { Component } from 'react';
import { Spin } from 'antd';
import ContentNotification from './../helps/notification/ContentNotification';
import config from './../../../config/index';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actions from './../../../actions/index';

class Notification extends Component {
  constructor(props){
    super(props);
    this.state={
      skip : 0,
      displaySpiner : 'none'
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      skip : nextProps.listSocket.length
    })
  }

  markAllAsRead = () => {
    this.props.resetIsRead();
    this.props.markAllAsRead();
    axios({
      url:`${config.baseUrl}/notification/mark-all-as-read`,
      method: 'PUT',
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch( error => {
      console.log(error);
    })
  }

  handleScrollLoadNotif = (event) =>{
    let element = event.target;
    if(element.scrollHeight - element.scrollTop === 250){
      this.setState({
        displaySpiner : 'block'
      })
      setTimeout(axios({
        url:`${config.baseUrl}/load/notification`,
        method: 'post',
        data: {
          skip: this.state.skip
        }
      })
      .then((res) => {
        console.log(res.data)
        this.props.readMore(res.data)
        this.setState({
          displaySpiner : 'none'
        })
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          displaySpiner : 'none'
        })
      }), 1000)
      
    }
  }

  render() {
    console.log(this.props.listSocket)
    const list = this.props.listSocket;
    return (
      <div className="menu-notification" style={{display: this.props.open ? 'block' : 'none'}}>
        <ul className="notifiList">
            <div>
              <span>Notifications</span>
              <a onClick={this.markAllAsRead} className="reset-notification" href={'#'}>Mark All as Read</a> 
            </div>
            
            <div id="box-list" className="box-list" onScroll={this.handleScrollLoadNotif}>
              {list.length > 0 ? list.map((item,index) => {
                return (
                  <ContentNotification id={index} key={index} dataUserAddFriend = {item} resetAll = {this.state.reset}/>
                )
              }) : null}
              <div style={{textAlign:'center', display: this.state.displaySpiner}}>
                <Spin/>
              </div>
            </div>
            
            <hr></hr>
            <div style={{textAlign : 'center'}}>
              <a href="#">Show all</a>
            </div>
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
      resetIsRead : () => {
          dispatch(actions.resetIsRead());
        }
  }
}

export default connect(null, mapDispatchToProps) (Notification);
