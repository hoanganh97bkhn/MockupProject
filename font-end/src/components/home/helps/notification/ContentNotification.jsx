import React, { Component } from 'react';
import avatar from './../../../../image/avatar-default.jpg'

class ContentNotification extends Component {
    constructor(props){
        super(props);

    }
  render() {
    return (
    <div className="notification" style={{display:'block'}}><a href="#" id="noti_Button" title="Thông báo">
        <h3>Thông báo</h3>
        <div className="noti_content">
            <span>
                <img className="avatar-small" src={avatar}></img>
                <strong>Trung Quân</strong>dawd dawdas dawd đã chấp nhận lời adaw dawd dawdaw mời kết bạn của bạn!
            </span>
            <br></br>
            <br></br>
            <br></br>
            <span>
                <img className="avatar-small" src={avatar}></img>
                <strong>Trung Quân</strong> đã gửi cho bạn một lời mời kết bạn!
            </span>
        </div>
        </a><div className="seeAll"><a href="#" id="noti_Button" data-toggle="modal" title="Thông báo"></a><a href="#">Xem tất cả</a></div>
    </div>
    );
  }
}

export default ContentNotification;
