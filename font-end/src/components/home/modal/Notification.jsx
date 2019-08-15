import React, { Component } from 'react';
import {Menu} from 'antd';
import ContentNotification from './../helps/notification/ContentNotification';

class Notification extends Component {
  render() {
    return (
      <div className="menu-notification">
        <ContentNotification></ContentNotification>
      </div>
    );
  }
}

export default Notification;