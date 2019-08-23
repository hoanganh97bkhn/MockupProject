import React, { Component } from 'react';
import avatar from './../../../../image/avatar-default.jpg'

class ContentNotification extends Component {
    constructor(props){
        super(props);

    }
  render() {
    return (
    <div className="box-list">
        <li className="_notifiList">
            <div className="notifiPanel">
                <div className="avatar">
                    <img src={avatar}></img>
                </div>
                <div className="content">
                    <p>hello world da gui loi moi ket ban </p>
                </div>
            </div>
        </li>
        <li className="_notifiList">
            <div className="notifiPanel">
                <div className="avatar">
                    <img src={avatar}></img>
                </div>
                <div className="content">
                    <p>hello world da gui loi moi ket ban </p>
                </div>
            </div>
        </li>
        <li className="_notifiList">
            <div className="notifiPanel">
                <div className="avatar">
                    <img src={avatar}></img>
                </div>
                <div className="content">
                    <p>hello world da gui loi moi ket ban </p>
                </div>
            </div>
        </li>
    </div>
    );
  }
}

export default ContentNotification;
