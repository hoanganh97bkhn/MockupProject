import React, { Component } from 'react';
import avatarDefault from './../../../../image/avatar-default.jpg';
import config from './../../../../config/index';

class ContentNotification extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {avatar, nickname, content} = this.props.dataUserAddFriend
        return (
            <li className="_notifiList">
                <div className="notifiPanel">
                    <div className="avatar">
                        <img src={avatar === 'avatar-default.jpg' ? avatarDefault : `${config.baseUrl}/images/${avatar}`}></img>
                    </div>
                    <div className="content">
                        <p><b style={{fontWeight: 'bold'}}>{nickname}</b> {content} </p>
                    </div>
                </div>
            </li>
        );
    }
}

export default ContentNotification;
