import React, { Component } from 'react';
import InfoContact from'./InfoContact';
import { Input } from 'antd';
import avatar_default from './../../../../image/avatar-default.jpg';
import { max } from 'moment';

const {Search} = Input;

class FindUser extends Component {
  render() {
    return (
       <div>
           <Search
                placeholder="Input username or email"
                onSearch={value => console.log(value)}
                style={{ width: max}}
                size="large"
            />
            <div className="find-user-bottom">
                <ul className="contactList">
                    <InfoContact avatar={avatar_default} titleSuccess={"Add Friend"} titleDanger={""}></InfoContact>
                </ul>
            </div>
       </div>
    );
  }
}

export default FindUser;