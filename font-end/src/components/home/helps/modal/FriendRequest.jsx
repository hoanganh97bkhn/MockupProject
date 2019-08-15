import React, { Component } from 'react';
import InfoContact from './InfoContact';
import avatar_default from './../../../../image/avatar-default.jpg';

class Contact extends Component {
  render() {
    return (
      <div>
        <div className="find-user-bottom">
            <ul className="contactList">
                <InfoContact avatar={avatar_default} titleSuccess={"Confirm"} titleDanger={"Delete"}></InfoContact>
            </ul>
        </div>
      </div>
    );
  }
}

export default Contact;