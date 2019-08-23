import React, { Component } from 'react';
import {Menu} from 'antd';
import ContentNotification from './../helps/notification/ContentNotification';

class Notification extends Component {
  render() {
    return (
      <div className="menu-notification" style={{display: this.props.open ? 'block' : 'none'}}>
        <ul className="notifiList">
            <span>Notification</span>
            <hr></hr>
            <ContentNotification/>
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
