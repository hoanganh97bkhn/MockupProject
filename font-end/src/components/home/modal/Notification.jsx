import React, { Component } from 'react';
import {Menu} from 'antd';
import ContentNotification from './../helps/notification/ContentNotification';

class Notification extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const list = this.props.listSocket;
    return (
      <div className="menu-notification" style={{display: this.props.open ? 'block' : 'none'}}>
        <ul className="notifiList">
            <span>Notification</span>
            <hr></hr>
            <div className="box-list">
              {list.length > 0 ? list.map((item,index) => {
                return (
                  <ContentNotification key={index} dataUserAddFriend = {item}/>
                )
              }) : null}
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

export default Notification;
